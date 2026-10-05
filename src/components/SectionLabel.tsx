import { motion } from "framer-motion";

interface SectionLabelProps {
  text: string;
  className?: string;
}

const SectionLabel = ({ text, className = "" }: SectionLabelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`font-mono text-xs sm:text-sm text-muted-foreground/60 mb-4 ${className}`}
    >
      // {text}
    </motion.div>
  );
};

export default SectionLabel;
