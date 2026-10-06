import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, MotionValue } from "framer-motion";

const PHRASE_ONE = ["Nosso foco é te trazer", "dinheiro e reconhecimento."];
const PHRASE_TWO = ["Vamos nos tornar o time de", "Marketing 360 da sua empresa."];

const HIGHLIGHTS = ["dinheiro", "reconhecimento.", "Marketing", "360"];

const TOTAL_WORDS = [...PHRASE_ONE, ...PHRASE_TWO].reduce((n, line) => n + line.split(" ").length, 0);

// A revelação ocupa do início até REVEAL_END do trajeto; o resto é "respiro" com o texto pronto.
const REVEAL_START = 0.04;
const REVEAL_END = 0.82;

const phraseClass =
  "mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-4 sm:px-6 text-center font-light tracking-[-0.02em] sm:tracking-[-0.03em] leading-[1.22] sm:leading-[1.15] text-[clamp(1.55rem,6.4vw,2.25rem)] sm:text-[clamp(2.1rem,5.2vw,3rem)] lg:text-[clamp(2.6rem,4.4vw,3.75rem)]";

const Word = ({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);
  const y = useTransform(progress, range, [14, 0]);

  return (
    <motion.span style={{ opacity, filter: blur, y }} className="inline-block will-change-transform">
      {HIGHLIGHTS.includes(word) ? (
        <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(139,92,246,0.45)]">
          {word}
        </span>
      ) : (
        <span className="text-white">{word}</span>
      )}
    </motion.span>
  );
};

const Phrase = ({ lines, startIndex, progress }: { lines: string[]; startIndex: number; progress: MotionValue<number> }) => {
  let index = startIndex;
  return (
    <p className={phraseClass}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block mb-1 sm:mb-1.5">
          {line.split(" ").map((word, i) => {
            const g = index++;
            const span = REVEAL_END - REVEAL_START;
            const range: [number, number] = [
              REVEAL_START + (g / TOTAL_WORDS) * span,
              REVEAL_START + ((g + 1) / TOTAL_WORDS) * span,
            ];
            return (
              <Fragment key={`${word}-${i}`}>
                {i > 0 && " "}
                <Word word={word} range={range} progress={progress} />
              </Fragment>
            );
          })}
        </span>
      ))}
    </p>
  );
};

const ScrollRevealText = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const auraOpacity = useTransform(smooth, [0, 0.4, 0.8, 1], [0.15, 0.5, 0.55, 0.3]);
  const auraScale = useTransform(smooth, [0, 1], [0.85, 1.25]);

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

  const firstCount = PHRASE_ONE.reduce((n, l) => n + l.split(" ").length, 0);

  return (
    // 160vh = 100vh da cena fixa + 60vh de rolagem para a revelação (antes eram 200–260vh)
    <section ref={ref} className="relative bg-[#050508] h-[160vh]">
      <div className="sticky top-0 h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ opacity: auraOpacity, scale: auraScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] sm:w-[80vw] sm:h-[80vw] max-w-[900px] max-h-[900px] rounded-full blur-[90px] sm:blur-[120px] bg-[radial-gradient(circle,rgba(139,92,246,0.35)_0%,rgba(99,102,241,0.15)_45%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] sm:[background-size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
        />

        <div className="relative w-full space-y-10 sm:space-y-14">
          <Phrase lines={PHRASE_ONE} startIndex={0} progress={smooth} />
          <Phrase lines={PHRASE_TWO} startIndex={firstCount} progress={smooth} />
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealText;
