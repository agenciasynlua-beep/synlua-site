import { openQuiz } from "@/lib/quiz";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import GlowButton from "@/components/ui/glow-button";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { StrategyVisual, TrafficVisual, VideoVisual, SocialVisual, DataVisual } from "@/components/ServiceVisuals";

const scrollToForm = () => {
  openQuiz();
};

const cards = [
  {
    visual: StrategyVisual,
    title: "Estratégia Digital",
    text: "Posicionamento que atrai clientes e vende.",
    span: "md:col-span-2",
    highlight: false,
  },
  {
    visual: TrafficVisual,
    title: "Tráfego Pago",
    text: "Anúncios no Meta e Google que geram lead e venda.",
    span: "md:col-span-3",
    highlight: true,
  },
  {
    visual: VideoVisual,
    title: "Audiovisual",
    text: "Captação e edição com qualidade de cinema, tudo in house.",
    span: "md:col-span-3",
    highlight: false,
  },
  {
    visual: SocialVisual,
    title: "Social Media",
    text: "Conteúdo, design e gestão de redes que constroem autoridade.",
    span: "md:col-span-2",
    highlight: false,
  },
  {
    visual: DataVisual,
    title: "Dados e Relatórios",
    text: "Números claros para decidir e escalar o que funciona.",
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
    <section id="servicos" className="relative bg-[#050508] py-20 sm:py-32" style={{ scrollMarginTop: "90px" }}>
      <span aria-hidden className="sl-moon left-1/2 -translate-x-1/2 top-24 h-[780px] w-[780px] hidden md:block" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,90,214,0.07)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-4 md:gap-10 items-end mb-12 sm:mb-16"
        >
          <div>
            <SectionLabel text="SERVIÇOS" className="!justify-start" />
            <h2 className="text-[clamp(1.9rem,8vw,2.6rem)] sm:text-5xl md:text-6xl text-[#EDEDED]">
              Tudo o que sua empresa precisa para{" "}
              <span className="sl-grad">vender mais no digital</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#808080] font-light leading-relaxed md:text-right">
            <strong className="text-[#EDEDED] font-normal">Nós cuidamos</strong> de toda a estrutura de marketing
            enquanto você foca no crescimento do seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5">
          {cards.map((card, i) => {
            const Visual = card.visual;
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
                      ? "bg-gradient-to-br from-[#5f3fb5] via-[#5f3fb5] to-[#48308f] border-[#bd86f5]/40 shadow-[0_0_50px_rgba(189,134,245,0.25)]"
                      : "border-white/[0.06] hover:border-[#bd86f5]/20"
                  }`}
                >
                  {card.highlight && shimmer}
                  <div className="mb-6 sm:mb-8"><Visual /></div>

                  <h3
                    className={`font-display uppercase text-xl sm:text-3xl tracking-[-0.04em] leading-none mb-3 sm:mb-4 ${
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

                  <div className={`mt-5 sm:mt-6 h-px bg-gradient-to-r from-transparent ${card.highlight ? "via-white/20" : "via-[#bd86f5]/30"} to-transparent`} />
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
