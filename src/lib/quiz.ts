export const QUIZ_EVENT = "synlua:open-quiz";

/** Abre o quiz de diagnóstico (modal) de qualquer ponto da página, sem rolar. */
export const openQuiz = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(QUIZ_EVENT));
};
