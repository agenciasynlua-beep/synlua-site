import banvale from "@/assets/clients/banvale.webp";
import destaks from "@/assets/clients/destaks.webp";
import droAdvogados from "@/assets/clients/dro-advogados.webp";
import equityPlus from "@/assets/clients/equity-plus.webp";
import maxime from "@/assets/clients/maxime.webp";
import mbBeauty from "@/assets/clients/mb-beauty.webp";
import openbot from "@/assets/clients/openbot.webp";
import outograf from "@/assets/clients/outograf.webp";
import parnassah from "@/assets/clients/parnassah.webp";
import wiseUp from "@/assets/clients/wise-up.webp";
import { useDragScroll } from "@/hooks/use-drag-scroll";

const logos = [banvale, destaks, droAdvogados, equityPlus, maxime, mbBeauty, openbot, outograf, parnassah, wiseUp];

const ClientsMarquee = () => {
  const { containerRef, handlers } = useDragScroll();

  return (
    <section className="bg-[#050508] py-10 sm:py-14 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a2e] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a2e] to-transparent" />

      <p className="text-center text-[10px] tracking-[0.3em] text-[#6366F1]/60 uppercase mb-6 sm:mb-8 font-mono">
        Marcas que confiam
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          {...handlers}
          className="flex overflow-x-auto scrollbar-hide select-none [touch-action:pan-x_pan-y]"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex w-max animate-scroll-left">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 mx-3 sm:mx-4 flex items-center justify-center">
                <img
                  src={logo}
                  alt=""
                  draggable={false}
                  width={128}
                  height={128}
                  loading={i < 10 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-24 sm:h-28 md:h-32 w-auto rounded-lg object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500 pointer-events-none bg-[#0a0a12]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
