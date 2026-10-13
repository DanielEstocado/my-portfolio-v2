import { motion, useTransform } from "framer-motion";
import logo from "@/assets/logo-mask.png";
import { HERO_POP } from "../constant";
import { type HeroTilt } from "../hooks/useHeroTilt";

const BADGE_TEXT = "WEB DEVELOPER • ANDROID DEVELOPER • PROGRAMMER • ARTIST • ";

type HeroDecorProps = {
  tilt: HeroTilt;
};

// The badge by the portrait: a ring of text turning one way around a circle that holds the logo and turns the other way, placed from the portrait's own size and position, and leaning toward the mouse a bit more than the block so it sits in front.
const HeroDecor = ({ tilt }: HeroDecorProps) => {
  const rotateX = useTransform(tilt.y, [-0.5, 0.5], [22, -22]);
  const rotateY = useTransform(tilt.x, [-0.5, 0.5], [-26, 26]);
  const shiftX = useTransform(tilt.x, [-0.5, 0.5], [-14, 14]);
  const shiftY = useTransform(tilt.y, [-0.5, 0.5], [-10, 10]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Badge */}
      <motion.div variants={HERO_POP} style={{ rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 700 }} className="absolute z-[25] left-[calc(100%-4.5rem)] bottom-[calc(var(--space-md)+10.75rem)] size-36 lg:left-[calc(50%+var(--photo-shift)+var(--photo-w)*0.3)] lg:bottom-[calc(var(--photo-w)*0.3)] lg:size-[calc(var(--photo-w)*0.31)] rounded-full bg-foreground">
        {/* Text ring, turns left */}
        <motion.svg
          viewBox="0 0 200 200"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 size-full fill-background"
        >
          <path id="badge-ring" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" fill="none" />
          <text className="title text-[16px] font-extrabold" style={{ whiteSpace: "pre" }} textLength="470" lengthAdjust="spacing">
            <textPath href="#badge-ring">{BADGE_TEXT}</textPath>
          </text>
        </motion.svg>
        {/* Logo circle, turns right */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          className="absolute top-1/2 left-1/2 grid size-[56%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary"
        >
          <span
            style={{ maskImage: `url(${logo})` }}
            className="size-[62%] bg-background [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          />
        </motion.span>
      </motion.div>
    </div>
  );
};

export default HeroDecor;
