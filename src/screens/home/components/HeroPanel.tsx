import cutout from "@/assets/cutout.webp";
import logo from "@/assets/logo.svg";

type LogoOProps = {
  outline?: boolean;
};

const NAME_CLASS =
  "title text-hero col-start-1 row-start-1 flex flex-col items-start justify-start self-stretch lg:justify-end px-sm py-md text-left";

// The middle O of the surname: the logo inside a circle, solid for the back layer and a ring for the outline layer.
const LogoO = ({ outline = false }: LogoOProps) => {
  return (
    <span
      className={`relative mx-[0.03em] -mb-[0.01em] inline-block size-[0.72em] rounded-full align-baseline ${
        outline ? "border-[max(1.5px,0.012em)] border-primary" : "bg-foreground"
      }`}
    >
      <span
        style={{ maskImage: `url(${logo})` }}
        className={`absolute inset-[19%] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] ${
          outline ? "bg-primary" : "bg-background"
        }`}
      />
    </span>
  );
};

// The hero: the name at the bottom, behind the portrait, between two hairlines.
const HeroPanel = () => {
  return (
    <div className="screen-line-top screen-line-bottom">
      {/* Hero */}
      <section
        aria-label="Introduction"
        className="@container grid min-h-[calc(100svh-var(--marquee-height)*2)] grid-cols-[minmax(0,1fr)] items-end justify-items-center [--photo-w:calc(80svh*0.925)] lg:landscape:[--photo-w:min(86cqi,80svh*0.925)]"
      >
        {/* Name */}
        <h1
          aria-label="Daniel Estocado"
          className={`${NAME_CLASS} z-10 text-foreground`}
        >
          <span aria-hidden="true">Daniel</span>
          <span aria-hidden="true" className="whitespace-nowrap">
            Est
            <LogoO />
            cado
          </span>
        </h1>
        {/* Portrait */}
        <img
          src={cutout}
          alt="Portrait of Daniel Estocado"
          className="pointer-events-none z-20 col-start-1 row-start-1 h-auto w-(--photo-w) max-w-none self-end select-none"
        />
        {/* Surname outline */}
        <div
          aria-hidden="true"
          style={{ maskImage: `url(${cutout})` }}
          className={`${NAME_CLASS} pointer-events-none z-30 text-transparent [-webkit-text-stroke:max(1.5px,0.012em)_var(--primary)] [mask-position:center_bottom] [mask-repeat:no-repeat] [mask-size:var(--photo-w)_auto]`}
        >
          <span className="invisible">Daniel</span>
          <span className="whitespace-nowrap">
            Est
            <LogoO outline />
            cado
          </span>
        </div>
      </section>
    </div>
  );
};

export default HeroPanel;
