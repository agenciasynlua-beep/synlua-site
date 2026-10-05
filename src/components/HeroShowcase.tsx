import { useEffect, useRef, useState } from "react";

import cap13 from "@/assets/hero/cap-13.webp";
import cap14 from "@/assets/hero/cap-14.webp";
import cap15 from "@/assets/hero/cap-15.webp";
import micHands from "@/assets/hero/mic-hands.webp";
import kombiDuo from "@/assets/hero/kombi-duo.webp";
import champagne from "@/assets/hero/champagne.webp";
import p9 from "@/assets/hero/p9.webp";
import p11 from "@/assets/hero/p11.webp";
import p12 from "@/assets/hero/p12.webp";
import wiseUp from "@/assets/hero/wise-up.webp";
import maximeNew from "@/assets/hero/maxime.webp";
import inatto from "@/assets/hero/inatto.webp";


// Imagens da 1ª dobra ficam em /public/hero e são pré-carregadas no index.html
const pub = (name: string) => `${import.meta.env.BASE_URL}hero/${name}.webp`;

type Item = { src: string; video?: string };

const columns: Item[][] = [
  [{ src: pub("cap-8") }, { src: pub("p5") }, { src: micHands }, { src: wiseUp }, { src: cap13 }],
  [{ src: pub("p3") }, { src: pub("cap-10") }, { src: maximeNew }, { src: cap14 }, { src: p11 }],
  [{ src: pub("speaker") }, { src: pub("cap-11") }, { src: inatto }, { src: champagne }, { src: p9 }],
  [{ src: pub("cap-12") }, { src: pub("augusto") }, { src: kombiDuo }, { src: p12 }, { src: cap15 }],
];

const columnStyles = [
  { duration: "48s", direction: "up", opacity: "opacity-50", scale: "scale-[0.92]" },
  { duration: "62s", direction: "down", opacity: "opacity-75", scale: "" },
  { duration: "54s", direction: "up", opacity: "opacity-90", scale: "" },
  { duration: "68s", direction: "down", opacity: "opacity-60", scale: "scale-[0.94]" },
];

const Card = ({ item, playVideo, priority }: { item: Item; playVideo: boolean; priority: boolean }) => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14] shadow-[0_18px_60px_-24px_rgba(139,92,246,0.55)]">
    {item.video && playVideo ? (
      <video
        src={item.video}
        poster={item.src}
        muted
        loop
        autoPlay
        playsInline
        preload="none"
        width={480}
        height={300}
        className="w-full h-[300px] object-cover"
      />
    ) : (
      <img
        src={item.src}
        alt=""
        aria-hidden
        width={480}
        height={300}
        loading={priority ? "eager" : "lazy"}
        // @ts-expect-error fetchpriority é atributo válido do HTML
        fetchpriority={priority ? "high" : "low"}
        decoding="async"
        className="w-full h-[300px] object-cover"
      />
    )}
    {/* Reflexo sutil */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40"
    />
  </div>
);

const HeroShowcase = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isSmall || reduced) return;
    const t = window.setTimeout(() => setPlayVideo(true), 1600);
    return () => window.clearTimeout(t);
  }, []);

  // Pausa toda a vitrine quando o hero sai da tela: evita compositing constante
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden [contain:paint]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 14%, #000 82%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 82%, transparent 100%)",
      }}
    >
      <div className="absolute inset-y-[-14%] inset-x-0 flex justify-center gap-3 sm:gap-4 md:gap-5 px-3 sm:px-4 md:px-8">

        {columns.map((items, ci) => {
          const cfg = columnStyles[ci];
          const loop = [...items, ...items];
          // Colunas "down" começam deslocadas em -50%: o que aparece primeiro é a 2ª cópia da lista
          const firstVisible = cfg.direction === "down" ? items.length : 0;
          return (
            <div
              key={ci}
              className={`relative w-1/2 md:w-1/4 shrink-0 ${cfg.opacity} ${cfg.scale} ${
                ci > 1 ? "hidden md:block" : ""
              }`}
            >
              <div
                className="flex flex-col gap-4 sm:gap-5 transform-gpu motion-reduce:!animate-none"
                style={{
                  animation: `${cfg.direction === "up" ? "hero-marquee-up" : "hero-marquee-down"} ${cfg.duration} linear infinite`,
                  animationPlayState: visible ? "running" : "paused",
                  willChange: visible ? "transform" : "auto",
                }}
              >

                {loop.map((item, i) => (
                  <Card
                    key={`${ci}-${i}`}
                    item={item}
                    playVideo={playVideo}
                    priority={ci < 2 && i >= firstVisible && i < firstVisible + 2}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroShowcase;
