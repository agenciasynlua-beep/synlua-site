import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";
import GlowButton from "@/components/ui/glow-button";
import pabloImage from "@/assets/pablo-jardim.webp";
import beatrizImage from "@/assets/beatriz.webp";


const founders = [
  {
    name: "Pablo Couto",
    role: "CEO & Fundador",
    image: pabloImage,
    // Retrato vertical: mantém o rosto no terço superior do quadro
    imageClass: "object-[50%_22%]",
    text: "Cuida de funis, vendas e visão estratégica. É quem desenha o caminho entre o investimento em mídia e o resultado real no caixa do cliente.",
  },
  {
    name: "Beatriz Azevedo",
    role: "COO & Fundadora",
    image: beatrizImage,
    // A foto original traz uma moldura cinza embutida: o zoom corta a moldura e iguala o enquadramento do Pablo
    imageClass: "object-[50%_30%] scale-[1.35] origin-[50%_48%]",
    text: "Cuida do time interno, dos processos e da qualidade das entregas. É quem garante que a estratégia vire execução no prazo e no padrão certo.",
  },
];

const FoundersSection = () => {
  return (
    <section id="sobre" className="relative bg-[#050508] py-16 sm:py-24 overflow-hidden" style={{ scrollMarginTop: "90px" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(139,92,246,0.10)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full bg-gradient-to-b from-[#14102a] to-[#0a0a14]">
                <div className="flex h-full flex-col">
                  {/* Mesma proporção e mesmo tratamento de cor nas duas fotos */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0a14]">
                    <img
                      src={f.image}
                      alt={f.name}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover saturate-[0.85] contrast-[1.05] ${f.imageClass}`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(139,92,246,0.22)_0%,transparent_65%)] mix-blend-soft-light pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/35 to-transparent pointer-events-none" />
                  </div>

                  <div className="relative -mt-16 flex flex-1 flex-col px-6 pb-7 sm:px-8 sm:pb-9">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#8B5CF6] uppercase">{f.role}</span>
                    <h2 className="mt-3 text-[clamp(1.9rem,7vw,2.5rem)] font-extralight text-[#EDEDED] tracking-tight leading-[1.05]">
                      {f.name}
                    </h2>
                    <div className="mt-4 w-16 h-px bg-gradient-to-r from-[#6366F1] to-transparent" />
                    <p className="mt-4 text-[15px] sm:text-base text-[#a0a0a0] font-light leading-relaxed">{f.text}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-10 sm:pt-14">
          <GlowButton
            type="button"
            variant="gradient"
            onClick={() =>
              document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Fale Conosco
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/glow:translate-x-1" />
          </GlowButton>
        </div>
      </div>
    </section>

  );
};

export default FoundersSection;
