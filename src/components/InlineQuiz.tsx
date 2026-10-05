import { lazy, Suspense, useState } from "react";
import { ArrowRight, Clock, Shield, Users } from "lucide-react";
const QuizModal = lazy(() => import("./QuizModal"));

const trustBadges = [
  { icon: Clock, text: "Leva menos de 1 minuto" },
  { icon: Shield, text: "Sem compromisso" },
  { icon: Users, text: "+400 empresas atendidas" },
];

const InlineQuiz = ({ id = "diagnostico", formType = "quiz" }: { id?: string; formType?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <section
      id={id}
      style={{ scrollMarginTop: "80px" }}
      className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden bg-[#050508]"
    >
      {/* Reflexos de luz sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[120px] bg-gradient-to-r from-transparent via-[#8B5CF6]/15 to-transparent rotate-[-8deg] blur-2xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[90px] bg-gradient-to-r from-transparent via-[#6366F1]/12 to-transparent rotate-[6deg] blur-2xl" />
      </div>

      <div className="w-full max-w-3xl mx-auto relative z-10">
        <div className="group relative">
          {/* Borda glow */}
          <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-br from-[#8B5CF6]/30 via-transparent to-[#6366F1]/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500 blur-[1px]" />

          <div className="relative bg-[#0a0a12]/80 backdrop-blur-2xl rounded-[30px] sm:rounded-[36px] border border-white/[0.06] px-6 sm:px-12 py-9 sm:py-12 text-center shadow-[0_32px_100px_-40px_rgba(99,102,241,0.25),inset_0_1px_0_rgba(255,255,255,0.03)] overflow-hidden">
            {/* Brilho topo */}
            <div aria-hidden className="pointer-events-none absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/60 to-transparent" />

            {/* Reflexo interno */}
            <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[260px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14)_0%,transparent_70%)]" />

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-[clamp(1.9rem,6.5vw,2.8rem)] sm:text-4xl md:text-5xl font-light tracking-[-0.02em] text-[#EDEDED] leading-[1.12] max-w-2xl">
                Quero levar minha empresa{" "}
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#6366F1] bg-clip-text text-transparent">
                  para o próximo nível
                </span>
              </h2>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative group/btn mt-7 inline-flex items-center justify-center gap-2.5 px-9 sm:px-12 py-4 sm:py-4.5 rounded-full text-[15px] sm:text-base font-medium tracking-wide overflow-hidden text-white shadow-[0_0_44px_-4px_rgba(139,92,246,0.6),0_0_68px_-10px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_-2px_rgba(139,92,246,0.8),0_0_90px_-8px_rgba(99,102,241,0.55)] transition-all duration-300 active:scale-95 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1]"
              >
                <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <span className="relative">Começar diagnóstico estratégico</span>
                <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>

              {/* Selos de confiança */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                {trustBadges.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-[#808080] bg-[#0c0c16]/60 border border-white/[0.04] rounded-full px-3.5 py-1.5"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span className="text-[11px] sm:text-xs font-light whitespace-nowrap">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Suspense fallback={null}>
          <QuizModal open={open} onClose={() => setOpen(false)} formType={formType} />
        </Suspense>
      )}
    </section>
  );
};

export default InlineQuiz;
