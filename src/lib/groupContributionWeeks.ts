import { type GithubContribution } from "@/types/github";

type MonthLabel = {
  label: string;
  week: number;
};

type ContributionWeeks = {
  weeks: (GithubContribution | null)[][];
  months: MonthLabel[];
};

const MIN_WEEKS_BETWEEN_LABELS = 5;

// Gets the day of the week, 0 for Sunday, of a date written like "2026-10-13".
function dayOfWeek(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

// Gets the short month name of a date written like "2026-10-13".
function monthName(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
}

// Lays the days out like GitHub's calendar: columns of weeks starting on Sunday, the first column padded at the top and the last one at the bottom, plus where each month label belongs.
export function groupContributionWeeks(days: GithubContribution[]): ContributionWeeks {
  if (days.length === 0) return { weeks: [], months: [] };

  const padded: (GithubContribution | null)[] = [
    ...Array<null>(dayOfWeek(days[0].date)).fill(null),
    ...days,
  ];
  while (padded.length % 7 !== 0) padded.push(null);

  const weeks = Array.from({ length: padded.length / 7 }, (_, index) =>
    padded.slice(index * 7, index * 7 + 7),
  );

  const months: MonthLabel[] = [];
  weeks.forEach((week, index) => {
    const first = week.find((day) => day !== null);
    if (!first) return;
    const label = monthName(first.date);
    const previous = months[months.length - 1];
    if (previous?.label === label) return;
    if (previous && index - previous.week < MIN_WEEKS_BETWEEN_LABELS) return;
    months.push({ label, week: index });
  });

  return { weeks, months };
}
