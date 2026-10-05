import { openQuiz } from "@/lib/quiz";
import { ArrowRight, Zap, Star } from "lucide-react";
import GlowButton from "@/components/ui/glow-button";
import HeroShowcase from "@/components/HeroShowcase";
import c1 from "@/assets/clients/wise-up.webp";
import c2 from "@/assets/clients/maxime.webp";
import c3 from "@/assets/clients/parnassah.webp";

const avatars = [c1, c2, c3];

const scrollToForm = () => {
  openQuiz();
};

const HeroCinematic = () => {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#050508]">
      {/* Vitrine infinita de cases */}
      <div className="absolute inset-0">
        <HeroShowcase />
        <div className="absolute inset-0 pointer-events-none bg-[#050508]/50" />


        {/* Vinheta premium fechando os cantos */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/85 via-[#050508]/20 to-[#050508]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-[#050508]/15 to-[#050508]/65" />

        {/* Glow roxo muito sutil no lado direito */}
        <div className="absolute top-[-10%] right-[5%] w-[45vw] h-[45vw] max-w-[620px] max-h-[620px] rounded-full bg-[#8B5CF6]/10 blur-[140px]" />
        {/* Glow roxo muito sutil no lado esquerdo */}
        <div className="absolute bottom-[5%] left-[-10%] w-[55vw] h-[55vw] max-w-[720px] max-h-[720px] rounded-full bg-[#6366F1]/6 blur-[160px]" />
      </div>

      {/* Textura/grid sutil do lado esquerdo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(139,92,246,0.22) 1px, transparent 0), radial-gradient(circle at 1px 1px, rgba(99,102,241,0.12) 1px, transparent 0)",
          backgroundSize: "40px 40px, 80px 80px",
          maskImage: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 35%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 35%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-12">
        <div className="max-w-3xl mx-auto md:mx-0 md:ml-[8vw] lg:ml-[12vw] text-center md:text-left">
          <h1
            className="hero-rise text-[clamp(1.85rem,7.4vw,3rem)] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[74px] sm:leading-[1.05] font-extralight tracking-tight text-[#EDEDED]"
          >
            Tenha um braço de{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent font-light">
              Marketing
            </span>{" "}
            completo para sua empresa.
          </h1>

          <div
            style={{ animationDelay: "0.18s" }}
            className="hero-fade mt-6 sm:mt-7 inline-flex items-start sm:items-center justify-center md:justify-start gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 mx-auto md:mx-0"
          >
            <Zap className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0 text-[#8B5CF6]" />
            <span className="text-[13px] sm:text-sm text-[#EDEDED]/90 font-light">
              Estratégia, posicionamento e geração de demanda.
            </span>
          </div>

          <div
            style={{ animationDelay: "0.28s" }}
            className="hero-fade mt-7 sm:mt-8 flex items-center justify-center md:justify-start gap-3 sm:gap-4"
          >
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <span
                  key={i}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/15 bg-[#0a0a14] flex items-center justify-center"
                >
                  <img src={src} alt="" width={44} height={44} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 text-[#F5B942]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[13px] sm:text-sm text-[#EDEDED]/80 font-light mt-0.5">+400 clientes atendidos</p>
            </div>
          </div>

          <div
            style={{ animationDelay: "0.38s" }}
            className="hero-fade mt-8 sm:mt-9 flex justify-center md:justify-start"
          >
            <GlowButton type="button" variant="gradient" onClick={scrollToForm} className="px-7 sm:px-8">
              <span className="relative z-10 flex items-center gap-2">
                Fale Conosco
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/glow:translate-x-1" />
              </span>
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCinematic;
