import { motion } from "framer-motion";

const item = "Synlua Mkt";
const count = 14;
const items = Array.from({ length: count }, () => item);

const SynluaDivider = () => {
  return (
    <section className="relative bg-[#050508] py-5 sm:py-6 overflow-hidden border-y border-[#12121f]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.04)_0%,transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative flex overflow-hidden"
      >
        <div className="flex w-max animate-scroll-left-fast will-change-transform transform-gpu">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8" aria-hidden={set === 1}>
              {items.map((text, i) => (
                <span
                  key={`${text}-${i}-${set}`}
                  className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#EDEDED]/40 whitespace-nowrap"
                >
                  {text}
                  <span className="ml-6 sm:ml-8 text-[#8B5CF6]/60">|</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SynluaDivider;
