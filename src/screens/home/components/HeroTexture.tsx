// A halftone band across the top of the hero, dense at the top edge and fading away downward.
const HeroTexture = () => {
  return (
    <div
      aria-hidden="true"
      className="halftone pointer-events-none absolute inset-x-0 top-0 z-[1] h-[calc(11rem*var(--type-scale))] text-foreground/35 [mask-image:linear-gradient(to_bottom,black,transparent)] lg:h-[calc(16rem*var(--type-scale))]"
    />
  );
};

export default HeroTexture;
