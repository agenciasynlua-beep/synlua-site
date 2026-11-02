import { createClient } from "jsr:@supabase/supabase-js@2";

// Chamada pelo gatilho do banco (form_submissions) com { id }. Sem JWT: a função só age sobre uma linha REAL
// e já concluída, e monta tudo com os dados do banco (nunca do corpo da requisição), então ninguém de fora
// consegue forjar mensagens no grupo nem leads no CRM.
//   1) Telegram: grupo da Synlua (uma única vez por lead).
//   2) Synlua Hub: cria o lead no CRM (idempotente por external_id; tenta de novo se falhou antes).
// Os segredos ficam na tabela trancada app_secrets (a tabela tem prioridade sobre variáveis de ambiente).

const CHAT_ID = Deno.env.get("NOTIFY_CHAT_ID") ?? "-5359371572";
const SITE = "https://forms.synlua.com.br";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const esc = (v: unknown, max = 400) =>
  String(v ?? "").trim().slice(0, max).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TITLES: Record<string, string> = {
  quiz: "Novo lead — Diagnóstico",
  forms: "Novo lead — Formulário",
  influencer: "Nova influenciadora",
  supplier: "Novo fornecedor",
};

type Row = Record<string, any>;
type Extra = { q: string; a: string }[];

function waLink(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d ? `https://wa.me/${d.length <= 11 ? "55" + d : d}` : "";
}
const plain = (label: string, v: unknown) => {
  const s = String(v ?? "").trim();
  return s ? `${label}: ${s}` : "";
};
const origin = (meta: Row) =>
  ["utm_source", "utm_medium", "utm_campaign", "utm_content"].map((k) => (meta?.[k] ? `${k.replace("utm_", "")}=${meta[k]}` : "")).filter(Boolean).join(" · ");

function buildTelegram(l: Row, extra: Extra) {
  const wa = waLink(String(l.phone ?? ""));
  const title = l.form_slug && l.form_type !== "quiz" ? `Novo lead — ${l.form_slug}` : TITLES[String(l.form_type)] ?? "Novo lead";
  const L = (label: string, v: unknown) => {
    const s = esc(v);
    return s ? `<b>${label}:</b> ${s}` : "";
  };
  const lines = [
    `🔔 <b>${esc(title)}</b>`,
    "",
    L("Nome", l.name),
    wa ? `<b>WhatsApp:</b> <a href="${wa}">${esc(l.phone)}</a>` : "",
    L("E-mail", l.email),
    L("Empresa", l.company),
    L("Serviço", l.service_type),
    L("Faturamento", l.revenue),
    L("Segmento", l.segment),
    L("Instagram", l.social_media_handle),
    L("Site", l.website),
    ...extra.map((e) => L(e.q, e.a)),
    L("Observações", l.notes),
    origin(l.meta) ? L("Origem", origin(l.meta)) : "",
    l.form_slug ? `<b>Formulário:</b> ${esc(`${SITE}/${l.form_slug}`)}` : "",
  ].filter((x, i, a) => x !== "" || (i > 0 && a[i - 1] !== ""));
  return lines.join("\n").slice(0, 3800);
}

function buildHubNotes(l: Row, extra: Extra) {
  return [
    plain("Serviço", l.service_type), plain("Faturamento", l.revenue), plain("Segmento", l.segment),
    plain("Instagram", l.social_media_handle), plain("Site", l.website),
    ...extra.map((e) => `${e.q}: ${e.a}`),
    plain("Observações", l.notes),
    origin(l.meta) ? `Origem: ${origin(l.meta)}` : "",
    l.form_slug ? `Formulário: ${SITE}/${l.form_slug}` : "",
  ].filter(Boolean).join("\n").slice(0, 3800);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let id: string | undefined;
  try { id = (await req.json())?.id; } catch { /* sem corpo */ }
  // Chamadas antigas do site (sem id) são ignoradas com sucesso
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return json({ ok: true, ignored: true });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const secret = async (k: string) => {
    const { data } = await db.from("app_secrets").select("value").eq("key", k).maybeSingle();
    return (data?.value as string | undefined) || Deno.env.get(k);
  };

  const { data: row } = await db.from("form_submissions").select("*").eq("id", id).neq("status", "partial").maybeSingle();
  if (!row) return json({ ok: true, skipped: true });

  // perguntas sem coluna própria (formulários personalizados) entram na mensagem com o título da pergunta
  const extra: Extra = [];
  if (row.form_slug && row.answers && typeof row.answers === "object") {
    const { data: f } = await db.from("forms").select("config").eq("slug", row.form_slug).maybeSingle();
    for (const s of (f?.config?.steps ?? []) as Row[]) {
      const a = String(row.answers[s.id] ?? "").trim();
      if (a && !s.field) extra.push({ q: String(s.title ?? s.id).slice(0, 120), a });
    }
  }

  const result: Record<string, unknown> = { ok: true };

  // 1) Telegram — reserva a linha para enviar uma única vez
  const token = await secret("TELEGRAM_BOT_TOKEN");
  if (!token) {
    console.error("TELEGRAM_BOT_TOKEN não configurado");
    result.telegram = "no_token";
  } else {
    const { data: claimed } = await db.from("form_submissions")
      .update({ notified_at: new Date().toISOString() }).eq("id", id).is("notified_at", null).select("id").maybeSingle();
    if (!claimed) result.telegram = "already_sent";
    else {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: buildTelegram(row, extra), parse_mode: "HTML", disable_web_page_preview: true }),
      });
      if (res.ok) result.telegram = "sent";
      else {
        let desc = "";
        try { desc = (await res.json())?.description ?? ""; } catch { /* ignore */ }
        console.error("telegram error", res.status, desc);
        await db.from("form_submissions").update({ notified_at: null }).eq("id", id); // libera nova tentativa
        result.telegram = "error";
        result.telegram_error = desc;
      }
    }
  }

  // 2) Synlua Hub (CRM) — independente do Telegram
  if (row.hub_synced_at) result.hub = "already_synced";
  else {
    const url = await secret("HUB_INTAKE_URL");
    const key = await secret("HUB_INTAKE_KEY");
    if (!url || !key) result.hub = "not_configured";
    else {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-intake-key": key },
          body: JSON.stringify({
            external_id: row.id, form_slug: row.form_slug, name: row.name, email: row.email, phone: row.phone,
            company: row.company, notes: buildHubNotes(row, extra),
          }),
        });
        const out = await res.json().catch(() => ({}));
        if (res.ok && out?.lead_id) {
          await db.from("form_submissions").update({ hub_synced_at: new Date().toISOString(), hub_lead_id: out.lead_id }).eq("id", id);
          result.hub = "synced";
        } else {
          console.error("hub error", res.status, out?.error);
          result.hub = "error";
        }
      } catch (e) {
        console.error("hub exception", String(e));
        result.hub = "error";
      }
    }
  }
  return json(result);
});
