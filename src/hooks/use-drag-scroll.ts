import { useRef, useCallback, useEffect } from "react";

const setAnimationPlayState = (el: HTMLElement, state: "paused" | "running") => {
  el.style.animationPlayState = state;
  const animatedChild = el.firstElementChild as HTMLElement | null;
  if (animatedChild) animatedChild.style.animationPlayState = state;
};

export function useDragScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const pointerId = useRef<number | null>(null);
  const pointerType = useRef<string>("");
  const captured = useRef(false);

  const wrapScroll = (el: HTMLElement, next: number) => {
    const setWidth = el.scrollWidth / 2;
    if (!setWidth || !isFinite(setWidth)) return next;
    return ((next % setWidth) + setWidth) % setWidth;
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    // Skip touch — let native vertical scroll + touch-pan-x handle it.
    if (e.pointerType === "touch") return;
    isDragging.current = true;
    captured.current = false;
    pointerId.current = e.pointerId;
    pointerType.current = e.pointerType;
    startX.current = e.clientX;
    startY.current = e.clientY;
    scrollLeft.current = el.scrollLeft;
    setAnimationPlayState(el, "paused");
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const el = containerRef.current;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (!captured.current) {
      // Only claim the pointer once horizontal intent is clear.
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) {
        // Vertical intent — release.
        isDragging.current = false;
        setAnimationPlayState(el, "running");
        return;
      }
      if (Math.abs(dx) < 6) return;
      captured.current = true;
      try { el.setPointerCapture(e.pointerId); } catch {}
      el.style.cursor = "grabbing";
    }

    el.scrollLeft = wrapScroll(el, scrollLeft.current - dx);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const wasDragging = isDragging.current;
    isDragging.current = false;
    if (captured.current) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
      captured.current = false;
    }
    el.style.cursor = "grab";
    el.scrollLeft = wrapScroll(el, el.scrollLeft);
    if (wasDragging) {
      setTimeout(() => {
        if (el) setAnimationPlayState(el, "running");
      }, 800);
    }
  }, []);

  // Touch: never hijack the gesture. Just pause the marquee so the user can
  // read / swipe freely, then resume shortly after the finger leaves.
  const resumeTimer = useRef<number | null>(null);

  const onTouchStart = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    setAnimationPlayState(el, "paused");
  }, []);

  const onTouchEnd = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      if (containerRef.current) setAnimationPlayState(containerRef.current, "running");
    }, 2500);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.style.cursor = "grab";
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  return {
    containerRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onPointerCancel: onPointerUp,
      onTouchStart,
      onTouchEnd,
      onTouchCancel: onTouchEnd,
    },
  };
}
