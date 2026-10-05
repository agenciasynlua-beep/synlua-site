import {
  Globe, Target, MessageSquare, Sparkles,
  TrendingUp, Video, Rocket, Pen
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { useDragScroll } from "@/hooks/use-drag-scroll";

const row1 = [
  { title: "MARKETING COMPLETO", icon: TrendingUp, description: "Estratégia 360° para crescimento acelerado", num: "01" },
  { title: "CAPTAÇÃO DE LEADS", icon: Target, description: "Tráfego pago com foco em ROI", num: "02" },
  { title: "SOCIAL MEDIA", icon: MessageSquare, description: "Gestão e conteúdo para suas redes", num: "03" },
  { title: "BRANDING", icon: Sparkles, description: "Identidade visual única e memorável", num: "04" },
];

const row2 = [
  { title: "SITES & LP", icon: Globe, description: "Websites que convertem visitantes", num: "05" },
  { title: "AUDIOVISUAL", icon: Video, description: "Vídeos que engajam e impactam", num: "06" },
  { title: "LANÇAMENTOS", icon: Rocket, description: "Eventos digitais de alto faturamento", num: "07" },
  { title: "COPYWRITING", icon: Pen, description: "Textos que vendem e conectam", num: "08" },
];

const ServiceCard = ({ service }: { service: typeof row1[0] }) => {
  const Icon = service.icon;
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] p-6 sm:p-8 rounded-2xl border border-[#1a1a2e] bg-[#0a0a14] hover:border-[#6366F1]/40 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <span className="absolute top-4 right-4 text-[#6366F1]/30 text-xs font-mono tracking-[0.2em]">{service.num}</span>
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-full bg-[#6366F1]/10 flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-shadow duration-500">
          <Icon className="w-5 h-5" style={{ stroke: "url(#serviceGradientLux)" }} />
        </div>
        <h3 className="text-sm sm:text-base font-light tracking-[0.2em] text-[#EDEDED] mb-2">
          {service.title}
        </h3>
        <div className="w-8 h-[1px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-3 group-hover:w-12 transition-all duration-500" />
        <p className="text-xs sm:text-sm text-[#808080] leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
};

const doubled1 = [...row1, ...row1, ...row1, ...row1];
const doubled2 = [...row2, ...row2, ...row2, ...row2];

const InteractiveServices = () => {
  const drag1 = useDragScroll();
  const drag2 = useDragScroll();

  return (
    <section className="relative py-8 sm:py-10 md:py-14 bg-[#050508] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.03)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 animate-fade-in">
        <div className="flex justify-center">
          <SectionLabel text="NOSSOS_SERVIÇOS" />
        </div>
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-light text-[#EDEDED] mt-4 max-w-2xl mx-auto leading-tight">
          Soluções completas para{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent font-medium">
            escalar sua marca
          </span>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        <div className="mb-4 sm:mb-6">
          <div
            ref={drag1.containerRef}
            {...drag1.handlers}
            className="overflow-x-auto overflow-y-visible scrollbar-hide select-none [touch-action:pan-x_pan-y]"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-4 sm:gap-6 w-max animate-scroll-left will-change-transform transform-gpu" style={{ animationDuration: "40s" }}>
              {doubled1.map((s, i) => (
                <ServiceCard key={`r1-${i}`} service={s} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div
            ref={drag2.containerRef}
            {...drag2.handlers}
            className="overflow-x-auto overflow-y-visible scrollbar-hide select-none [touch-action:pan-x_pan-y]"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-4 sm:gap-6 w-max animate-scroll-right will-change-transform transform-gpu" style={{ animationDuration: "45s" }}>
              {doubled2.map((s, i) => (
                <ServiceCard key={`r2-${i}`} service={s} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="serviceGradientLux" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default InteractiveServices;
