import { useRef, useCallback, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Intensidade do brilho que segue o cursor (0-1) */
  intensity?: number;
}

/**
 * Card com micro-interações premium:
 * - Spotlight (lanterna) roxa seguindo o cursor
 * - Borda que acende no hover
 * - Leve elevação + glow
 * Atualiza CSS vars via rAF, sem re-render do React.
 */
const SpotlightCard = ({ children, className, intensity = 0.16 }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
  }, []);

  const handleEnter = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "1");
  }, []);

  const handleLeave = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ ["--spot-alpha" as string]: intensity }}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14]",
        "transition-[transform,border-color,box-shadow] duration-500 ease-out will-change-transform",
        "md:hover:scale-[1.02] md:hover:border-[#8B5CF6]/50 md:hover:shadow-[0_0_60px_-12px_rgba(139,92,246,0.45)]",
        "motion-reduce:transition-none motion-reduce:md:hover:scale-100",
        className
      )}
    >
      {/* Lanterna */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block opacity-[var(--spot-opacity,0)] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,var(--spot-alpha)), transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
