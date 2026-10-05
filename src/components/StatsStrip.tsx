import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: string;
  label: string;
  numeric: number;
  suffix?: string;
  prefix?: string;
}

const parseStat = (value: string): Pick<Stat, "numeric" | "prefix" | "suffix"> => {
  const clean = value.replace(/[^\d.]/g, "");
  const num = parseFloat(clean);
  const prefix = value.startsWith("+") ? "+" : "";
  const suffixMatch = value.replace(/[\d.]/g, "").replace(prefix, "");
  return {
    numeric: isNaN(num) ? 0 : num,
    prefix,
    suffix: suffixMatch || undefined,
  };
};

const statsData = [
  { value: "+400", label: "Clientes atendidos" },
  { value: "+250K", label: "Seguidores nas redes" },
  { value: "+7 dígitos", label: "Investidos em anúncios em 5 anos" },
];

const useCountUp = (target: number, duration = 1.8, start = false) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const animate = (ts: number) => {
      if (startTime.current === null) startTime.current = ts;
      const progress = Math.min((ts - startTime.current) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      }
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, start]);

  return count;
};

const StatItem = ({ stat, index }: { stat: Stat; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(stat.numeric, 1.8, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-1 text-center px-2 sm:px-8 relative w-full pt-6 first:pt-0 sm:pt-0"
    >
      {index > 0 && (
        <span className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-gradient-to-b from-[#6366F1] to-[#8B5CF6]" />
      )}
      <p
        className="text-[clamp(1.9rem,8vw,2.6rem)] sm:text-4xl md:text-5xl font-light text-[#EDEDED] tracking-tight whitespace-nowrap"
        aria-live="polite"
        aria-atomic="true"
      >
        {stat.prefix}
        {count}
        {stat.suffix && <span className="text-[#8B5CF6]">{stat.suffix}</span>}
      </p>
      <p className="mt-2 text-xs sm:text-sm text-[#808080] font-light leading-snug">{stat.label}</p>
    </motion.div>
  );
};

const StatsStrip = () => {
  const stats: Stat[] = statsData.map((s) => ({ ...s, ...parseStat(s.value) }));

  return (
    <section className="relative bg-[#050508] py-12 sm:py-16 border-y border-[#12121f]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 divide-y sm:divide-y-0 divide-[#12121f]">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
