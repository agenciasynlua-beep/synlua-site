import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** "Câmera" de rolagem: a seção entra com leve zoom/deslocamento e sai afastando — dá sensação de viagem, sem esconder conteúdo. */
const Scene = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.955, 1, 1, 0.985]);
  const y = useTransform(scrollYProgress, [0, 0.22, 1], [46, 0, -34]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, y, transformOrigin: "50% 40%" }} className="will-change-transform">{children}</motion.div>
    </div>
  );
};

export default Scene;
