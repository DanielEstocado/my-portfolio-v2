import { cn } from "@/lib/cn";
import { SLEEP_HOUR, WAKE_HOUR } from "@/lib/manilaTime";

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
const MARKS = [
  { label: "12A", left: "0%" },
  { label: "6A", left: "25%" },
  { label: "12P", left: "50%" },
  { label: "6P", left: "75%" },
];

type DayRulerProps = {
  hour: number;
};

// A ruler of the 24 hours of the day in Cavite: the waking hours a little brighter, the current hour lit in the primary color.
const DayRuler = ({ hour }: DayRulerProps) => {
  return (
    <div aria-hidden="true" className="flex flex-col gap-1">
      {/* Hours */}
      <div className="flex h-5 items-end gap-0.5">
        {HOURS.map((item) => (
          <span
            key={item}
            className={cn(
              "flex-1 rounded-sm",
              item === hour
                ? "h-full bg-primary"
                : item >= WAKE_HOUR && item < SLEEP_HOUR
                  ? "h-3/5 bg-muted-foreground/40"
                  : "h-2/5 bg-muted-foreground/15",
            )}
          />
        ))}
      </div>
      {/* Marks */}
      <div className="relative h-3 font-mono text-micro text-muted-foreground">
        {MARKS.map((mark) => (
          <span key={mark.label} style={{ left: mark.left }} className="absolute">
            {mark.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DayRuler;
