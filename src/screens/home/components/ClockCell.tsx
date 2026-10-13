import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { describeHourDifference, getManilaClock } from "@/lib/manilaTime";
import DayRuler from "./DayRuler";
import { useClock } from "../hooks/useClock";

// A live clock for Cavite: big mono digits with ticking colons, the day laid out as a ruler of hours, and a guess whether Daniel is awake.
const ClockCell = () => {
  const now = useClock();
  const clock = getManilaClock(now);
  const [hours, minutes, seconds] = clock.time.split(":");

  return (
    <div className="flex flex-col gap-sm p-md">
      {/* Label */}
      <div className="flex items-center justify-between font-mono text-caption tracking-[0.12em] text-muted-foreground uppercase">
        <span className="flex items-center gap-xs">
          <MapPin className="size-4" aria-hidden="true" />
          Cavite, PH
        </span>
        <span className="rounded-lg border border-border px-2 py-0.5 tracking-normal">
          UTC+8
        </span>
      </div>
      {/* Time */}
      <p className="flex items-baseline gap-2 font-mono text-h1 leading-none font-bold tracking-tight tabular-nums">
        <span>
          {hours}
          <span className="animate-pulse text-primary">:</span>
          {minutes}
          <span className="animate-pulse text-primary">:</span>
          <span className="text-muted-foreground">{seconds}</span>
        </span>
        <span className="rounded-lg bg-muted px-2 py-1 text-caption tracking-normal text-muted-foreground">
          {clock.period}
        </span>
      </p>
      {/* Day */}
      <DayRuler hour={clock.hour} />
      {/* Status */}
      <p className="flex flex-wrap items-center gap-x-[var(--space-sm)] gap-y-1 font-mono text-caption text-muted-foreground">
        <span className="flex items-center gap-xs text-foreground">
          <span
            className={cn(
              "size-2 rounded-full",
              clock.awake ? "animate-pulse bg-success" : "bg-muted-foreground/50",
            )}
          />
          {clock.awake ? "Probably awake" : "Probably asleep"}
        </span>
        <span>
          {clock.day} // {describeHourDifference(now)}
        </span>
      </p>
    </div>
  );
};

export default ClockCell;
