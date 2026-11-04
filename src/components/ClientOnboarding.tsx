import { motion } from "framer-motion";
import { Check, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import synluaLogoHorizontal from "@/assets/synlua-logo-horizontal.webp";

/* ─────────────────────────────────────────────────────────────
   Onboarding do CLIENTE — LP enxuta: o que é ser cliente Synlua
   e o que ele faz no espaço dele (links do Hub).
   Design system: preto #050508, violeta #7c5ad6 → #bd86f5,
   Delight (títulos, 200) + Inter fina, grão.
   ───────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const inView = { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } } as const;

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

const Grain = ({ opacity = 0.07 }: { opacity?: number }) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none mix-blend-overlay"
    style={{ backgroundImage: GRAIN, opacity }}
  />
);

const Grad = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-[#7c5ad6] to-[#bd86f5] bg-clip-text text-transparent">{children}</span>
);

const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <motion.p
    variants={fadeUp}
    className={`text-[11px] sm:text-xs uppercase tracking-[0.4em] font-light mb-5 ${light ? "text-[#050505]/40" : "text-white/35"}`}
  >
    {children}
  </motion.p>
);

const Path = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[11px] tracking-wide text-[#bd86f5]/70">{children}</span>
);

/* ── Ilustração: aprovação de conteúdo (celular com post + ações) ── */
const ApprovalMock = () => (
  <div className="relative mx-auto w-[270px] sm:w-[300px]">
    {/* halo */}
    <div className="absolute -inset-16 bg-[radial-gradient(circle,rgba(124,90,214,0.28)_0%,transparent_65%)] blur-2xl" />

    {/* bilhete "reenviou com ajustes" saindo da moldura */}
    <motion.div
      initial={{ opacity: 0, x: 30, rotate: 8 }}
      whileInView={{ opacity: 1, x: 0, rotate: 5 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="absolute -right-10 sm:-right-24 top-20 z-20 w-[150px] bg-[#f4f1ea] text-[#1a1a1a] px-3 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#bd86f5]/40 rotate-[-4deg]" />
      <p className="text-[9px] uppercase tracking-[0.2em] text-[#7c5ad6] mb-1">reenviou com ajustes</p>
      <p className="text-[11px] leading-snug font-light">“Trocar a foto da capa e deixar o título mais curto.”</p>
    </motion.div>

    <div className="relative z-10 rounded-[2.2rem] border border-white/15 bg-[#0b0b12] p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
      <div className="rounded-[1.7rem] overflow-hidden bg-[#0f0f18]">
        {/* topo: progresso */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between text-[10px] text-white/40 mb-2">
            <span>Apresentação</span>
            <span>7 de 12</span>
          </div>
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[58%] bg-gradient-to-r from-[#7c5ad6] to-[#bd86f5]" />
          </div>
        </div>

        {/* post */}
        <div className="relative aspect-[4/5] mx-3 rounded-lg overflow-hidden bg-gradient-to-br from-[#1b1430] via-[#2a1c4f] to-[#0c0a14]">
          <Grain opacity={0.18} />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#bd86f5]/25 blur-3xl" />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">sua marca</p>
            <p className="font-display font-extralight text-[26px] leading-[1.02] text-white">
              O que ninguém
              <br />
              te conta sobre
              <br />
              <span className="italic text-[#d7c2ff]">posicionamento.</span>
            </p>
          </div>
          <button className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center" tabIndex={-1} aria-hidden>
            <ChevronLeft className="w-3.5 h-3.5 text-white/70" />
          </button>
          <button className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center" tabIndex={-1} aria-hidden>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>

        {/* legenda + meta */}
        <div className="px-4 pt-3">
          <p className="text-[10px] text-white/35">Carrossel · Instagram · qui, 14 nov</p>
          <p className="text-[11px] text-white/60 font-light leading-snug mt-1 line-clamp-2">
            Posicionamento não é logo bonito. É o motivo pelo qual escolhem você e não o vizinho…
          </p>
        </div>

        {/* ações */}
        <div className="p-3 pt-4 grid grid-cols-[1.3fr_1fr] gap-2">
          <div className="h-9 rounded-md bg-gradient-to-r from-[#7c5ad6] to-[#bd86f5] flex items-center justify-center gap-1.5 text-[11px] text-white">
            <Check className="w-3.5 h-3.5" /> Aprovar
          </div>
          <div className="h-9 rounded-md border border-white/15 flex items-center justify-center text-[11px] text-white/70">
            Pedir ajustes
          </div>
        </div>
        <p className="text-center text-[10px] text-white/35 pb-4">Comentar</p>
      </div>
    </div>
  </div>
);

/* ── Ilustração: calendário de captação ── */
const CalendarMock = () => {
  const picked = [12, 13, 20];
  return (
    <div className="relative w-full max-w-[300px] rotate-[-2deg] bg-[#f4f1ea] text-[#1a1a1a] p-5 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
      <div className="absolute -top-2 left-8 w-14 h-4 bg-[#bd86f5]/45 rotate-[3deg]" />
      <p className="font-display font-light text-lg mb-3">Novembro</p>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-[#1a1a1a]/40 mb-1">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => {
          const d = i + 1;
          const on = picked.includes(d);
          return (
            <span
              key={d}
              className={`aspect-square flex items-center justify-center rounded-full ${
                on ? "bg-gradient-to-br from-[#7c5ad6] to-[#bd86f5] text-white" : ""
              }`}
            >
              {d}
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] italic text-[#7c5ad6]">estúdio da loja · manhã ✓</p>
    </div>
  );
};

/* ── Ilustração: projeto protegido ── */
const ProjectMock = () => (
  <div className="relative w-full max-w-[320px]">
    <div className="rounded-xl border border-white/10 bg-[#0b0b12] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 text-[10px] text-white/40 mb-4">
        <Lock className="w-3 h-3 text-[#bd86f5]" /> link protegido por senha
      </div>
      <p className="font-display font-light text-white text-lg mb-4">Projeto · Sua marca</p>
      {[
        { t: "Estratégia macro", p: 100 },
        { t: "Identidade das redes", p: 70 },
        { t: "Conteúdo de dezembro", p: 30 },
      ].map((r) => (
        <div key={r.t} className="mb-3">
          <div className="flex justify-between text-[11px] text-white/55 mb-1.5">
            <span>{r.t}</span>
            <span className="text-white/30">{r.p}%</span>
          </div>
          <div className="h-[2px] bg-white/10">
            <div className="h-full bg-gradient-to-r from-[#7c5ad6] to-[#bd86f5]" style={{ width: `${r.p}%` }} />
          </div>
        </div>
      ))}
      <p className="text-[11px] text-white/40 mt-4 underline underline-offset-4 decoration-white/20">baixar arquivos ↓</p>
    </div>
  </div>
);

/* ── Ilustração: funil/perfil para aprovar ── */
const FunnelMock = () => (
  <div className="relative w-full max-w-[300px] h-[230px]">
    {/* perfil */}
    <div className="absolute left-0 top-0 w-[170px] rotate-[-4deg] rounded-xl border border-white/10 bg-[#0b0b12] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c5ad6] to-[#bd86f5]" />
        <div>
          <div className="h-1.5 w-16 bg-white/40 rounded mb-1" />
          <div className="h-1.5 w-10 bg-white/15 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`aspect-square ${i % 2 ? "bg-[#2a1c4f]" : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-[9px] text-white/35 mt-2">perfil remodelado</p>
    </div>
    {/* funil */}
    <div className="absolute right-0 bottom-0 w-[170px] rotate-[3deg] bg-[#f4f1ea] text-[#1a1a1a] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      <div className="space-y-1.5 flex flex-col items-center">
        {[100, 78, 56, 34].map((w, i) => (
          <div
            key={i}
            className="h-4"
            style={{ width: `${w}%`, background: `rgba(124,90,214,${0.25 + i * 0.2})` }}
          />
        ))}
      </div>
      <p className="text-[11px] italic text-[#7c5ad6] mt-3">“aprovado, só muda a oferta” — Ana</p>
    </div>
  </div>
);

/* ── Bloco editorial: texto + ilustração ── */
const Feature = ({
  kicker,
  title,
  path,
  children,
  art,
  flip,
}: {
  kicker: string;
  title: React.ReactNode;
  path: string;
  children: React.ReactNode;
  art: React.ReactNode;
  flip?: boolean;
}) => (
  <motion.div
    {...inView}
    variants={stagger}
    className="grid md:grid-cols-2 gap-12 md:gap-16 items-center py-16 sm:py-20 border-t border-white/[0.06]"
  >
    <div className={flip ? "md:order-2" : ""}>
      <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.35em] text-white/35 mb-4">
        {kicker}
      </motion.p>
      <motion.h3
        variants={fadeUp}
        className="font-display font-extralight text-3xl sm:text-4xl leading-[1.08] tracking-tight text-white mb-3"
      >
        {title}
      </motion.h3>
      <motion.div variants={fadeUp} className="mb-6">
        <Path>{path}</Path>
      </motion.div>
      <motion.div variants={fadeUp} className="space-y-4 text-base sm:text-[17px] text-white/55 font-light leading-relaxed max-w-md">
        {children}
      </motion.div>
    </div>
    <motion.div variants={fadeUp} className={`flex justify-center ${flip ? "md:order-1" : ""}`}>
      {art}
    </motion.div>
  </motion.div>
);

const firstDays = [
  { when: "Dia 1", what: "Você recebe o briefing. Quanto mais profundo, mais certeira a estratégia — o ideal é devolver em até 24h." },
  { when: "Primeira semana", what: "Analisamos tudo, pedimos os acessos e marcamos a reunião estratégica com você." },
  { when: "Segunda semana", what: "Apresentamos a estratégia macro e o roteiro. Você envia os materiais pedidos." },
  { when: "Logo depois", what: "Chega o seu primeiro link de aprovação. Aprovou, a gente agenda e vai ao ar." },
];

const hidden = ["financeiro", "CRM", "outros clientes", "tarefas internas", "contratos"];

const ClientOnboarding = () => (
  <main className="min-h-screen bg-[#050508] text-white selection:bg-[#7c5ad6]/30 overflow-x-hidden">
    <SEOHead
      title="Bem-vindo | Synlua — Braço de Marketing Completo"
      description="Como é ser cliente Synlua: o início do projeto e o seu espaço para aprovar conteúdo, propostas e captações."
      path="/onboarding"
      noindex
    />

    {/* ─── HERO ─── */}
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[620px] h-[620px] rounded-full bg-[#7c5ad6]/20 blur-[140px]" />
      <div className="absolute bottom-0 -left-40 w-[420px] h-[420px] rounded-full bg-[#bd86f5]/10 blur-[120px]" />
      <Grain opacity={0.09} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.img variants={fadeUp} src={synluaLogoHorizontal} alt="Synlua" className="h-9 sm:h-10 mb-16 sm:mb-24" />
          <Eyebrow>Você agora é cliente</Eyebrow>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extralight text-[52px] sm:text-7xl md:text-8xl leading-[0.98] tracking-tight"
          >
            Bem-vindo
            <br />à <Grad>Synlua.</Grad>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-10 max-w-xl text-lg sm:text-xl text-white/55 font-light leading-relaxed">
            A partir de hoje a gente é o seu time de marketing. Esta página é curta de propósito: mostra como o projeto
            começa e o espaço que é só seu para acompanhar e aprovar tudo.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-14 text-sm text-white/30 font-light italic">
            role devagar ↓
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* ─── PRIMEIROS DIAS ─── */}
    <section data-light className="relative bg-[#FAFAFA] text-[#050505] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <motion.div {...inView} variants={stagger}>
          <Eyebrow light>Os primeiros dias</Eyebrow>
          <motion.h2 variants={fadeUp} className="font-display font-extralight text-4xl sm:text-5xl leading-[1.05] tracking-tight max-w-2xl">
            Do briefing ao primeiro post <span className="italic text-[#7c5ad6]">aprovado.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-[#555] font-light max-w-xl leading-relaxed">
            Esses são prazos máximos. Quando a troca flui dos dois lados, quase sempre a gente antecipa.
          </motion.p>
        </motion.div>

        <motion.div {...inView} variants={stagger} className="relative mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <div className="hidden lg:block absolute top-[7px] left-0 right-0 h-px bg-gradient-to-r from-[#7c5ad6]/60 via-[#bd86f5]/40 to-transparent" />
          {firstDays.map((d) => (
            <motion.div key={d.when} variants={fadeUp} className="relative">
              <div className="w-[15px] h-[15px] rounded-full bg-[#FAFAFA] border border-[#7c5ad6] flex items-center justify-center mb-6 relative z-10">
                <div className="w-[5px] h-[5px] rounded-full bg-[#7c5ad6]" />
              </div>
              <p className="font-display font-light text-2xl mb-3">{d.when}</p>
              <p className="text-[15px] text-[#555] font-light leading-relaxed">{d.what}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ─── O SEU ESPAÇO ─── */}
    <section className="relative overflow-hidden">
      <div className="absolute top-40 -left-60 w-[600px] h-[600px] rounded-full bg-[#7c5ad6]/10 blur-[150px]" />
      <Grain opacity={0.06} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 sm:pt-32 pb-10">
        <motion.div {...inView} variants={stagger} className="max-w-2xl mb-6">
          <Eyebrow>O seu espaço na Synlua</Eyebrow>
          <motion.h2 variants={fadeUp} className="font-display font-extralight text-4xl sm:text-6xl leading-[1.03] tracking-tight">
            Nada de print no WhatsApp.
            <br />
            <Grad>Tudo num link seu.</Grad>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-white/50 font-light leading-relaxed">
            Cada etapa do projeto chega até você como um link. Você abre no celular, vê do jeito que vai ficar e responde
            ali mesmo — sem login, sem planilha, sem se perder em conversa.
          </motion.p>
        </motion.div>

        {/* principal: aprovar conteúdo */}
        <Feature
          kicker="O principal"
          path="/aprovar/…"
          title={
            <>
              Aprovar conteúdo
              <br />
              <span className="text-white/45">como ele vai aparecer.</span>
            </>
          }
          art={<ApprovalMock />}
        >
          <p>
            Você vê cada post como no feed — imagem ou vídeo, legenda, data, formato e rede. Pode ir um por vez, no modo
            apresentação, até aparecer <span className="text-white/80">“Tudo aprovado!”</span>; ou navegar pelas mesmas
            pastas que a equipe montou, com a contagem do que já foi aprovado em cada uma.
          </p>
          <p>
            Em cada post: <span className="text-white/80">aprovar</span>, <span className="text-white/80">pedir ajustes</span>{" "}
            escrevendo o que mudar, ou só comentar. Com pressa? Aprove a pasta inteira ou os que faltam de uma vez — os que
            têm ajuste pedido ficam de fora.
          </p>
          <p>
            Na primeira vez você diz seu nome, então a equipe sabe quem aprovou e quando. Pediu ajuste, o post volta
            corrigido, marcado <span className="italic text-[#d7c2ff]">reenviou com ajustes</span>, com o histórico do que
            foi pedido.
          </p>
        </Feature>

        <Feature
          flip
          kicker="Propostas"
          path="/perfil/…  ·  /funil/…"
          title={
            <>
              Seu novo perfil e
              <br />
              seu funil, <span className="text-white/45">antes de ir pro ar.</span>
            </>
          }
          art={<FunnelMock />}
        >
          <p>
            Quando remodelamos o seu perfil ou desenhamos o funil de vendas, você recebe a proposta para ver com calma.
            Aprova ou pede ajustes — no funil dá até para deixar um recado junto.
          </p>
        </Feature>

        <Feature
          kicker="Acompanhar"
          path="/p/…"
          title={
            <>
              O projeto inteiro,
              <br />
              <span className="text-white/45">a qualquer hora.</span>
            </>
          }
          art={<ProjectMock />}
        >
          <p>
            Um link com senha, só seu. Ali está o resumo do projeto, as tarefas e o andamento de cada uma — e os arquivos
            prontos para baixar quando precisar.
          </p>
        </Feature>

        <Feature
          flip
          kicker="Captação"
          path="/captacao/…"
          title={
            <>
              Gravação marcada
              <br />
              <span className="text-white/45">sem vai e volta.</span>
            </>
          }
          art={<CalendarMock />}
        >
          <p>
            Você escolhe os dias no calendário, diz o local e o que precisa, e as datas já entram na agenda aprovadas — a
            equipe é avisada na hora.
          </p>
          <p>
            Quando a gente propõe a data, você aprova ou sugere outra. E tem um link só para acompanhar o status da
            captação.
          </p>
        </Feature>

        {/* briefing + demanda: fecho em prosa */}
        <motion.div {...inView} variants={stagger} className="py-16 sm:py-20 border-t border-white/[0.06] grid md:grid-cols-2 gap-10">
          <motion.div variants={fadeUp}>
            <Path>/briefing</Path>
            <p className="font-display font-extralight text-3xl mt-3 mb-3">Briefing</p>
            <p className="text-white/55 font-light leading-relaxed max-w-sm">
              O formulário estratégico de marketing que você preenche uma vez, no começo. É dele que nasce a estratégia.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Path>/demanda</Path>
            <p className="font-display font-extralight text-3xl mt-3 mb-3">Demanda</p>
            <p className="text-white/55 font-light leading-relaxed max-w-sm">
              Precisa de algo novo? Pede por aqui. Se estiver fora do escopo, a equipe te volta com prazo e investimento
              antes de começar.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ─── PRIVACIDADE ─── */}
    <section data-light className="relative bg-[#FAFAFA] text-[#050505]">
      <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <motion.div {...inView} variants={stagger} className="max-w-3xl">
          <Eyebrow light>O que fica só com a gente</Eyebrow>
          <motion.h2 variants={fadeUp} className="font-display font-extralight text-4xl sm:text-5xl leading-[1.08] tracking-tight">
            Cada link mostra <span className="italic text-[#7c5ad6]">só a sua parte.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 text-xl sm:text-2xl font-light leading-relaxed text-[#050505]/70">
            Você não entra no nosso Hub interno — nada de{" "}
            {hidden.map((h, i) => (
              <span key={h}>
                <span className="line-through decoration-[#7c5ad6]/60 decoration-[1.5px] text-[#050505]/40">{h}</span>
                {i < hidden.length - 2 ? ", " : i === hidden.length - 2 ? " ou " : ""}
              </span>
            ))}
            . E quem recebe um link seu não vê nada além daquilo.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* ─── COMBINADOS + FECHO ─── */}
    <section className="relative overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#7c5ad6]/15 blur-[150px]" />
      <Grain opacity={0.08} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <motion.div {...inView} variants={stagger} className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
          <div>
            <Eyebrow>Nossos combinados</Eyebrow>
            <motion.h2 variants={fadeUp} className="font-display font-extralight text-4xl sm:text-5xl leading-[1.05] tracking-tight">
              Resultado é <Grad>dos dois lados.</Grad>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} className="space-y-6 text-lg text-white/55 font-light leading-relaxed">
            <p>
              Da sua parte: briefing com profundidade, acessos e materiais no prazo e presença nas reuniões estratégicas.
              Da nossa: método, prazos claros e transparência em cada etapa.
            </p>
            <p>
              O dia a dia acontece no grupo oficial do projeto — é lá que a gente conversa, tira dúvida e combina o que
              vier de novo.
            </p>
          </motion.div>
        </motion.div>

        <motion.div {...inView} variants={stagger} className="mt-32 text-center">
          <motion.div variants={fadeUp} className="w-16 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-[#bd86f5]/60 to-transparent" />
          <motion.p variants={fadeUp} className="font-display font-extralight text-4xl sm:text-6xl tracking-tight leading-[1.05]">
            Conversão não é acaso.
            <br />
            <Grad>É método.</Grad>
          </motion.p>
          <motion.img variants={fadeUp} src={synluaLogoHorizontal} alt="Synlua" className="h-7 mx-auto mt-14 opacity-50" />
        </motion.div>
      </div>
    </section>
  </main>
);

export default ClientOnboarding;
