const TIME_ZONE = "Asia/Manila";
const MANILA_OFFSET_MINUTES = 480;
export const WAKE_HOUR = 7;
export const SLEEP_HOUR = 23;

export type ManilaClock = {
  time: string;
  period: string;
  day: string;
  hour: number;
  awake: boolean;
};

const FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  weekday: "short",
  month: "short",
  day: "numeric",
});

// The current time in Cavite split into what the clock cell shows, and a guess whether Daniel is awake.
export function getManilaClock(now: Date): ManilaClock {
  const parts = Object.fromEntries(
    FORMATTER.formatToParts(now).map((part) => [part.type, part.value]),
  );
  const hour = Number(parts.hour) % 24;
  const hour12 = hour % 12 || 12;

  return {
    time: `${hour12}:${parts.minute}:${parts.second}`,
    period: hour < 12 ? "AM" : "PM",
    day: `${parts.weekday}, ${parts.month} ${parts.day}`,
    hour,
    awake: hour >= WAKE_HOUR && hour < SLEEP_HOUR,
  };
}

// How far Cavite's clock is from the visitor's own, in a short sentence.
export function describeHourDifference(now: Date) {
  const hours = (MANILA_OFFSET_MINUTES + now.getTimezoneOffset()) / 60;
  if (hours === 0) return "Same time as you.";

  const size = Number.isInteger(hours) ? Math.abs(hours) : Math.abs(hours).toFixed(1);
  const unit = Math.abs(hours) === 1 ? "hour" : "hours";
  return `Cavite is ${size} ${unit} ${hours > 0 ? "ahead of" : "behind"} you.`;
}
