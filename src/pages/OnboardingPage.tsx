import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2, MessageSquare, Target, BarChart3, Shield, Zap, Loader2, Users, Briefcase, Star, Package } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import synluaLogoDark from "@/assets/synlua-logo.webp";
import synluaLogoHorizontal from "@/assets/synlua-logo-horizontal.webp";
import CollaboratorOnboarding from "@/components/CollaboratorOnboarding";
import InfluencerOnboarding from "@/components/InfluencerOnboarding";
import SupplierOnboarding from "@/components/SupplierOnboarding";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const timelineData = [
  {
    day: "Início",
    items: [
      "Você recebe o Formulário de Briefing — quanto mais detalhado, melhor conseguimos direcionar a estratégia.",
      "Ideal preencher em até 24 horas para não atrasar o pontapé inicial.",
    ],
  },
  {
    day: "Dia 1–3",
    items: [
      "Analisamos tudo que você enviou no briefing.",
      "Agendamos a Primeira Reunião Estratégica com você.",
      "Solicitamos os acessos necessários (redes sociais, plataformas, contas de anúncio).",
    ],
  },
  {
    day: "Dia 1–3",
    items: [
      "Configuração inicial das plataformas e organização estrutural do projeto.",
      "Aqui o motor começa a rodar.",
    ],
  },
  {
    day: "Dia 5–7",
    items: [
      "Desenvolvimento da Estratégia Macro — o plano de jogo completo para o seu negócio.",
    ],
  },
  {
    day: "Dia 8–10 (dependendo da disponibilidade)",
    items: [
      "Reunião de apresentação da análise e do direcionamento estratégico.",
      "Envio do roteiro simplificado para sua validação.",
    ],
  },
  {
    day: "Até 5 dias após a primeira reunião",
    items: [
      "Momento de você enviar os materiais solicitados (vídeos, informações complementares, etc.).",
    ],
  },
  {
    day: "Até 5 dias após a entrega dos vídeos",
    items: ["Entrega do primeiro material do mês — pronto para sua aprovação."],
  },
  {
    day: "Finalização",
    items: ["Ajustes finais e agendamento das publicações. Tudo alinhado para ir ao ar."],
  },
];

const expectations = [
  "Preencher o briefing com profundidade",
  "Enviar acessos no prazo solicitado",
  "Cumprir os prazos de envio de materiais",
  "Participar das reuniões estratégicas",
];

const commitments = [
  { icon: Target, text: "Foco em conversão e resultado" },
  { icon: BarChart3, text: "Transparência total" },
  { icon: Shield, text: "Processos estruturados" },
  { icon: Zap, text: "Marketing orientado a vendas" },
];

type UserRole = "cliente" | "colaborador" | "influenciador" | "fornecedor" | null;

const roleOptions = [
  { key: "cliente" as const, label: "Cliente", icon: Briefcase, desc: "Sou cliente da Synlua" },
  { key: "influenciador" as const, label: "Influenciador(a)", icon: Star, desc: "Sou influenciador(a) parceiro(a)" },
  { key: "fornecedor" as const, label: "Fornecedor", icon: Package, desc: "Sou fornecedor / prestador de serviço" },
  { key: "colaborador" as const, label: "Colaborador(a)", icon: Users, desc: "Faço parte do time Synlua" },
];

const OnboardingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isSelectingRole, setIsSelectingRole] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setIsSelectingRole(true);
    setTimeout(() => {
      setIsSelectingRole(false);
      setUserRole(role);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#050508] flex items-center justify-center selection:bg-[#6366F1]/30">
        <SEOHead
          title="Login | Synlua — Braço de Marketing Completo"
          description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua."
          path="/onboarding"
          noindex
        />
        <div className="w-full max-w-md px-6 text-center">
          <img src={synluaLogoHorizontal} alt="Synlua" className="h-12 sm:h-14 mx-auto mb-10" />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CheckCircle2 className="w-14 h-14 text-[#6366F1] mx-auto mb-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl font-light text-white/80 mb-3"
          >
            Login realizado com sucesso
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-white/30 font-light mb-8"
          >
            Redirecionando para o seu painel...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Loader2 className="w-5 h-5 animate-spin text-[#6366F1]/50 mx-auto" />
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── ROLE SELECTION ───
  if (isAuthenticated && !userRole) {
    return (
      <main className="min-h-screen bg-[#050508] flex items-center justify-center selection:bg-[#6366F1]/30">
        <SEOHead title="Perfil | Synlua — Braço de Marketing Completo" description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua." path="/onboarding" noindex />
        <div className="w-full max-w-lg px-6">
          <div className="text-center mb-10">
            <img src={synluaLogoHorizontal} alt="Synlua" className="h-12 sm:h-14 mx-auto mb-8" />
          </div>

          {isSelectingRole ? (
            <div className="flex flex-col items-center gap-4 py-16">
              <Loader2 className="w-6 h-6 animate-spin text-[#6366F1]" />
              <p className="text-white/40 text-sm font-light">Preparando seu painel...</p>
            </div>
          ) : (
            <div className="border border-white/[0.08] rounded-lg p-8 bg-white/[0.02]">
              <h1 className="text-xl font-light text-white/80 text-center mb-8">Você é:</h1>
              <div className="space-y-3">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleRoleSelect(opt.key)}
                    className="w-full flex items-center gap-4 p-5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:border-[#6366F1]/50 hover:bg-[#6366F1]/[0.05] transition-all duration-400 text-left group"
                  >
                    <opt.icon className="w-5 h-5 text-white/30 group-hover:text-[#6366F1] transition-colors flex-shrink-0" />
                    <div>
                      <p className="text-base text-white/80 font-light">{opt.label}</p>
                      <p className="text-sm text-white/30 font-light">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // ─── INFLUENCIADOR ───
  if (userRole === "influenciador") {
    return <InfluencerOnboarding />;
  }

  // ─── FORNECEDOR ───
  if (userRole === "fornecedor") {
    return <SupplierOnboarding />;
  }

  // ─── COLABORADOR ───
  if (userRole === "colaborador") {
    return <CollaboratorOnboarding />;
  }

  return (
    <main className="min-h-screen selection:bg-[#6366F1]/30">
      <SEOHead
        title="Onboarding | Synlua — Braço de Marketing Completo"
        description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua."
        path="/onboarding"
        noindex
      />

      {/* ─── HERO (LIGHT) ─── */}
      <section data-light className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-gradient-radial from-[#e0e0e0]/30 via-[#f5f5f5]/20 to-transparent" />
        
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#050505 1px, transparent 1px), linear-gradient(90deg, #050505 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />

        {/* Logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <img
            src={synluaLogoDark}
            alt=""
            className="w-64 sm:w-80 md:w-96 lg:w-[500px] opacity-[0.04] pointer-events-none select-none"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <img src={synluaLogoHorizontal} alt="Synlua" className="h-14 sm:h-16 md:h-20 mx-auto mb-6" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/40 font-light"
            >
              Onboarding
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.1] text-[#050505]"
            >
              Bem-vindo à{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Synlua.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-[#666] font-light leading-relaxed max-w-xl mx-auto"
            >
              Parabéns por se tornar um parceiro Synlua. A partir de agora, operamos como o braço estratégico de marketing da sua empresa — com processos claros, prazos definidos e foco absoluto em resultado.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-xl sm:text-2xl text-[#333] font-light leading-relaxed max-w-2xl mx-auto"
            >
              Agora começamos a estruturar o crescimento da sua empresa com método, estratégia e foco em vendas.
            </motion.p>

            <motion.div variants={fadeUp}>
              <button
                onClick={() =>
                  document.getElementById("processo")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-3 px-8 py-4 border border-[#6366F1] rounded-sm bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-light text-sm tracking-wide uppercase transition-all duration-500 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Entender o Processo
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE (DARK) ─── */}
      <section id="processo" className="py-24 sm:py-32 relative bg-[#050505] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366F1]/[0.015] to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/30 font-light mb-4"
            >
              Processo
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-4"
            >
              Como Funciona Nosso Início
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-white/40 font-light mb-16 max-w-lg"
            >
              Esses são os prazos máximos de cada etapa. Na prática, muitas vezes conseguimos antecipar — especialmente quando a colaboração flui bem dos dois lados.
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1]/30 via-[#6366F1]/10 to-transparent" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={staggerContainer}
              className="space-y-10"
            >
              {timelineData.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-5 sm:gap-6 group">
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full border border-[#6366F1]/40 bg-[#050505] flex items-center justify-center group-hover:border-[#6366F1]/80 transition-colors duration-500 relative z-10">
                      <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-[#6366F1]/60 group-hover:bg-[#6366F1] transition-colors duration-500" />
                    </div>
                  </div>
                  <div className="pb-2">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#6366F1]/70 font-medium mb-2">
                      {step.day}
                    </p>
                    <ul className="space-y-1.5">
                      {step.items.map((item, j) => (
                        <li key={j} className="text-base sm:text-lg text-white/55 font-light leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── EXPECTATIONS (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4"
            >
              Colaboração
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-6 text-[#050505]"
            >
              O Que Esperamos de Você
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-[#666] font-light mb-12 max-w-lg"
            >
              A performance dos resultados depende de colaboração ativa entre sua equipe e a nossa. Abaixo estão as responsabilidades essenciais do parceiro.
            </motion.p>

            <div className="space-y-4">
              {expectations.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 rounded-lg border border-[#050505]/[0.06] bg-white hover:border-[#6366F1]/30 transition-colors duration-500"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#6366F1] flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-[#333] font-light">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── COMMUNICATION (DARK) ─── */}
      <section className="py-24 sm:py-32 relative bg-[#050505] text-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/30 font-light mb-4"
            >
              Comunicação
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-12"
            >
              Comunicação e Solicitações
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="p-6 rounded-lg border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="flex items-start gap-4">
                <MessageSquare className="w-5 h-5 text-[#6366F1]/50 flex-shrink-0 mt-0.5" />
                <div className="space-y-3">
                   <p className="text-base sm:text-lg text-white/55 font-light leading-relaxed">
                    Toda comunicação será feita pelo grupo oficial do projeto, garantindo rastreabilidade e agilidade nas trocas.
                  </p>
                  <p className="text-base sm:text-lg text-white/55 font-light leading-relaxed">
                    Caso deseje alguma demanda extra ou adicional fora do escopo contratado, poderá solicitar diretamente no grupo.
                  </p>
                  <p className="text-base sm:text-lg text-white/45 font-light leading-relaxed">
                    A equipe analisará viabilidade, prazo e possível ajuste de investimento antes de iniciar a execução.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── COMMITMENT (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4"
            >
              Compromisso
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-12 text-[#050505]"
            >
              Compromisso Synlua
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {commitments.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-5 rounded-lg border border-[#050505]/[0.06] bg-white hover:border-[#6366F1]/30 transition-colors duration-500"
                >
                  <item.icon className="w-5 h-5 text-[#6366F1] flex-shrink-0" />
                  <p className="text-base sm:text-lg text-[#333] font-light">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Final statement */}
            <motion.div variants={fadeUp} className="text-center pt-8">
              <div className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />
              <p className="text-xl sm:text-2xl md:text-3xl font-extralight tracking-tight text-[#050505]/70">
                Conversão não é acaso.{" "}
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  É método.
                </span>
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-[#050505]/25 mt-6 font-light">
                Synlua Marketing
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default OnboardingPage;
