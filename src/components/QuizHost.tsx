import { lazy, Suspense, useEffect, useState } from "react";
import { QUIZ_EVENT } from "@/lib/quiz";

const loadQuiz = () => import("./QuizModal");
const QuizModal = lazy(loadQuiz);

/**
 * Monta o quiz sob demanda. O chunk (inclui Supabase) é pré-carregado na primeira
 * interação, então o modal abre quase instantâneo sem pesar no carregamento inicial.
 */
const QuizHost = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener(QUIZ_EVENT, onOpen);

    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    const prefetch = () => {
      void loadQuiz();
      events.forEach((e) => window.removeEventListener(e, prefetch));
    };
    events.forEach((e) => window.addEventListener(e, prefetch, { once: true, passive: true }));

    return () => {
      window.removeEventListener(QUIZ_EVENT, onOpen);
      events.forEach((e) => window.removeEventListener(e, prefetch));
    };
  }, []);

  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <QuizModal open={open} onClose={() => setOpen(false)} />
    </Suspense>
  );
};

export default QuizHost;
