import { useEffect, useRef, useCallback } from "react";

const ScrollProgress = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  const update = useCallback(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0;

    if (textRef.current) textRef.current.textContent = `${Math.round(p)}%`;
    if (barRef.current) barRef.current.style.height = `${p}%`;
    if (dotRef.current) dotRef.current.style.top = `${p}%`;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [update]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      <div ref={textRef} className="font-mono text-[11px] tracking-wider text-[#808080]">0%</div>
      <div className="relative w-[1px] h-64 bg-[#1a1a1a]">
        <div
          ref={barRef}
          className="absolute top-0 left-0 w-full"
          style={{ height: "0%", background: "linear-gradient(180deg, #6366F1, #8B5CF6)" }}
        />
        <div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{
            top: "0%",
            background: "#8B5CF6",
            boxShadow: "0 0 12px rgba(139, 92, 246, 0.6), 0 0 4px rgba(99, 102, 241, 0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
