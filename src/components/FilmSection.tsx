import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

/** Filme institucional 16:9. O vídeo só é baixado quando a pessoa aperta play. */
const FilmSection = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => undefined));
  };

  return (
    <section id="filme" className="relative overflow-hidden bg-[#050508] py-20 sm:py-28" style={{ scrollMarginTop: "90px" }}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,90,214,0.14)_0%,transparent_65%)]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <SectionLabel text="O FILME" />
          <h2 className="text-[clamp(1.9rem,8vw,2.6rem)] text-[#EDEDED] sm:text-5xl md:text-6xl">
            Em 90 segundos, <span className="sl-grad">como a gente trabalha</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#080812] shadow-[0_0_80px_-12px_rgba(124,90,214,0.5)] sm:rounded-[30px]"
        >
          {playing ? (
            <video ref={ref} src="/film/synlua-filme.mp4" poster="/film/poster.webp" controls playsInline preload="auto" className="h-full w-full" />
          ) : (
            <button type="button" onClick={play} aria-label="Assistir ao filme da Synlua" className="group absolute inset-0 h-full w-full">
              <img src="/film/poster.webp" alt="" width={1280} height={720} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span aria-hidden className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(189,134,245,0.55)] transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                <Play className="ml-1 h-8 w-8 fill-white text-white sm:h-9 sm:w-9" />
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FilmSection;
