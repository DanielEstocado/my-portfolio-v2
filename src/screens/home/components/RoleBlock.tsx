import { CustomAnimatedButton } from "@/components";

// A muted line and the call to action, in the open space at the top left of the hero.
const RoleBlock = () => {
  return (
    <div className="absolute top-[var(--space-md)] left-[calc(4.5rem*var(--type-scale)+var(--space-sm))] z-40 hidden flex-col items-start gap-sm lg:flex">
      {/* Subtitle */}
      <p className="title text-micro leading-relaxed font-medium tracking-wide whitespace-nowrap text-muted-foreground/65 uppercase">
        I bash my keyboard with my head
        <br />
        until I make something
      </p>
      {/* Action */}
      <CustomAnimatedButton href="#projects">View my works</CustomAnimatedButton>
    </div>
  );
};

export default RoleBlock;
