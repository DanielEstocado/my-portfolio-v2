import { motion, useReducedMotion } from "framer-motion";
import cutout from "@/assets/cutout.webp";
import HeroBlock from "./HeroBlock";
import HeroDecor from "./HeroDecor";
import HeroTexture from "./HeroTexture";
import MobileIntro from "./MobileIntro";
import RoleBlock from "./RoleBlock";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";
import { HERO_FADE_IN, HERO_NAME_LINE } from "../constant";
import { useHeroTilt } from "../hooks/useHeroTilt";
import { usePortraitRise } from "../hooks/usePortraitRise";

const TAGLINE_CLASS =
  "font-mono text-body mt-0 hidden font-semibold tracking-[0.08em] uppercase lg:block xl:tracking-[0.18em]";

// "Danyel" in Baybayin: da, na with a virama, ye, la with a virama.
const BAYBAYIN_NAME = "ᜇᜈ᜔ᜌᜒᜎ᜔";
// On big screens the line sits before the first name, on compact screens it sits after the surname.
const BAYBAYIN_START_CLASS =
  "font-baybayin mb-xs hidden text-[0.16em] leading-none font-bold [-webkit-text-stroke:0.008em_currentColor] tracking-normal normal-case lg:block";
const BAYBAYIN_END_CLASS =
  "font-baybayin mt-xs block text-[0.27em] leading-none font-bold [-webkit-text-stroke:0.008em_currentColor] tracking-normal normal-case lg:hidden";

const NAME_CLASS =
  "title text-hero [&>span]:-ml-[0.05em] col-start-1 row-start-1 w-full flex flex-col items-start justify-start self-stretch lg:justify-end px-sm pt-[calc(var(--space-lg)-0.45rem)] pb-md text-left lg:pb-(--space-lg) lg:pl-[calc(4.5rem*var(--type-scale)+0.05em)] lg:[font-size:min(calc(16cqi*var(--type-scale)),24.5svh)] xl:[font-size:min(calc(16.6cqi*var(--type-scale)),26svh)]";

// The hero: the name at the bottom, behind the portrait, between two hairlines.
const HeroPanel = () => {
  const reduceMotion = useReducedMotion();
  const { tilt, handlePointerMove, handlePointerLeave } = useHeroTilt();
  const { y: portraitY, maskPosition } = usePortraitRise(reduceMotion);

  return (
    <div className="screen-line-top screen-line-bottom">
      {/* Hero */}
      <motion.section
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        onPointerMove={reduceMotion ? undefined : handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label="Introduction"
        className="@container relative grid [clip-path:inset(-8rem_-8rem_0_-8rem)] min-h-[calc(100svh-var(--marquee-height)*2-2px)] lg:landscape:min-h-[calc(min(100svh,62rem)-var(--marquee-height)*2-2px)] grid-cols-[minmax(0,1fr)] items-end justify-items-center [--photo-w:calc(80svh*0.925)] lg:landscape:[--photo-w:min(60cqi,80svh*0.925)] [--photo-shift:1.5rem] lg:landscape:[--photo-shift:calc((100cqi-var(--photo-w))/2-var(--space-sm))]"
      >
        {/* Socials */}
        <SocialIcons />
        {/* Theme */}
        <ThemeToggle />
        {/* Block */}
        <HeroBlock tilt={tilt} />
        {/* Texture */}
        <HeroTexture />
        {/* Decor */}
        <HeroDecor tilt={tilt} />
        {/* Mobile intro */}
        <MobileIntro />
        {/* Role */}
        <RoleBlock />
        {/* Name */}
        <h1
          aria-label="Daniel Estocado"
          className={`${NAME_CLASS} z-10 text-foreground`}
        >
          <motion.span
            variants={HERO_NAME_LINE}
            custom={0}
            aria-hidden="true"
            lang="tl-Tglg"
            className={BAYBAYIN_START_CLASS}
          >
            {BAYBAYIN_NAME}
          </motion.span>
          <motion.span variants={HERO_NAME_LINE} custom={1} aria-hidden="true">
            Daniel
          </motion.span>
          <motion.span variants={HERO_NAME_LINE} custom={2} aria-hidden="true">
            Estocado
          </motion.span>
          <motion.span
            variants={HERO_NAME_LINE}
            custom={3}
            aria-hidden="true"
            lang="tl-Tglg"
            className={BAYBAYIN_END_CLASS}
          >
            {BAYBAYIN_NAME}
          </motion.span>
          <motion.span
            variants={HERO_NAME_LINE}
            custom={3}
            aria-hidden="true"
            className={`${TAGLINE_CLASS} text-primary`}
          >
            - Web/App Developer &amp; Programmer -
          </motion.span>
        </h1>
        {/* Portrait */}
        <motion.img
          variants={HERO_FADE_IN}
          style={{ y: portraitY }}
          src={cutout}
          alt="Portrait of Daniel Estocado"
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none z-20 col-start-1 row-start-1 h-auto w-(--photo-w) max-w-none self-end translate-x-(--photo-shift) filter-[drop-shadow(2px_0_0_var(--color-white))_drop-shadow(-2px_0_0_var(--color-white))_drop-shadow(0_2px_0_var(--color-white))_drop-shadow(0_-2px_0_var(--color-white))] select-none"
        />
        {/* Outline filter */}
        <svg aria-hidden="true" className="absolute size-0">
          <filter id="name-outline" colorInterpolationFilters="sRGB">
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="2"
              result="grown"
            />
            <feComposite
              in="grown"
              in2="SourceAlpha"
              operator="out"
              result="ring"
            />
            <feFlood style={{ floodColor: "var(--color-white)" }} />
            <feComposite in2="ring" operator="in" />
          </filter>
        </svg>
        {/* Surname outline */}
        <motion.div
          variants={HERO_FADE_IN}
          aria-hidden="true"
          style={{ maskImage: `url(${cutout})`, maskPosition }}
          className={`${NAME_CLASS} pointer-events-none z-30 filter-[url(#name-outline)] mask-no-repeat mask-size-[var(--photo-w)_auto]`}
        >
          <span className={`${BAYBAYIN_START_CLASS} invisible`}>
            {BAYBAYIN_NAME}
          </span>
          <span className="invisible">Daniel</span>
          <motion.span variants={HERO_NAME_LINE} custom={2}>
            Estocado
          </motion.span>
          <span className={`${BAYBAYIN_END_CLASS} invisible`}>
            {BAYBAYIN_NAME}
          </span>
          <span className={`${TAGLINE_CLASS} invisible`}>
            - Web/App Developer &amp; Programmer -
          </span>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HeroPanel;
