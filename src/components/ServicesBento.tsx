import { openQuiz } from "@/lib/quiz";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import GlowButton from "@/components/ui/glow-button";
import { Target, Video, TrendingUp, Sparkles, LineChart, ArrowRight } from "lucide-react";

const scrollToForm = () => {
  openQuiz();
};

const cards = [
  {
    icon: Target,
    title: "Estratégia Digital",
    text: "Planejamento para posicionar sua marca, atrair clientes e vender mais no digital.",
    span: "md:col-span-2",
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: "Tráfego Pago",
    text: "Gestão de anúncios em Meta e Google para gerar leads, vendas e crescimento acelerado.",
    span: "md:col-span-3",
    highlight: true,
  },
  {
    icon: Video,
    title: "Audiovisual",
    text: "Captações presenciais, edição e conteúdo com qualidade de cinema, tudo com equipe in house.",
    span: "md:col-span-3",
    highlight: false,
  },
  {
    icon: Sparkles,
    title: "Social Media",
    text: "Conteúdo, design e gestão de redes que constroem autoridade todos os dias.",
    span: "md:col-span-2",
    highlight: false,
  },
  {
    icon: LineChart,
    title: "Dados e Relatórios",
    text: "Acompanhamento claro dos números para decidir com segurança e escalar o que funciona.",
    span: "md:col-span-5",
    highlight: false,
  },
];

const shimmer = (
  <span aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
    <span className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.12)_55%,transparent_75%)] animate-shimmer opacity-80" />
  </span>
);

const ServicesBento = () => {
  return (
    <section id="servicos" className="relative bg-[#050508] py-16 sm:py-24" style={{ scrollMarginTop: "90px" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.07)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-4 md:gap-6 items-end mb-10 sm:mb-12"
        >
          <h2 className="text-[clamp(1.75rem,7vw,2.4rem)] sm:text-4xl md:text-5xl font-extralight text-[#EDEDED] tracking-tight leading-[1.15]">
            Tudo o que sua empresa precisa para{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              vender mais no digital
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#808080] font-light leading-relaxed md:text-right">
            <strong className="text-[#EDEDED] font-normal">Nós cuidamos</strong> de toda a estrutura de marketing
            enquanto você foca no crescimento do seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={card.span}
              >
                <SpotlightCard
                  intensity={card.highlight ? 0.22 : 0.16}
                  className={`h-full p-6 sm:p-9 relative overflow-hidden group/card transition-transform duration-300 hover:-translate-y-1 ${
                    card.highlight
                      ? "bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#5B21B6] border-[#8B5CF6]/40 shadow-[0_0_50px_rgba(139,92,246,0.25)]"
                      : "border-white/[0.06] hover:border-[#8B5CF6]/20"
                  }`}
                >
                  {card.highlight && shimmer}
                  <motion.div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 sm:mb-8 transition-colors duration-300 ${
                      card.highlight
                        ? "bg-white/10 text-white"
                        : "bg-[#0c0c16] text-[#8B5CF6] group-hover/card:text-white group-hover/card:bg-[#8B5CF6]/20"
                    }`}
                    whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.div>

                  <h3
                    className={`text-xl sm:text-3xl font-light tracking-tight mb-2.5 sm:mb-3 ${
                      card.highlight ? "text-white" : "text-[#EDEDED]"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base font-light leading-relaxed max-w-md ${
                      card.highlight ? "text-white/80" : "text-[#808080] group-hover/card:text-[#EDEDED]/80"
                    }`}
                  >
                    {card.text}
                  </p>

                  <div className={`mt-5 sm:mt-6 h-px bg-gradient-to-r from-transparent ${card.highlight ? "via-white/20" : "via-[#8B5CF6]/30"} to-transparent`} />
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <GlowButton type="button" variant="gradient" onClick={scrollToForm}>
            Fale Conosco
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/glow:translate-x-1" />
          </GlowButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
