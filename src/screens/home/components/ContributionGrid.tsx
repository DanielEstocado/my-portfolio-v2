import { cn } from "@/lib/cn";
import { groupContributionWeeks } from "@/lib/groupContributionWeeks";
import { type GithubContribution } from "@/types/github";

const LEVEL_CLASSES = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
];
const LEGEND_LEVELS = [0, 1, 2, 3, 4];

type ContributionGridProps = {
  days: GithubContribution[];
  total: number;
  profileUrl: string;
};

// A year of contributions drawn like GitHub's calendar: month names, a column per week with a square per day lit by how much was done, and one caption line with the total, the source and a less to more legend.
const ContributionGrid = ({ days, total, profileUrl }: ContributionGridProps) => {
  const { weeks, months } = groupContributionWeeks(days);

  return (
    <div className="flex flex-col gap-2">
      {/* Months */}
      <div aria-hidden="true" className="relative h-4 font-mono text-caption text-muted-foreground">
        {months.map((month) => (
          <span
            key={month.week}
            style={{ left: `${(month.week / weeks.length) * 100}%` }}
            className="absolute"
          >
            {month.label}
          </span>
        ))}
      </div>
      {/* Days */}
      <div
        role="img"
        aria-label={`${total} contributions over the last year`}
        style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
        className="grid grid-flow-col grid-rows-7 gap-0.5"
      >
        {weeks.flat().map((day, index) => (
          <span
            key={day?.date ?? `empty-${index}`}
            title={day ? `${day.count} on ${day.date}` : undefined}
            className={cn("aspect-square rounded-sm", day ? LEVEL_CLASSES[day.level] : "bg-transparent")}
          />
        ))}
      </div>
      {/* Caption */}
      <div className="flex flex-wrap items-center justify-between gap-x-[var(--space-sm)] gap-y-1 font-mono text-caption text-muted-foreground">
        <p>
          <span className="text-foreground">{total.toLocaleString("en-US")} contributions</span>. Source:{" "}
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-primary"
          >
            GitHub
          </a>
          .
        </p>
        <p aria-hidden="true" className="ml-auto flex items-center gap-1">
          <span>Less</span>
          {LEGEND_LEVELS.map((level) => (
            <span key={level} className={cn("size-2.5 rounded-sm", LEVEL_CLASSES[level])} />
          ))}
          <span>More</span>
        </p>
      </div>
    </div>
  );
};

export default ContributionGrid;
