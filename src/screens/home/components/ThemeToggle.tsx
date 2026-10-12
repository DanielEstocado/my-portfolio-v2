import { CustomDarkModeToggle } from "@/components";

// The light and dark switch, a round button on the right side of the hero in the text color with a page color icon, it turns primary on hover.
const ThemeToggle = () => {
  return (
    <div className="absolute top-[var(--space-md)] right-[var(--space-sm)] z-40">
      <CustomDarkModeToggle className="size-[calc(2.75rem*var(--type-scale))] text-[calc(1.5rem*var(--type-scale))] rounded-full bg-foreground text-background transition-colors duration-200 hover:bg-primary hover:text-background dark:hover:bg-primary dark:hover:text-primary-foreground" />
    </div>
  );
};

export default ThemeToggle;
