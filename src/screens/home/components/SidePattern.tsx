import logo from "@/assets/logo-tile.svg";

const SIDE_CLASS =
  "absolute inset-y-0 -z-10 w-[calc((100%-min(100%,var(--page-max-width)))/2)] bg-foreground opacity-[0.1] [mask-position:center] [mask-repeat:repeat] [mask-size:calc(4.4rem*var(--space-scale))_auto]";

// The logo, with room around it, repeated as a faint pattern in the margins on both sides of the page column, only wide screens have margins to show it in.
const SidePattern = () => {
  return (
    <div aria-hidden="true">
      {/* Left */}
      <div style={{ maskImage: `url(${logo})` }} className={`${SIDE_CLASS} left-0`} />
      {/* Right */}
      <div style={{ maskImage: `url(${logo})` }} className={`${SIDE_CLASS} right-0`} />
    </div>
  );
};

export default SidePattern;
