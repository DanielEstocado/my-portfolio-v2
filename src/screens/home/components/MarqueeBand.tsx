import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeBandProps = {
  children: ReactNode;
  reverse?: boolean;
};

// A full-width dark band whose content slides sideways forever, decorative only.
const MarqueeBand = ({ children, reverse = false }: MarqueeBandProps) => {
  return (
    <div
      aria-hidden="true"
      className="marquee relative left-1/2 flex h-(--marquee-height) w-screen -translate-x-1/2 items-center overflow-hidden bg-primary text-background"
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
