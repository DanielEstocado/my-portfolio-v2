import logo from "@/assets/logo-tile.svg";

const SIDE_CLASS =
  "absolute top-[calc(var(--marquee-height)+1rem+0.75vw)] bottom-[calc(var(--marquee-height)+1.25rem+0.75vw)] -z-10 w-[calc((100vw-min(100vw,var(--page-max-width)))/2)] bg-foreground opacity-[0.1] [mask-position:center] [mask-repeat:repeat] [mask-size:calc(4.4rem*var(--space-scale))_auto]";

// The logo, with room around it, repeated as a faint pattern in the margins beside the hero, starting below the top band and ending above the bottom band so the tilt never shows it next to a marquee, only wide screens have margins to show it in.
const SidePattern = () => {
  return (
    <div aria-hidden="true">
      {/* Left */}
      <div
        style={{ maskImage: `url(${logo})` }}
        className={`${SIDE_CLASS} right-full`}
      />
      {/* Right */}
      <div
        style={{ maskImage: `url(${logo})` }}
        className={`${SIDE_CLASS} left-full`}
      />
    </div>
  );
};

export default SidePattern;
