import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import synluaLogoDark from "@/assets/synlua-logo.webp";
export interface HeroSegment {
  text: string;
  gradient?: boolean;
  br?: boolean;
}

const DEFAULT_SEGMENTS: HeroSegment[] = [
  { text: "Um time de " },
  { text: "Marketing", gradient: true },
  { text: "", br: true },
  { text: "completo para o seu " },
  { text: "negócio", gradient: true },
  { text: "." },
];

interface HeroMinimalProps {
  hideButtons?: boolean;
  segments?: HeroSegment[];
  subtitle?: string;
  sideText?: string;
}

const HeroMinimal = ({ hideButtons = false, segments, subtitle, sideText }: HeroMinimalProps) => {
  const HERO_SEGMENTS = segments ?? DEFAULT_SEGMENTS;
  const TOTAL_CHARS = HERO_SEGMENTS.reduce((n, s) => n + s.text.length, 0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setTyped(TOTAL_CHARS);
      return;
    }
    let i = 0;
    setTyped(0);
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= TOTAL_CHARS) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [TOTAL_CHARS]);


  const renderTyped = () => {
    let remaining = typed;
    return HERO_SEGMENTS.map((seg, idx) => {
      if (seg.br) return <br key={idx} />;
      const shown = seg.text.slice(0, Math.max(0, remaining));
      remaining -= seg.text.length;
      if (!shown) return null;
      if (seg.gradient) {
        return (
          <span
            key={idx}
            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent font-light"
          >
            {shown}
          </span>
        );
      }
      return <span key={idx}>{shown}</span>;
    });
  };

  const isTyping = typed < TOTAL_CHARS;

  return (
    <section data-light className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04)_0%,transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#050505 1px, transparent 1px), linear-gradient(90deg, #050505 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        <svg className="absolute top-24 right-24 w-48 h-48 opacity-[0.06]" viewBox="0 0 192 192" fill="none">
          <path d="M0 96 H72 V24 H168" stroke="#6366F1" strokeWidth="1" />
          <circle cx="168" cy="24" r="4" fill="#6366F1" opacity="0.5" />
          <circle cx="72" cy="96" r="3" fill="#8B5CF6" opacity="0.3" />
        </svg>
        <svg className="absolute bottom-32 left-24 w-40 h-40 opacity-[0.06]" viewBox="0 0 160 160" fill="none">
          <path d="M0 80 H48 V120 H160" stroke="#6366F1" strokeWidth="1" />
          <circle cx="160" cy="120" r="4" fill="#6366F1" opacity="0.5" />
        </svg>
        <svg className="absolute top-1/2 right-16 w-24 h-64 opacity-[0.04]" viewBox="0 0 96 256" fill="none">
          <path d="M48 0 V80 H96 V180 H0" stroke="#8B5CF6" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <img src={synluaLogoDark} alt="" className="w-64 sm:w-72 md:w-96 lg:w-[500px] opacity-[0.04] pointer-events-none select-none" />
      </div>

      <div className="absolute top-16 sm:top-24 left-4 sm:left-6 md:left-12 text-left hidden sm:flex gap-3 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
        <div className="w-[1px] h-full bg-gradient-to-b from-[#6366F1]/40 to-transparent" />
        <div>
          <p className="text-[#333] text-[10px] sm:text-xs font-mono tracking-[0.3em] mb-1 sm:mb-2">BRASIL</p>
          <p className="text-[#666] text-[10px] sm:text-xs font-light tracking-wider">SYNLUA MARKETING</p>
          <p className="text-[#6366F1]/60 text-[9px] sm:text-xs font-mono tracking-wide mt-2 sm:mt-4">(2026)</p>
          <p className="text-[#666] text-[10px] sm:text-xs font-light tracking-wide mt-1 max-w-[150px] sm:max-w-[200px]">
            ONDE ESTRATÉGIA<br />ENCONTRA RESULTADOS
          </p>
        </div>
      </div>

      <div className="absolute top-24 right-6 sm:right-12 text-right max-w-[280px] hidden lg:block animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
        <p className="text-[#666] text-sm font-light leading-relaxed">
          {sideText ?? "Conte com a Synlua para auxiliar no crescimento da sua empresa, faturando mais, aparecendo mais e tendo toda visibilidade que ela merece."}
        </p>
      </div>


      <div className="container mx-auto px-6 sm:px-6 md:px-8 relative z-20 flex items-center justify-center">
        <div className="w-full text-center space-y-5 sm:space-y-4 md:space-y-6 flex flex-col items-center animate-slide-up" style={{ animationDuration: "0.8s", animationFillMode: "both" }}>
          <div className="sm:hidden animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <span className="text-[#6366F1]/60 text-[10px] font-mono tracking-[0.3em]">BRASIL • 2026</span>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <span className="inline-block text-[#6366F1] uppercase tracking-[0.3em] text-[10px] sm:text-[10px] md:text-xs font-mono border border-[#6366F1]/20 px-5 py-2 rounded-full bg-[#6366F1]/5">
              RESULTADO | EXCELÊNCIA | INOVAÇÃO
            </span>
          </div>

          <div className="space-y-2 sm:space-y-2 md:space-y-3 px-2 sm:px-2 max-w-5xl mx-auto">
            <h1 className="text-[34px] xs:text-[40px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-extralight tracking-tight leading-[1.1] sm:leading-[1.1] text-[#050505] min-h-[2.3em]">
              {renderTyped()}
              {isTyping && (
                <span className="inline-block w-[2px] h-[0.9em] align-middle ml-1 bg-[#6366F1] animate-pulse" />
              )}
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#666] font-light max-w-xl mx-auto px-4 sm:px-4">
            {subtitle ?? "Estratégia, execução e resultado para empresas que querem crescer com consistência."}
          </p>


          <div className="w-24 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #6366F1, #8B5CF6, transparent)" }} />

          {!hideButtons && (
          <div className="pt-4 sm:pt-4 flex items-center justify-center w-full px-2 sm:px-0">
            <a
              href="#diagnostico"
              onClick={(e) => { e.preventDefault(); document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#6366F1] rounded-sm bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-light text-sm tracking-wide uppercase transition-all duration-300 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] overflow-hidden active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Fale Conosco
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </a>

          </div>
          )}

          <p className="text-[10px] text-[#999] font-light tracking-widest uppercase mt-2 sm:hidden">
            Onde estratégia encontra resultados
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent" />
    </section>
  );
};

export default HeroMinimal;
