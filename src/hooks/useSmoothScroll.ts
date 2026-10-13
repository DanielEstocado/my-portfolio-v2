import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Eases mouse wheel and trackpad scrolling and glides to anchor links, unless the person asked for less motion.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ anchors: true });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
