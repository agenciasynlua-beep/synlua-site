import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Instagram } from "lucide-react";

const metrics = [
  { value: 400, suffix: "+", label: "Clientes Atendidos", icon: Users },
  { value: 250, suffix: "K+", label: "Seguidores nas redes", icon: Instagram },
  {
    value: null,
    staticText: "+7 dígitos",
    label: "Investidos em anúncios ao longo de 5 anos",
    icon: Award,
  },
];

const Counter = ({ target, prefix = "", suffix = "", duration = 2000 }: { target: number; prefix?: string; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent tabular-nums whitespace-nowrap leading-none">
      {prefix}{count}{suffix}
    </span>
  );
};

const StaticValue = ({ text }: { text: string }) => (
  <span className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent whitespace-nowrap leading-none">
    {text}
  </span>
);

const SocialProofBar = () => {
  return (
    <section className="relative py-8 sm:py-10 md:py-12 bg-[#050508] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10 max-w-3xl mx-auto"
        >
          <p className="text-[10px] tracking-[0.3em] text-[#6366F1]/60 uppercase mb-4 font-mono">
            Resultados
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#EDEDED] leading-tight">

            Números que{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent font-medium">
              traduzem resultado
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#a0a0a0] font-light leading-relaxed">
            Aplicamos em nossa própria marca as mesmas estratégias que entregamos aos nossos clientes.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center gap-3 p-3 sm:p-6 md:p-8 rounded-xl border border-[#1a1a2e] bg-[#0a0a14] hover:border-[#6366F1]/30 transition-all duration-500 group min-w-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#6366F1]" />
                  </div>
                  {metric.staticText ? (
                    <StaticValue text={metric.staticText} />
                  ) : (
                    <Counter target={metric.value as number} suffix={metric.suffix} />
                  )}
                  <span className="text-[10px] sm:text-xs text-[#808080] tracking-wide uppercase font-light">
                    {metric.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;
