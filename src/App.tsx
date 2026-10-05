import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import synluaLogoWhite from "@/assets/synlua-logo-white.webp";
import LandingPage from "./pages/LandingPage";


const CustomCursor = lazy(() => import("./components/CustomCursor"));

const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));


const NotFound = lazy(() => import("./pages/NotFound"));




const PageLoader = () => (
  <div className="min-h-screen bg-[#050508] flex items-center justify-center">
    <img src={synluaLogoWhite} alt="Synlua" width={560} height={116} className="w-40 h-auto animate-pulse" />
  </div>
);

const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));

const DeferredCursor = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const idle = (window as any).requestIdleCallback;
    const id = idle ? idle(() => setReady(true), { timeout: 3000 }) : window.setTimeout(() => setReady(true), 1200);
    return () => {
      const cancel = (window as any).cancelIdleCallback;
      if (idle && cancel) cancel(id);
      else window.clearTimeout(id as number);
    };
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <CustomCursor />
    </Suspense>
  );
};

// Toaster só é montado após ociosidade: não bloqueia o primeiro render
const DeferredToaster = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const idle = (window as any).requestIdleCallback;
    const id = idle ? idle(() => setReady(true), { timeout: 4000 }) : window.setTimeout(() => setReady(true), 2500);
    return () => {
      const cancel = (window as any).cancelIdleCallback;
      if (idle && cancel) cancel(id);
      else window.clearTimeout(id as number);
    };
  }, []);
  return ready ? <Sonner /> : null;
};

const App = () => {
  // Landing é eager: no 1º commit o hero já existe. Dois rAF = depois do 1º desenho.
  useEffect(() => {
    const w = window as Window & { __splashReady?: () => void };
    requestAnimationFrame(() => requestAnimationFrame(() => w.__splashReady?.()));
  }, []);
  return (
  <>
      <Suspense fallback={null}>
        <DeferredToaster />
      </Suspense>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <DeferredCursor />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* PT Routes */}
            <Route path="/" element={<LandingPage />} />


            {/* Other */}
            <Route path="/onboarding" element={<OnboardingPage />} />
            








            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  </>
  );
};

export default App;
