import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type GlowVariant = "light" | "gradient" | "outline";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: GlowVariant;
  /** Ocupa toda a largura disponível */
  block?: boolean;
}

const variants: Record<GlowVariant, string> = {
  light: "bg-[#F2F0EC] text-[#0a0a14] hover:bg-white",
  gradient: "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white",
  outline: "border border-[#2a2a45] bg-[#0a0a14] text-[#EDEDED] hover:border-[#8B5CF6]/60",
};

/**
 * Botão de CTA ultrapremium:
 * - Sheen/shimmer diagonal deslizando no hover
 * - Glow neon atrás do botão, intensificado no hover
 * - active:scale-95 no clique
 * - Ícones internos com .group-hover:translate-x-1 (use group-hover no ícone)
 */
const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, className, variant = "light", block, ...props }, ref) => {
    return (
      <span className={cn("group/glow relative inline-flex isolate", block && "w-full")}>
        {/* Glow neon de fundo */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.55),transparent)] blur-xl opacity-40 transition-opacity duration-500 group-hover/glow:opacity-100"
        />
        <button
          ref={ref}
          {...props}
          className={cn(
            "relative z-10 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full",
            "px-8 py-4 text-sm font-medium tracking-wide",
            "transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out will-change-transform",
            "hover:shadow-[0_0_45px_-6px_rgba(139,92,246,0.55)] active:scale-95",
            "disabled:opacity-60 disabled:pointer-events-none",
            "motion-reduce:transition-none motion-reduce:active:scale-100",
            block && "w-full",
            variants[variant],
            className
          )}
        >
          {/* Sheen diagonal */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover/glow:translate-x-[350%] motion-reduce:hidden"
          />
          <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
        </button>
      </span>
    );
  }
);

GlowButton.displayName = "GlowButton";

export default GlowButton;
