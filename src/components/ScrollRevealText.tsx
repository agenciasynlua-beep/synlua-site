import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue, useReducedMotion } from "framer-motion";

const PHRASE_ONE = ["Nosso foco é te trazer", "dinheiro e reconhecimento."];
const PHRASE_TWO = ["Vamos nos tornar o time de", "Marketing 360 da sua empresa."];

const HIGHLIGHTS = ["dinheiro", "reconhecimento.", "Marketing", "360"];

const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);
  const y = useTransform(progress, range, [14, 0]);
  const highlight = HIGHLIGHTS.includes(word);

  return (
    <motion.span style={{ opacity, filter: blur, y }} className="inline-block mr-[0.22em] sm:mr-[0.25em] will-change-transform">
      {highlight ? (
        <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(139,92,246,0.45)]">
          {word}
        </span>
      ) : (
        <span className="text-white">{word}</span>
      )}
    </motion.span>
  );
};

const Phrase = ({
  lines,
  progress,
  opacity,
  scale,
}: {
  lines: string[];
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}) => {
  const allWords = useMemo(() => lines.flatMap((line) => line.split(" ")), [lines]);
  const totalWords = allWords.length;

  let wordIndex = 0;
  return (
    <motion.p
      style={{ opacity, scale }}
      aria-label={lines.join(" ")}
      className="absolute inset-0 flex flex-col items-center justify-center mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-4 sm:px-6 text-center font-light tracking-[-0.02em] sm:tracking-[-0.03em] leading-[1.22] sm:leading-[1.15] text-[clamp(1.55rem,6.4vw,2.25rem)] sm:text-[clamp(2.1rem,5.2vw,3rem)] lg:text-[clamp(2.6rem,4.4vw,3.75rem)]"
    >

      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        const lineStart = wordIndex;
        wordIndex += words.length;
        return (
          <span key={lineIndex} aria-hidden className="block mb-1 sm:mb-1.5">
            {words.map((w, i) => {
              const globalIndex = lineStart + i;
              return (
                <Word
                  key={`${w}-${i}`}
                  word={w}
                  progress={progress}
                  range={[globalIndex / totalWords, (globalIndex + 1) / totalWords]}
                />
              );
            })}
          </span>
        );
      })}
    </motion.p>
  );
};

const ScrollRevealText = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const progressOne = useTransform(smooth, [0, 0.32], [0, 1]);
  const opacityOne = useTransform(smooth, [0, 0.02, 0.36, 0.46], [0, 1, 1, 0]);
  const scaleOne = useTransform(smooth, [0, 0.46], [0.97, 1.02]);

  const progressTwo = useTransform(smooth, [0.48, 0.86], [0, 1]);
  const opacityTwo = useTransform(smooth, [0.44, 0.52, 1], [0, 1, 1]);
  const scaleTwo = useTransform(smooth, [0.44, 1], [0.97, 1.02]);

  // Aura de luz que acompanha o progresso
  const auraOpacity = useTransform(smooth, [0, 0.25, 0.5, 0.75, 1], [0.15, 0.5, 0.2, 0.55, 0.25]);
  const auraScale = useTransform(smooth, [0, 1], [0.85, 1.25]);

  // Indicador de scroll progressivo
  const indicatorProgress = useTransform(smooth, [0, 0.22], [0, 1]);
  const indicatorOpacity = useTransform(smooth, [0, 0.12, 0.24], [1, 1, 0]);

  if (reduced) {
    return (
      <section className="relative bg-[#050508] py-20 sm:py-24">
        <div className="container mx-auto px-5 text-center max-w-4xl space-y-8">
          <p className="text-[clamp(1.75rem,7.4vw,2.4rem)] sm:text-4xl md:text-5xl font-light text-white leading-tight">{PHRASE_ONE.join(" ")}</p>
          <p className="text-[clamp(1.75rem,7.4vw,2.4rem)] sm:text-4xl md:text-5xl font-light text-white leading-tight">{PHRASE_TWO.join(" ")}</p>
        </div>
      </section>

    );
  }

  return (
    <section ref={ref} className="relative bg-[#050508] h-[200vh] sm:h-[230vh] md:h-[260vh]">
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Aura premium */}
        <motion.div
          aria-hidden
          style={{ opacity: auraOpacity, scale: auraScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] sm:w-[80vw] sm:h-[80vw] max-w-[900px] max-h-[900px] rounded-full blur-[90px] sm:blur-[120px] bg-[radial-gradient(circle,rgba(139,92,246,0.35)_0%,rgba(99,102,241,0.15)_45%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] sm:[background-size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
        />

        {/* Indicador de scroll premium — progresso visível inline, sobre o texto */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute top-[30%] sm:top-[32%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/60">
            Continue descendo
          </span>
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgba(139,92,246,0.15)"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ pathLength: indicatorProgress }}
                className="drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]"
              />
            </svg>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_14px_rgba(139,92,246,0.9)]"
            />
          </div>
        </motion.div>

        <div className="w-full px-4 sm:px-6 md:px-8 relative h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <Phrase lines={PHRASE_ONE} progress={progressOne} opacity={opacityOne} scale={scaleOne} />
            <Phrase lines={PHRASE_TWO} progress={progressTwo} opacity={opacityTwo} scale={scaleTwo} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default ScrollRevealText;
