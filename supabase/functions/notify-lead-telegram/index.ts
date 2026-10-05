import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  segment?: string;
  service_type?: string;
  revenue?: string;
  form_type?: string;
  social_media_handle?: string;
  website?: string;
  business_description?: string;
  client_acquisition_channels?: string[];
  role?: string;
  notes?: string;
  timing?: string;
  niche?: string;
  followers?: string;
  did_publi?: string;
}

const NOTIFY_RECIPIENTS = ["mkt@synlua.com.br", "pablo@synlua.com.br", "beatriz@synlua.com.br", "luisadeandrady.comercial@gmail.com"];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sanitizeField(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  return escapeHtml(value.trim().slice(0, maxLength));
}

const serviceLabels: Record<string, string> = {
  marketing_360: "Marketing 360°",
  branding: "Branding",
  trafego_pago: "Tráfego Pago",
  social_media: "Social Media",
  websites: "Websites",
  consultoria: "Consultoria",
  outro: "Outro",
};

const revenueLabels: Record<string, string> = {
  ate_50k: "Até R$ 50 mil",
  "50k_100k": "R$ 50 mil - R$ 100 mil",
  "100k_500k": "R$ 100 mil - R$ 500 mil",
  "500k_1m": "R$ 500 mil - R$ 1 milhão",
  acima_1m: "Acima de R$ 1 milhão",
};

const formTypeLabels: Record<string, string> = {
  quiz: "Lead Comercial",
  forms: "Lead Comercial (Forms)",
  consulting: "Solicitação de Análise",
  supplier: "Cadastro de Fornecedor",
  influencer: "Cadastro de Influenciadora",
};

function buildFields(d: LeadData): Array<[string, string]> {
  const fields: Array<[string, string]> = [];
  const push = (k: string, v?: string | null) => { if (v && v.trim()) fields.push([k, v.trim()]); };

  push("Nome", d.name);
  push("Email", d.email);
  push("Telefone / WhatsApp", d.phone);
  push("Empresa", d.company);
  push("Cargo", d.role);
  push("Segmento / Nicho", d.segment || d.niche);
  push("Instagram / Redes", d.social_media_handle);
  push("Site", d.website);
  push("Seguidores", d.followers);
  push("Já fez publi?", d.did_publi);
  if (d.service_type) push("Serviço", serviceLabels[d.service_type] || d.service_type);
  if (d.revenue) push("Faturamento", revenueLabels[d.revenue] || d.revenue);
  if (Array.isArray(d.client_acquisition_channels) && d.client_acquisition_channels.length) {
    push("Canais de aquisição", d.client_acquisition_channels.join(", "));
  }
  push("Descrição do negócio", d.business_description);
  push("Cenário / Observações", d.notes);
  return fields;
}

function formatTelegramMessage(d: LeadData): string {
  const title = formTypeLabels[d.form_type || ""] || "Novo Lead";
  const fields = buildFields(d)
    .map(([k, v]) => `<b>${escapeHtml(k)}:</b> ${sanitizeField(v, 1000)}`)
    .join("\n");
  return `🔔 <b>NOVO ${title.toUpperCase()} — SYNLUA</b>\n\n${fields}`;
}

function formatEmailHtml(d: LeadData): string {
  const title = formTypeLabels[d.form_type || ""] || "Novo Lead";
  const rows = buildFields(d)
    .map(([k, v]) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #eee;font-size:13px;color:#666;width:200px;vertical-align:top;">${escapeHtml(k)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #eee;font-size:14px;color:#111;white-space:pre-wrap;">${sanitizeField(v, 2000)}</td>
      </tr>`)
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f6f6f8;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
    <div style="padding:24px 28px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;">
      <div style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;opacity:.85;">Synlua • Novo formulário</div>
      <div style="font-size:22px;font-weight:600;margin-top:6px;">${escapeHtml(title)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <div style="padding:18px 28px;font-size:12px;color:#888;background:#fafafa;">
      Notificação automática — synlua.com.br
    </div>
  </div>
</body></html>`;
}

async function createClickUpTask(d: LeadData) {
  const CLICKUP_API_KEY = Deno.env.get('CLICKUP_API_KEY');
  const CLICKUP_LIST_ID = Deno.env.get('CLICKUP_LIST_ID');
  if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) return;
  // Only commercial leads become ClickUp tasks (quiz / forms / consulting).
  if (d.form_type && !['quiz', 'forms', 'consulting'].includes(d.form_type)) return;


  const name = sanitizeField(d.name, 120) || 'Sem nome';
  const line = (label: string, value?: string | null) =>
    `- **${label}:** ${value && value.trim() ? value.trim().slice(0, 500) : 'Não informado'}`;

  const description = [
    '**Lead recebido via Landing Page Synlua**',
    '',
    line('Nome', d.name),
    line('E-mail', d.email),
    line('WhatsApp', d.phone),
    line('Instagram/Site', d.website || d.social_media_handle),
    line('Faturamento Mensal', d.revenue ? (revenueLabels[d.revenue] || d.revenue) : undefined),
    line('Urgência para Início', d.timing || d.notes),
    line('Serviço Desejado', d.service_type ? (serviceLabels[d.service_type] || d.service_type) : undefined),
  ].join('\n');

  try {
    const r = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `Novo lead – ${name}`,
        description,
        markdown_description: description,
        status: 'oportunidades',
        priority: 3,
      }),
    });
    if (!r.ok) console.error('ClickUp error:', r.status, await r.text());
  } catch (e) { console.error('ClickUp exception:', e); }
}

async function sendTelegram(d: LeadData) {
  const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
  const defaultChatId = Deno.env.get('TELEGRAM_CHAT_ID');
  const onboardingChatId = Deno.env.get('ONBOARDING_TELEGRAM_CHAT_ID');
  const isOnboarding = d.form_type === 'influencer' || d.form_type === 'supplier';
  const TELEGRAM_CHAT_ID = isOnboarding ? onboardingChatId : defaultChatId;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: formatTelegramMessage(d), parse_mode: 'HTML' }),
    });
    if (!r.ok) console.error('Telegram error:', await r.text());
  } catch (e) { console.error('Telegram exception:', e); }
}

async function sendEmail(d: LeadData) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    console.error('Missing Resend gateway credentials');
    return;
  }
  const title = formTypeLabels[d.form_type || ""] || "Novo Lead";
  const subject = `[Synlua] ${title} — ${sanitizeField(d.name, 80) || "Sem nome"}`;
  try {
    const r = await fetch('https://connector-gateway.lovable.dev/resend/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'Synlua Leads <leads@synlua.com.br>',
        to: NOTIFY_RECIPIENTS,
        reply_to: d.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) ? d.email : undefined,
        subject,
        html: formatEmailHtml(d),
      }),
    });
    if (!r.ok) console.error('Resend error:', r.status, await r.text());
  } catch (e) { console.error('Resend exception:', e); }
}

function formatLeadThankYouHtml(firstName: string): string {
  const n = escapeHtml(firstName);
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Synlua</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#EDEDF2;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0A0A0F;">${n}, você acaba de dar o primeiro passo. Recebemos seu formulário — o próximo movimento é nosso.</div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0A0A0F;">
    <tr>
      <td align="center" style="padding:48px 20px;">

        <!-- Ambient purple glow (rendered as gradient bar top) -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#0D0D14;border:1px solid rgba(139,92,246,0.18);border-radius:20px;overflow:hidden;">
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,transparent 0%,#8B5CF6 30%,#C4B5FD 50%,#8B5CF6 70%,transparent 100%);line-height:3px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Header / brand -->
          <tr>
            <td style="padding:44px 44px 12px 44px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#8B5CF6;font-weight:600;">
                    Synlua &nbsp;•&nbsp; Marketing que Converte
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Editorial headline -->
          <tr>
            <td style="padding:24px 44px 8px 44px;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:38px;line-height:1.1;letter-spacing:-0.02em;color:#F5F3FF;">
                ${n},<br/>
                <span style="background:linear-gradient(135deg,#C4B5FD 0%,#8B5CF6 50%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:#8B5CF6;font-style:italic;">você será</span><br/>
                nosso novo cliente.
              </h1>
            </td>
          </tr>

          <!-- Hairline -->
          <tr>
            <td style="padding:32px 44px 0 44px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,0.35),transparent);line-height:1px;font-size:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Body copy -->
          <tr>
            <td style="padding:28px 44px 8px 44px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.75;color:#C9C9D3;">
              <p style="margin:0 0 20px;">A maioria das empresas que chega até aqui passou meses pagando por marketing que não fechou uma venda sequer.</p>
              <p style="margin:0 0 20px;color:#EDEDF2;">Você preencheu o formulário. <span style="color:#C4B5FD;">Isso já te coloca na frente.</span></p>
              <p style="margin:0 0 20px;">Entraremos em contato nas próximas horas para entender onde está o gargalo — e o que precisa ser construído para mudar isso.</p>
              <p style="margin:0 0 24px;">Não é uma call de apresentação. É um diagnóstico para sabermos se podemos, de fato, te ajudar.</p>
            </td>
          </tr>

          <!-- Signature block -->
          <tr>
            <td style="padding:8px 44px 40px 44px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;color:#EDEDF2;padding-bottom:4px;">Até já,</td>
                </tr>
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:0.28em;text-transform:uppercase;color:#8B5CF6;font-weight:700;">Synlua</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Numbers strip -->
          <tr>
            <td style="padding:0 44px 40px 44px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg,rgba(139,92,246,0.10),rgba(139,92,246,0.02));border:1px solid rgba(139,92,246,0.15);border-radius:14px;">
                <tr>
                  <td width="33%" align="center" style="padding:22px 8px;border-right:1px solid rgba(139,92,246,0.12);">
                    <div style="font-family:Georgia,serif;font-size:24px;color:#F5F3FF;letter-spacing:-0.02em;">+400</div>
                    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8B7FB8;margin-top:4px;">Clientes</div>
                  </td>
                  <td width="34%" align="center" style="padding:22px 8px;border-right:1px solid rgba(139,92,246,0.12);">
                    <div style="font-family:Georgia,serif;font-size:24px;color:#F5F3FF;letter-spacing:-0.02em;">+100M</div>
                    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8B7FB8;margin-top:4px;">Gerados</div>
                  </td>
                  <td width="33%" align="center" style="padding:22px 8px;">
                    <div style="font-family:Georgia,serif;font-size:24px;color:#F5F3FF;letter-spacing:-0.02em;">7 anos</div>
                    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8B7FB8;margin-top:4px;">De mercado</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#08080C;border-top:1px solid rgba(139,92,246,0.12);padding:24px 44px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6B6B7A;">
                    Barueri, SP
                  </td>
                  <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">
                    <a href="https://synlua.com.br" style="color:#8B5CF6;text-decoration:none;">synlua.com.br</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Micro footer -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;margin-top:20px;">
          <tr>
            <td align="center" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#4A4A57;line-height:1.6;padding:0 24px;">
              Este e-mail foi enviado porque você preencheu o formulário em synlua.com.br<br/>
              © 2026 Synlua — Todos os direitos reservados.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body></html>`;
}

async function sendLeadThankYou(d: LeadData) {
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return;
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) return;
  const firstName = (d.name || '').trim().split(/\s+/)[0] || 'Olá';
  const subject = `${firstName}, você será nosso novo cliente.`;
  try {
    const r = await fetch('https://connector-gateway.lovable.dev/resend/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'Synlua <contato@synlua.com.br>',
        to: [d.email],
        reply_to: 'contato@synlua.com.br',
        subject,
        html: formatLeadThankYouHtml(firstName),
      }),
    });
    if (!r.ok) console.error('Resend lead thank-you error:', r.status, await r.text());
  } catch (e) { console.error('Resend lead thank-you exception:', e); }
}


function formatWhatsAppText(d: LeadData): string {
  const title = formTypeLabels[d.form_type || ""] || "Novo Lead";
  const fields = buildFields(d).map(([k, v]) => `${k}: ${v}`).join("\n");
  return `🔔 NOVO ${title.toUpperCase()} — SYNLUA\n\n${fields}`;
}

async function sendWhatsApp(d: LeadData) {
  const url = Deno.env.get('OPENBOT_WEBHOOK_URL');
  const apiKey = Deno.env.get('OPENBOT_API_KEY');
  const to = Deno.env.get('LEAD_WHATSAPP_NUMBER');
  if (!url || !apiKey || !to) return;

  const message = formatWhatsAppText(d);
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        apiKey,
        to,
        phone: to,
        number: to,
        message,
        text: message,
        event: 'new_lead',
        lead: d,
      }),
    });
    if (!r.ok) console.error('Openbot error:', r.status, await r.text());
  } catch (e) { console.error('Openbot exception:', e); }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();

    if (!leadData.name || typeof leadData.name !== 'string' || leadData.name.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Influencer signups only notify via Telegram — no emails.
    if (leadData.form_type === 'influencer') {
      await Promise.all([sendTelegram(leadData), sendWhatsApp(leadData)]);
    } else {
      await Promise.all([sendTelegram(leadData), sendWhatsApp(leadData), sendEmail(leadData), sendLeadThankYou(leadData), createClickUpTask(leadData)]);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in notify-lead-telegram:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
