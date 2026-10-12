import { CustomAnimatedButton } from "@/components";

// The call to action, in the open space at the top left of the hero.
const RoleBlock = () => {
  return (
    <div className="absolute top-[var(--space-md)] left-[calc(4.5rem*var(--type-scale)+var(--space-sm))] z-40 hidden flex-col items-start gap-sm lg:flex">
      {/* Action */}
      <CustomAnimatedButton href="#projects">View my works</CustomAnimatedButton>
    </div>
  );
};

export default RoleBlock;
