import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-[#050505]/90 backdrop-blur-md border-t border-[#1a1a1a]"
        >
          <a
            href="#diagnostico"
            onClick={(e) => { e.preventDefault(); document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            className="group/btn relative overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-medium text-sm tracking-wide uppercase rounded-lg shadow-[0_0_30px_rgba(99,102,241,0.35)] active:scale-95 transition-transform duration-150"
          >
            <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2.8s_ease-in-out_infinite]" />
            <span className="relative">Fale Conosco</span>
            <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
