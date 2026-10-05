import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !sessionStorage.getItem("exitPopupShown")) {
      setShow(true);
      sessionStorage.setItem("exitPopupShown", "true");
    }
  }, []);

  useEffect(() => {
    // Desktop only
    if (window.matchMedia("(pointer: fine)").matches) {
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [handleMouseLeave]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-br from-[#6366F1]/50 via-[#8B5CF6]/30 to-transparent"
          >
            <div className="rounded-2xl bg-[#0a0a0a] px-6 sm:px-10 py-10 sm:py-12 text-center relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[radial-gradient(ellipse,hsl(258,90%,66%,0.12)_0%,transparent_70%)]" />

              {/* Close */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 text-[#666] hover:text-[#EDEDED] transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <p className="text-xs tracking-[0.3em] uppercase text-[#6366F1] mb-4 font-light">
                  Antes de sair...
                </p>

                <h3 className="text-xl sm:text-2xl font-light text-[#EDEDED] leading-tight mb-3">
                  Agende uma{" "}
                  <span className="text-[#666]">call estratégica</span>
                </h3>

                <p className="text-sm text-[#666] leading-relaxed mb-8 max-w-sm mx-auto">
                  15 minutos para analisar sua operação e identificar oportunidades de crescimento — sem compromisso.
                </p>

                <Link
                  to="/#diagnostico"
                  onClick={() => setShow(false)}
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-medium text-sm tracking-wide uppercase rounded-lg transition-all duration-300 hover:from-[#5558E6] hover:to-[#7C4FD1] hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] active:scale-[0.97] group"
                >
                  Agendar Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="mt-5 text-xs text-[#444]">
                  Sem spam. Sem compromisso.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
