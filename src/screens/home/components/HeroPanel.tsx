import cutout from "@/assets/cutout.webp";
import HeroDecor from "./HeroDecor";
import HeroTexture from "./HeroTexture";
import MobileIntro from "./MobileIntro";
import RoleBlock from "./RoleBlock";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";

const TAGLINE_CLASS = "subtitle text-body mt-0 hidden font-semibold tracking-[0.08em] uppercase lg:block xl:tracking-[0.18em]";

// "Danyel" in Baybayin: da, na with a virama, ye, la with a virama.
const BAYBAYIN_NAME = "ᜇᜈ᜔ᜌᜒᜎ᜔";
// On big screens the line sits before the first name, on compact screens it sits after the surname.
const BAYBAYIN_START_CLASS = "font-baybayin mb-xs hidden text-[0.16em] leading-none font-bold [-webkit-text-stroke:0.008em_currentColor] tracking-normal normal-case lg:block";
const BAYBAYIN_END_CLASS = "font-baybayin mt-xs block text-[0.27em] leading-none font-bold [-webkit-text-stroke:0.008em_currentColor] tracking-normal normal-case lg:hidden";

const NAME_CLASS =
  "title text-hero [&>span]:-ml-[0.05em] col-start-1 row-start-1 w-full flex flex-col items-start justify-start self-stretch lg:justify-end px-sm py-md text-left lg:pb-[calc(var(--space-lg)+0.75rem)] lg:pl-[calc(4.5rem*var(--type-scale)+0.05em)] lg:[font-size:min(calc(16cqi*var(--type-scale)),24.5svh)] xl:[font-size:min(calc(16.6cqi*var(--type-scale)),26svh)]";

// The hero: the name at the bottom, behind the portrait, between two hairlines.
const HeroPanel = () => {
  return (
    <div className="screen-line-top screen-line-bottom">
      {/* Hero */}
      <section
        aria-label="Introduction"
        className="@container relative grid overflow-clip [overflow-clip-margin:8rem] min-h-[calc(100svh-var(--marquee-height)*2-2px)] grid-cols-[minmax(0,1fr)] items-end justify-items-center [--photo-w:calc(80svh*0.925)] lg:landscape:[--photo-w:min(60cqi,80svh*0.925)] [--photo-shift:1.5rem] lg:landscape:[--photo-shift:calc((100cqi_-_var(--photo-w))/2_-_var(--space-sm))]"
      >
        {/* Socials */}
        <SocialIcons />
        {/* Theme */}
        <ThemeToggle />
        {/* Block */}
        <div
          aria-hidden="true"
          className="pointer-events-none z-[5] col-start-1 row-start-1 -mb-[calc(var(--photo-w)*0.1)] h-[calc(var(--photo-w)*1.15)] w-[min(calc(var(--photo-w)*0.9),84cqi)] lg:h-[calc(var(--photo-w)*0.92)] lg:w-[min(calc(var(--photo-w)*0.68),56cqi)] translate-x-(--photo-shift) rotate-6 self-end rounded-4xl bg-primary relative overflow-hidden"
        >
          {/* Grain */}
          <span className="grain absolute inset-0 opacity-45 mix-blend-multiply" />
          {/* Halftone */}
          <span className="halftone absolute inset-0 text-foreground/45 [mask-image:radial-gradient(circle_at_100%_0%,black,transparent_60%)]" />
        </div>
        {/* Texture */}
        <HeroTexture />
        {/* Decor */}
        <HeroDecor />
        {/* Mobile intro */}
        <MobileIntro />
        {/* Role */}
        <RoleBlock />
        {/* Name */}
        <h1
          aria-label="Daniel Estocado"
          className={`${NAME_CLASS} z-10 text-foreground`}
        >
          <span aria-hidden="true" lang="tl-Tglg" className={BAYBAYIN_START_CLASS}>
            {BAYBAYIN_NAME}
          </span>
          <span aria-hidden="true">Daniel</span>
          <span aria-hidden="true">Estocado</span>
          <span aria-hidden="true" lang="tl-Tglg" className={BAYBAYIN_END_CLASS}>
            {BAYBAYIN_NAME}
          </span>
          <span aria-hidden="true" className={`${TAGLINE_CLASS} text-primary`}>
            - Web/App Developer &amp; Programmer -
          </span>
        </h1>
        {/* Portrait */}
        <img
          src={cutout}
          alt="Portrait of Daniel Estocado"
          className="pointer-events-none z-20 col-start-1 row-start-1 h-auto w-(--photo-w) max-w-none self-end translate-x-(--photo-shift) [filter:drop-shadow(2px_0_0_var(--color-white))_drop-shadow(-2px_0_0_var(--color-white))_drop-shadow(0_2px_0_var(--color-white))_drop-shadow(0_-2px_0_var(--color-white))] select-none"
        />
        {/* Outline filter */}
        <svg aria-hidden="true" className="absolute size-0">
          <filter id="name-outline" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="grown" />
            <feComposite in="grown" in2="SourceAlpha" operator="out" result="ring" />
            <feFlood style={{ floodColor: "var(--color-white)" }} />
            <feComposite in2="ring" operator="in" />
          </filter>
        </svg>
        {/* Surname outline */}
        <div
          aria-hidden="true"
          style={{ maskImage: `url(${cutout})` }}
          className={`${NAME_CLASS} pointer-events-none z-30 [filter:url(#name-outline)] [mask-position:calc(50%_+_var(--photo-shift))_bottom] [mask-repeat:no-repeat] [mask-size:var(--photo-w)_auto]`}
        >
          <span className={`${BAYBAYIN_START_CLASS} invisible`}>{BAYBAYIN_NAME}</span>
          <span className="invisible">Daniel</span>
          <span>Estocado</span>
          <span className={`${BAYBAYIN_END_CLASS} invisible`}>{BAYBAYIN_NAME}</span>
          <span className={`${TAGLINE_CLASS} invisible`}>- Web/App Developer &amp; Programmer -</span>
        </div>
      </section>
    </div>
  );
};

export default HeroPanel;
