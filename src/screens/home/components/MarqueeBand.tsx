import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeBandProps = {
  children: ReactNode;
  reverse?: boolean;
  edge: "top" | "bottom";
};

// A full-width band tilted a little, whose content slides sideways forever, decorative only. It reaches past the page edges so the tilt leaves no gap at the sides.
const MarqueeBand = ({ children, reverse = false, edge }: MarqueeBandProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "marquee relative left-1/2 z-50 flex w-[112vw] -translate-x-1/2 overflow-hidden bg-primary text-background",
        edge === "top" ? "h-(--marquee-height) -rotate-[0.8deg] items-center" : "-mt-4 h-[calc(var(--marquee-height)+1rem)] rotate-[0.8deg] items-center pt-4 pb-3",
      )}
    >
      {/* Track */}
      <div className={cn("marquee-track", reverse && "marquee-track-reverse")}>
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBand;
