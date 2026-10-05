import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import SpotlightCard from "@/components/ui/spotlight-card";
import GlowButton from "@/components/ui/glow-button";

const DiagnosticCTA = () => {
  return (
    <section id="diagnostico" className="relative py-20 sm:py-28 md:py-32 bg-[#050508] overflow-hidden">
      {/* Aura roxa de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.10)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Grid sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #6366F1 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <SpotlightCard className="bg-[#0a0a14]/80 backdrop-blur-2xl">
            <div className="relative px-6 sm:px-12 py-12 sm:py-16 text-center overflow-hidden">
              {/* Linha luminosa no topo */}
              <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/60 to-transparent" />

              {/* Glow interno sutil */}
              <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14)_0%,transparent_70%)]" />

              <div className="relative z-10">
                <div className="flex justify-center">
                  <SectionLabel text="PRÓXIMO_PASSO" />
                </div>

                <h2 className="mt-5 text-[clamp(1.8rem,6.8vw,2.6rem)] sm:text-4xl md:text-5xl font-light tracking-tight text-[#EDEDED] leading-[1.1]">
                  O próximo passo é{" "}
                  <span className="italic font-serif bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                    simples
                  </span>
                  .
                </h2>

                <p className="mt-5 text-[15px] sm:text-lg text-[#808080] leading-relaxed max-w-xl mx-auto">
                  Entenda como a Synlua vai atuar no seu negócio e construir um braço de Marketing completo para sua empresa.
                </p>

                <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
                  <Link to="/#diagnostico" tabIndex={-1} aria-hidden>
                    <GlowButton variant="gradient" className="px-10 sm:px-14 py-4 sm:py-5 text-sm sm:text-base uppercase tracking-wider">
                      <span>Quero Escalar Meus Resultados</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/glow:translate-x-1" />
                    </GlowButton>
                  </Link>

                  <p className="flex items-center justify-center gap-2 text-[13px] text-[#6f6f7d]">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    Leva menos de 1 minuto · Sem compromisso
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosticCTA;
