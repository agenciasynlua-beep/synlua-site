import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PHRASE_ONE = ["Nosso foco é te trazer", "dinheiro e reconhecimento."];
const PHRASE_TWO = ["Vamos nos tornar o time de", "Marketing 360 da sua empresa."];

const HIGHLIGHTS = ["dinheiro", "reconhecimento.", "Marketing", "360"];

const phraseClass =
  "mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-4 sm:px-6 text-center font-light tracking-[-0.02em] sm:tracking-[-0.03em] leading-[1.22] sm:leading-[1.15] text-[clamp(1.55rem,6.4vw,2.25rem)] sm:text-[clamp(2.1rem,5.2vw,3rem)] lg:text-[clamp(2.6rem,4.4vw,3.75rem)]";

// As palavras se revelam em sequência quando a frase entra na tela:
// sem rolagem presa, ocupa só a altura do texto.
const Phrase = ({ lines, baseDelay = 0 }: { lines: string[]; baseDelay?: number }) => {
  let index = 0;
  return (
    <p className={phraseClass}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block mb-1 sm:mb-1.5">
          {line.split(" ").map((word, i) => {
            const delay = baseDelay + index++ * 0.07;
            return (
              <Fragment key={`${word}-${i}`}>
              {i > 0 && " "}
              <motion.span
                initial={{ opacity: 0.12, y: 14, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {HIGHLIGHTS.includes(word) ? (
                  <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(139,92,246,0.45)]">
                    {word}
                  </span>
                ) : (
                  <span className="text-white">{word}</span>
                )}
              </motion.span>
              </Fragment>
            );
          })}
        </span>
      ))}
    </p>
  );
};

const ScrollRevealText = () => {
  const reduced = useReducedMotion();

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
    <section className="relative overflow-hidden bg-[#050508] py-24 sm:py-32 md:py-40">
      {/* Aura premium */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] sm:w-[80vw] sm:h-[80vw] max-w-[900px] max-h-[900px] rounded-full blur-[90px] sm:blur-[120px] opacity-40 bg-[radial-gradient(circle,rgba(139,92,246,0.35)_0%,rgba(99,102,241,0.15)_45%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] sm:[background-size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
      />

      <div className="relative space-y-12 sm:space-y-16 md:space-y-20">
        <Phrase lines={PHRASE_ONE} />
        <Phrase lines={PHRASE_TWO} baseDelay={0.1} />
      </div>
    </section>
  );
};

export default ScrollRevealText;
