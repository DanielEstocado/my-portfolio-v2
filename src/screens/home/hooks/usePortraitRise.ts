import { useEffect } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

const RISE_FROM = 180;

// Springs the portrait up from below the hero's bottom edge, and gives the matching mask position for its outline copy so the two rise together.
export function usePortraitRise(reduceMotion: boolean | null) {
  const y = useMotionValue(reduceMotion ? 0 : RISE_FROM);
  const maskPosition = useTransform(
    y,
    (value) => `calc(50% + var(--photo-shift)) calc(100% + ${value}px)`,
  );

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(y, 0, {
      type: "spring",
      stiffness: 150,
      damping: 17,
      delay: 0.15,
    });
    return () => controls.stop();
  }, [reduceMotion, y]);

  return { y, maskPosition };
}
