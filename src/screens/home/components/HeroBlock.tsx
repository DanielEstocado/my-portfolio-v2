import { motion, useTransform } from "framer-motion";
import { HERO_BLOCK } from "../constant";
import { type HeroTilt } from "../hooks/useHeroTilt";

type HeroBlockProps = {
  tilt: HeroTilt;
};

// The rounded color block behind the portrait, it leans a little toward the mouse.
const HeroBlock = ({ tilt }: HeroBlockProps) => {
  const rotateX = useTransform(tilt.y, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(tilt.x, [-0.5, 0.5], [-12, 12]);

  return (
    <motion.div
      variants={HERO_BLOCK}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      aria-hidden="true"
      className="pointer-events-none z-5 col-start-1 row-start-1 mb-[calc(-0.1*var(--photo-w))] h-[calc(var(--photo-w)*1.15)] w-[min(calc(var(--photo-w)*0.9),84cqi)] lg:h-[calc(var(--photo-w)*0.92)] lg:w-[min(calc(var(--photo-w)*0.68),56cqi)] translate-x-(--photo-shift) rotate-6 self-end rounded-4xl bg-primary relative overflow-hidden"
    >
      {/* Grain */}
      <span className="grain absolute inset-0 opacity-45 mix-blend-multiply" />
      {/* Halftone */}
      <span className="halftone absolute inset-0 text-foreground/45 mask-[radial-gradient(circle_at_100%_0%,black,transparent_60%)]" />
    </motion.div>
  );
};

export default HeroBlock;
