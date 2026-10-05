import { useEffect, useRef, useCallback, useState } from "react";

const CustomCursor = () => {
  const [isTouch, setIsTouch] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const onLight = useRef(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const updateCursorColor = useCallback(() => {
    const dotColor = onLight.current ? "#050505" : "hsl(var(--primary))";
    const ringColor = onLight.current ? "rgba(5,5,5,0.2)" : "hsl(var(--primary) / 0.2)";

    if (dotRef.current) {
      dotRef.current.style.backgroundColor = dotColor;
    }
    if (ringRef.current) {
      ringRef.current.style.borderColor = ringColor;
    }
  }, []);

  const checkBackground = useCallback(() => {
    const x = mouse.current.x;
    const y = mouse.current.y;
    const el = document.elementFromPoint(x, y);
    if (!el) return;

    // Check if cursor is over a light section
    const section = (el as HTMLElement).closest("[data-light]");
    const wasOnLight = onLight.current;
    onLight.current = !!section;
    if (wasOnLight !== onLight.current) {
      updateCursorColor();
    }
  }, [updateCursorColor]);

  const animate = useCallback(() => {
    dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.35;
    dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.35;
    ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

    const scale = hovering.current ? 1.5 : 1;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px) scale(${scale})`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px) scale(${scale})`;
    }

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      checkBackground();
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hovering.current = !!(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") || t.closest("button"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, [animate, checkBackground, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ opacity: 0.8, top: 0, left: 0, backgroundColor: "hsl(var(--primary))" }}
      />
      <div
        ref={ringRef}
        className="fixed w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ opacity: 0.6, top: 0, left: 0, borderColor: "hsl(var(--primary) / 0.2)" }}
      />
    </>
  );
};

export default CustomCursor;
