import { motion } from "framer-motion";
import { CheckSquare, FolderOpen, Clock, ArrowDown, Timer, Award, Heart, BarChart3, MessageCircle, Target, RefreshCw, AlertCircle, ThumbsUp, MapPin, Users, Camera, Video, Palette, Megaphone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import synluaLogoDark from "@/assets/synlua-logo.webp";
import synluaLogoHorizontal from "@/assets/synlua-logo-horizontal.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const tools = [
  { icon: CheckSquare, title: "ClickUp", description: "Todas as demandas e tarefas são organizadas e acompanhadas pelo ClickUp." },
  { icon: FolderOpen, title: "Google Drive", description: "Os materiais e arquivos são centralizados no Google Drive." },
  { icon: Clock, title: "Prazos", description: "Os prazos são definidos conforme a necessidade de cada projeto, sendo comunicados ao longo do processo." },
];

const cultureCards = [
  { icon: MapPin, title: "Base em Barueri", description: "Nosso HQ fica em Barueri/SP. O time é híbrido — boa parte trabalha de forma remota, mas captações e reuniões presenciais acontecem aqui na região." },
  { icon: Timer, title: "Sem horário fixo", description: "Você organiza seu próprio tempo. Não exigimos horário comercial, apenas comprometimento com os prazos." },
  { icon: Award, title: "Qualidade acima de tudo", description: "Prezamos pela excelência em cada entrega. Preferimos menos entregas com mais qualidade." },
  { icon: Heart, title: "Conforto e confiança", description: "Queremos que você se sinta à vontade. Trabalhamos com respeito, transparência e autonomia." },
  { icon: BarChart3, title: "Sem número mínimo de demandas", description: "As demandas são distribuídas de acordo com o escopo de cada projeto. Não há cobrança por volume mínimo." },
  { icon: MessageCircle, title: "Comunicação aberta", description: "Qualquer dúvida ou sugestão é bem-vinda. Valorizamos feedbacks e construção coletiva." },
];

const roles = [
  {
    icon: Users,
    title: "Social Media",
    subtitle: "Cuida de tudo da conta",
    points: [
      "Responsável end-to-end pela conta do cliente: planejamento mensal, briefing de pautas, acompanhamento de captação, aprovação interna, publicação e relatório.",
      "Gestão do calendário editorial dentro do ClickUp e organização dos materiais no Drive.",
      "Reuniões mensais de alinhamento com o cliente e ponto de contato direto no dia a dia.",
      "Faz a interface entre edição, design, audiovisual e tráfego — garante que tudo flua.",
      "Acompanha métricas semanalmente e ajusta a estratégia conforme o desempenho.",
    ],
  },
  {
    icon: Camera,
    title: "Captação Audiovisual",
    subtitle: "Presencial — Barueri, Alphaville e região",
    points: [
      "Captações são agendadas previamente, geralmente em Barueri, Alphaville e região metropolitana de SP.",
      "O Social Media responsável envia o roteiro/pauta antes para alinhamento.",
      "Equipamento próprio (câmera, áudio, iluminação básica) é diferencial — em projetos maiores, a estrutura é fornecida.",
      "Brutos organizados por bloco e entregues em pasta no Google Drive no mesmo dia ou no dia seguinte.",
      "Pontualidade, postura profissional e cuidado com o cliente no set são inegociáveis.",
    ],
  },
  {
    icon: Video,
    title: "Edição de Vídeo",
    subtitle: "Reels, Shorts, TikTok e horizontal",
    points: [
      "Recebe briefing + brutos via ClickUp e Drive, sempre com referências e identidade do cliente anexadas.",
      "Padrão de entrega definido por projeto — geralmente corte inicial em poucos dias úteis.",
      "Versões otimizadas para Reels, TikTok, YouTube Shorts e horizontal quando aplicável.",
      "Rounds de revisão até aprovação final, sempre com feedback estruturado.",
      "Organização dos projetos e arquivos finais sempre nas pastas corretas do cliente.",
    ],
  },
  {
    icon: Palette,
    title: "Design Gráfico",
    subtitle: "Identidade visual aplicada",
    points: [
      "Criação de posts estáticos, carrosséis, capas e materiais de apoio.",
      "Segue o brandbook de cada cliente — consistência é prioridade.",
      "Entregas via Drive, organizadas por mês e por cliente.",
      "Trabalha lado a lado com o Social Media para que arte e copy conversem.",
    ],
  },
  {
    icon: Megaphone,
    title: "Tráfego Pago",
    subtitle: "Meta Ads & Google Ads",
    points: [
      "Estrutura e gestão completa de campanhas em Meta e Google.",
      "Relatórios quinzenais com leitura clara dos resultados.",
      "Alinhamento contínuo com o Social Media para criativos e ofertas.",
      "Otimização constante baseada em dados, não em achismo.",
    ],
  },
];

const expectations = [
  { icon: Target, text: "Comprometimento com os prazos acordados" },
  { icon: AlertCircle, text: "Comunicação proativa sobre qualquer imprevisto" },
  { icon: ThumbsUp, text: "Cuidado com a qualidade do que é entregue" },
  { icon: RefreshCw, text: "Abertura para feedback e melhoria contínua" },
];

const CollaboratorOnboarding = () => {
  return (
    <main className="min-h-screen selection:bg-[#6366F1]/30">
      <SEOHead
        title="Colaborador | Synlua — Braço de Marketing Completo"
        description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua."
      />

      {/* ─── HERO (LIGHT) ─── */}
      <section data-light className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-gradient-radial from-[#e0e0e0]/30 via-[#f5f5f5]/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#050505 1px, transparent 1px), linear-gradient(90deg, #050505 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <img src={synluaLogoDark} alt="" className="w-64 sm:w-80 md:w-96 lg:w-[500px] opacity-[0.04] pointer-events-none select-none" />
        </div>
        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeUp}>
              <img src={synluaLogoHorizontal} alt="Synlua" className="h-14 sm:h-16 md:h-20 mx-auto mb-6" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/40 font-light">
              Onboarding — Colaborador
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.1] text-[#050505]">
              Bem-vindo à{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">Synlua.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light leading-relaxed max-w-xl mx-auto">
              Esse material é, ao mesmo tempo, um onboarding e um alinhamento de cultura. Leia com calma e veja se faz sentido pra você trabalhar com a gente.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                onClick={() => document.getElementById("sobre-synlua")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-[#6366F1] rounded-sm bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-light text-sm tracking-wide uppercase transition-all duration-500 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Conhecer a Synlua
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SOBRE A SYNLUA (LIGHT) ─── */}
      <section id="sobre-synlua" data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4">
              Quem Somos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-6 text-[#050505]">
              Conheça a Synlua
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light leading-relaxed mb-6">
              A Synlua é uma agência de marketing full-service focada em qualidade, estratégia e resultados reais. Trabalhamos com marcas que buscam crescimento consistente e presença digital de alto nível.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light leading-relaxed">
              Prezamos por relações transparentes e um ambiente onde cada pessoa se sinta valorizada. Aqui, cada colaborador é parte essencial do resultado — e tratamos todos com o respeito e a confiança que merecem.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── ONDE ESTAMOS (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA] border-t border-[#050505]/[0.04]">
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4">
              Onde Estamos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-6 text-[#050505]">
              Barueri / SP
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light leading-relaxed mb-6">
              Nosso HQ fica em Barueri, na região metropolitana de São Paulo. O time opera de forma híbrida — boa parte do trabalho acontece remoto, mas as captações de audiovisual, reuniões com clientes e encontros do time são presenciais aqui na região.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-start gap-4 p-6 rounded-lg border border-[#050505]/[0.06] bg-white/60">
              <MapPin className="w-5 h-5 text-[#6366F1]/70 flex-shrink-0 mt-1" />
              <p className="text-base text-[#050505]/70 font-light leading-relaxed">
                Você não precisa morar em Barueri para colaborar conosco — funções como edição, design e tráfego podem ser 100% remotas. Mas para captação audiovisual e funções presenciais, é essencial ter disponibilidade para se deslocar até Barueri, Alphaville e região.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── COMO TRABALHAMOS (DARK) ─── */}
      <section id="como-trabalhamos" className="py-24 sm:py-32 relative bg-[#050505] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366F1]/[0.015] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/30 font-light mb-4">
              Fluxo de Trabalho
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-4">
              Como Trabalhamos
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/40 font-light mb-16 max-w-lg">
              Nosso processo é simples e organizado. Aqui estão as ferramentas e práticas que usamos no dia a dia.
            </motion.p>
            <div className="space-y-5">
              {tools.map((tool, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-start gap-5 p-6 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-[#6366F1]/30 transition-colors duration-500">
                  <tool.icon className="w-6 h-6 text-[#6366F1]/70 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg sm:text-xl text-white/80 font-light mb-1">{tool.title}</p>
                    <p className="text-base text-white/45 font-light leading-relaxed">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── NOSSA CULTURA (DARK) ─── */}
      <section className="py-24 sm:py-32 relative bg-[#050505] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/[0.01] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/30 font-light mb-4">
              Cultura
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-16">
              Como é trabalhar com a gente
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cultureCards.map((card, i) => (
                <motion.div key={i} variants={fadeUp} className="p-6 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-[#6366F1]/30 transition-colors duration-500">
                  <card.icon className="w-6 h-6 text-[#6366F1]/70 mb-4" />
                  <p className="text-lg text-white/80 font-light mb-2">{card.title}</p>
                  <p className="text-sm text-white/40 font-light leading-relaxed">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA CADA FUNÇÃO (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4">
              Funções
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-4 text-[#050505]">
              Como funciona cada função
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light leading-relaxed mb-16 max-w-xl">
              Cada papel tem um fluxo claro dentro da Synlua. Encontre o seu abaixo e veja em detalhe como o dia a dia se desenha — assim você sabe exatamente o que esperar (e o que esperamos de você).
            </motion.p>
            <div className="space-y-6">
              {roles.map((role, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-6 sm:p-8 rounded-lg border border-[#050505]/[0.06] bg-white/70 hover:border-[#6366F1]/30 transition-colors duration-500"
                >
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-11 h-11 rounded-md bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                      <role.icon className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl text-[#050505]/85 font-light">{role.title}</p>
                      <p className="text-sm text-[#6366F1]/80 font-light mt-0.5">{role.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 pl-1 sm:pl-16">
                    {role.points.map((p, idx) => (
                      <li key={idx} className="flex gap-3 text-base text-[#050505]/65 font-light leading-relaxed">
                        <span className="text-[#6366F1] mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-[#6366F1]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPECTATIVAS (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4">
              O Que Esperamos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-6 text-[#050505]">
              Alinhamento simples
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light leading-relaxed mb-10">
              Não temos uma lista infinita de regras. Apenas alguns pontos que garantem uma colaboração saudável e produtiva:
            </motion.p>
            <div className="space-y-5">
              {expectations.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 p-5 rounded-lg border border-[#050505]/[0.06] bg-white/60">
                  <item.icon className="w-5 h-5 text-[#6366F1]/70 flex-shrink-0" />
                  <p className="text-base text-[#050505]/70 font-light">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center">
              <div className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />
              <p className="text-xl sm:text-2xl md:text-3xl font-extralight tracking-tight text-[#050505]/70">
                Bem-vindo ao time.{" "}
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  Vamos construir juntos.
                </span>
              </p>
              <p className="text-base text-[#666] font-light mt-6 max-w-md mx-auto">
                Qualquer dúvida, fale com a equipe pelo grupo oficial do projeto.
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-[#050505]/25 mt-8 font-light">
                Synlua Marketing
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CollaboratorOnboarding;
