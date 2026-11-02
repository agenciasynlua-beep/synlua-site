/** Todos os botões "Fale Conosco" levam ao formulário rápido em forms.synlua.com.br. */
export const FORMS_URL = "https://forms.synlua.com.br";

/** Mantém UTMs e ids de campanha ao ir para o formulário, para não perder a origem do lead. */
export const formsHref = () => {
  if (typeof window === "undefined") return FORMS_URL;
  const src = new URLSearchParams(window.location.search);
  const out = new URLSearchParams();
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach((k) => {
    const v = src.get(k);
    if (v) out.set(k, v);
  });
  const qs = out.toString();
  return qs ? `${FORMS_URL}/?${qs}` : FORMS_URL;
};

export const openQuiz = () => {
  if (typeof window !== "undefined") window.location.assign(formsHref());
};
