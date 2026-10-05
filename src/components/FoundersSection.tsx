import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";
import GlowButton from "@/components/ui/glow-button";
import pabloAsset from "@/assets/pablo-jardim.webp.asset.json";
const pabloImage = pabloAsset.url;
import beatrizImage from "@/assets/beatriz.webp";


const founders = [
  {
    name: "Pablo Couto",
    role: "CEO & Fundador",
    image: pabloImage,
    text: "Cuida de funis, vendas e visão estratégica. É quem desenha o caminho entre o investimento em mídia e o resultado real no caixa do cliente.",
  },
  {
    name: "Beatriz Azevedo",
    role: "COO & Fundadora",
    image: beatrizImage,
    text: "Cuida do time interno, dos processos e da qualidade das entregas. É quem garante que a estratégia vire execução no prazo e no padrão certo.",
  },
];

const FoundersSection = () => {
  return (
    <section id="sobre" className="relative bg-[#050508] py-16 sm:py-24 overflow-hidden" style={{ scrollMarginTop: "90px" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(139,92,246,0.10)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 space-y-14 sm:space-y-28">
        {founders.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className={`grid md:grid-cols-2 gap-6 md:gap-14 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <SpotlightCard className="bg-gradient-to-br from-[#1b1235] to-[#0a0a14]">
              <img
                src={f.image}
                alt={f.name}
                width={800}
                height={920}
                loading="lazy"
                decoding="async"
                className="w-full h-[300px] sm:h-[460px] object-contain object-bottom"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(139,92,246,0.25)_0%,transparent_65%)] pointer-events-none" />
            </SpotlightCard>

            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#8B5CF6] uppercase">{f.role}</span>
              <h2 className="mt-3 sm:mt-4 text-[clamp(2rem,8vw,2.75rem)] sm:text-5xl font-extralight text-[#EDEDED] tracking-tight leading-[1.05]">
                {f.name}
              </h2>
              <div className="mt-5 sm:mt-6 w-16 h-px bg-gradient-to-r from-[#6366F1] to-transparent" />
              <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg text-[#a0a0a0] font-light leading-relaxed max-w-lg">{f.text}</p>
            </div>

          </motion.div>
        ))}

        <div className="flex justify-center pt-2">
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
