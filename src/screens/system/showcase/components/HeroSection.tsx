import { ChevronDown } from "lucide-react";
import { CustomButton } from "@/components";

type HeroSectionProps = {
  onAbout: () => void;
  onExplore: () => void;
};

// The full-height opening of the page: the pitch, two ways onward and a nudge to keep scrolling.
const HeroSection = ({ onAbout, onExplore }: HeroSectionProps) => {
  return (
    <section className="relative flex min-h-[calc(100svh-var(--page-header-height))] flex-col items-center justify-center px-lg pb-xl text-center">
      <span className="subtitle mb-sm w-fit rounded-4xl bg-primary/10 px-4 py-1 text-caption font-semibold text-primary">
        React + Vite + Tailwind
      </span>

      <h1 className="title text-display max-w-4xl text-balance">
        The boring part is done.
      </h1>

      <p className="subtitle mt-md max-w-xl text-body text-foreground text-balance">
        <em>
          &ldquo;Commit your work to the Lord, and your plans will be
          established.&rdquo;
        </em>{" "}
        <span className="whitespace-nowrap text-caption font-semibold text-primary">
          Proverbs 16:3
        </span>
      </p>

      <p className="subtitle mt-sm max-w-xl text-caption text-muted-foreground text-balance">
        And if this template ever lets you down, you know who to blame:{" "}
        <a
          href="https://github.com/DanielEstocado"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-foreground underline underline-offset-4 transition hover:text-primary"
        >
          Daniel Estocado
        </a>
        .
      </p>

      <div className="mt-lg flex flex-wrap items-center justify-center gap-md">
        <CustomButton
          variant="primary"
          className="subtitle rounded-4xl"
          onClick={onAbout}
        >
          About this template
        </CustomButton>
        <CustomButton
          variant="ghost"
          className="subtitle rounded-4xl"
          onClick={onExplore}
        >
          See the components
        </CustomButton>
      </div>

      <button
        type="button"
        onClick={onExplore}
        aria-label="Scroll to the components"
        className="absolute bottom-6 grid size-10 place-items-center rounded-full text-muted-foreground transition hover:bg-muted"
      >
        <ChevronDown className="motion-safe:animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
