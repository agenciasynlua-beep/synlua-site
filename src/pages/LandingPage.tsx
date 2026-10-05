import { lazy, Suspense, useEffect, useState } from "react";
import HeroCinematic from "@/components/HeroCinematic";
import SEOHead from "@/components/SEOHead";
import ScrollProgress from "@/components/ScrollProgress";
import MinimalNavigation from "@/components/MinimalNavigation";

const ScrollRevealText = lazy(() => import("@/components/ScrollRevealText"));
const SynluaDivider = lazy(() => import("@/components/SynluaDivider"));
const StatsStrip = lazy(() => import("@/components/StatsStrip"));
const ServicesBento = lazy(() => import("@/components/ServicesBento"));
const SocialPortfolio = lazy(() => import("@/components/SocialPortfolio"));
const BrandingMarquee = lazy(() => import("@/components/BrandingMarquee"));
const FoundersSection = lazy(() => import("@/components/FoundersSection"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const InlineQuiz = lazy(() => import("@/components/InlineQuiz"));

const FooterCard = lazy(() => import("@/components/FooterCard"));
const StickyCTA = lazy(() => import("@/components/StickyCTA"));

// Seções abaixo da dobra só carregam após o hero pintar e o navegador ficar ocioso
// (ou na primeira interação), para não competir por banda/CPU com o LCP.
const useAfterHero = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(go, { timeout: 1500 }) : window.setTimeout(go, 800);
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, go));
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, []);
  return ready;
};

const LandingPage = () => {
  const belowFold = useAfterHero();
  return (
    <main className="relative min-h-screen bg-[#050508] pb-20 md:pb-0">
      {/* Grain overlay global - leve, com respeito a reduced-motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] grain-overlay"
      />

      <SEOHead
        title="Synlua | Braço de Marketing Completo para Sua Empresa"
        description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua."
        keywords="marketing digital, agência de marketing, tráfego pago, audiovisual, social media, conversão"
        path="/"
      />

      <ScrollProgress />
      <MinimalNavigation />

      <section id="home" className="relative">
        <HeroCinematic />
      </section>

      {belowFold && <Suspense fallback={null}>
        <ScrollRevealText />
        <SynluaDivider />
        <StatsStrip />
        <SynluaDivider />
        <div className="cv-auto">
          <ServicesBento />
        </div>
        <SynluaDivider />
        <section className="cv-auto" style={{ scrollMarginTop: "90px" }}>
          <SocialPortfolio />
          <BrandingMarquee />
        </section>
        <SynluaDivider />
        <section className="cv-auto" style={{ scrollMarginTop: "90px" }}>
          <FoundersSection />
        </section>
        <SynluaDivider />
        <div className="cv-auto">
          <FaqSection />
        </div>
        <SynluaDivider />
        <div className="cv-auto">
          <InlineQuiz />
        </div>

        <SynluaDivider />
        <FooterCard />
        <StickyCTA />
      </Suspense>}
    </main>
  );
};

export default LandingPage;
