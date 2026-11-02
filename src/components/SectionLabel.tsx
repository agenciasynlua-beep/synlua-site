import { motion } from "framer-motion";

interface SectionLabelProps {
  text: string;
  className?: string;
}

/** Rótulo de seção do design system: [ASSIM], Delight, lilás. */
const SectionLabel = ({ text, className = "" }: SectionLabelProps) => {
  const label = text.replace(/_/g, " ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`sl-label text-xs sm:text-sm mb-5 flex items-center justify-center gap-3 ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-[#c7b2f7]/60" />
      [{label}]
      <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-[#c7b2f7]/60" />
    </motion.div>
  );
};

export default SectionLabel;
