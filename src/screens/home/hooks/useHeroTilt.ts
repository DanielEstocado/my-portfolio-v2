import { type PointerEvent } from "react";
import { type MotionValue, useMotionValue, useSpring } from "framer-motion";

export type HeroTilt = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

const SPRING = { stiffness: 140, damping: 18, mass: 0.6 };

// Follows the mouse over the hero as a smoothed position from -0.5 to 0.5 on both axes, so pieces can lean toward it.
export function useHeroTilt() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  // Updates the position while a mouse moves over the hero, touch is ignored.
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  // Lets the pieces settle back flat when the mouse leaves.
  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return { tilt: { x, y } satisfies HeroTilt, handlePointerMove, handlePointerLeave };
}
