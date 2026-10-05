import { openQuiz } from "@/lib/quiz";
import SectionLabel from "@/components/SectionLabel";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { Hand } from "lucide-react";

import cap8 from "@/assets/branding/captacoes/cap-8.webp";
import cap10 from "@/assets/branding/captacoes/cap-10.webp";
import cap11 from "@/assets/branding/captacoes/cap-11_1.webp";
import cap12 from "@/assets/branding/captacoes/cap-12_1.webp";
import cap13 from "@/assets/branding/captacoes/cap-13.webp";
import cap14 from "@/assets/branding/captacoes/cap-14.webp";
import cap15 from "@/assets/branding/captacoes/cap-15_1.webp";

const images = [cap13, cap10, cap15, cap11, cap14, cap12, cap8].map((src) => ({
  src,
  alt: "Captações",
}));

const half = Math.ceil(images.length / 2);
const rowTop = [...images.slice(0, half), ...images.slice(0, half)];
const rowBottom = [...images.slice(half), ...images.slice(half), ...images.slice(half)];

const DragHint = ({ light = false }: { light?: boolean }) => (
  <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-[11px] font-light tracking-wide opacity-70 animate-fade-in">
    <Hand className={`w-3.5 h-3.5 ${light ? "text-[#6366F1]" : "text-[#8B5CF6]"}`} />
    <span className={light ? "text-[#555]" : "text-[#808080]"}>Arraste para explorar</span>
  </div>
);

const MarqueeRow = ({
  items,
  reverse = false,
  duration = "60s",
  light = false,
}: {
  items: { src: string; alt: string }[];
  reverse?: boolean;
  duration?: string;
  light?: boolean;
}) => {
  const { containerRef, handlers } = useDragScroll();
  return (
    <div
      ref={containerRef}
      {...handlers}
      className="overflow-x-auto overflow-y-visible scrollbar-hide select-none [touch-action:pan-x_pan-y]"
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className={`flex w-max ${reverse ? "animate-scroll-right" : "animate-scroll-left"} will-change-transform transform-gpu`}
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-5 sm:gap-6 pr-5 sm:pr-6" aria-hidden={setIndex === 1}>
            {items.map((img, i) => (
              <div
                key={`${i}-${setIndex}`}
                className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] rounded-2xl overflow-hidden relative group bg-[#0a0a14] border border-[#1f1f35]/40 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[#6366F1]/50 hover:shadow-[0_12px_40px_-18px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:-translate-y-1"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  width={1080}
                  height={1350}
                  className="block w-full h-[340px] sm:h-[400px] md:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#050508]/90 via-[#050508]/40 to-transparent pointer-events-none">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs rounded-full px-3 py-1 border backdrop-blur-sm ${light ? "text-[#1a1a2e]/90 bg-[#f5f5f7] border-[#e0e0e8]" : "text-[#EDEDED]/90 bg-[#0a0a14]/80 border-[#1a1a2e]"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const BrandingMarquee = ({ light = false }: { light?: boolean }) => {
  return (
    <section
      data-light={light || undefined}
      className={`relative py-12 sm:py-16 overflow-hidden ${light ? "bg-[#FAFAFA]" : "bg-[#050508]"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.03)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center">
            <SectionLabel text="POSICIONAMENTO" />
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-3xl mx-auto ${light ? "text-[#1a1a2e]" : "text-[#EDEDED]"}`}>
            Nosso foco é construir um{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent font-medium">
              posicionamento forte
            </span>{" "}
            para a sua marca e gerar resultado.
          </h2>
          <p className={`mt-4 text-sm sm:text-base max-w-lg mx-auto ${light ? "text-[#555]" : "text-[#808080]"}`}>
            Cada detalhe visual comunica autoridade e profissionalismo.
          </p>
          <DragHint light={light} />
        </div>
      </div>

      <div className="relative space-y-5">
        <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r to-transparent z-10 pointer-events-none ${light ? "from-[#FAFAFA]" : "from-[#050508]"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l to-transparent z-10 pointer-events-none ${light ? "from-[#FAFAFA]" : "from-[#050508]"}`} />

        <MarqueeRow items={rowTop} duration="60s" light={light} />
        <MarqueeRow items={rowBottom} reverse duration="70s" light={light} />
      </div>

      <div className="mt-10 sm:mt-14 flex justify-center">
        <button
          type="button"
          onClick={() => openQuiz()}
          className={`inline-flex items-center gap-2 text-sm rounded-full px-5 py-2.5 transition-all duration-300 cursor-pointer ${
            light
              ? "text-[#1a1a2e] border border-[#e0e0e8] bg-white hover:border-[#6366F1]/50"
              : "text-[#EDEDED]/80 hover:text-[#EDEDED] border border-[#1a1a2e] hover:border-[#6366F1]/50 bg-[#0a0a14]/50 hover:bg-[#0a0a14]"
          }`}
        >
          Fale Conosco
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
};

export default BrandingMarquee;
