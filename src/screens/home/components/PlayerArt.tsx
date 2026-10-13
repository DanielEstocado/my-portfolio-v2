import { type RefObject } from "react";
import { CircleAlert, Music } from "lucide-react";
import logo from "@/assets/logo-mask.png";
import { CustomSpinner } from "@/components";
import { type PlayerStatus } from "@/types/player";

type PlayerArtProps = {
  playing: boolean;
  status: PlayerStatus;
  videoRef: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
};

// The cover of the now playing card: the YouTube video as a square sleeve, a widescreen player cropped to its middle so no black bars show, with a record sliding out of its right side that spins while the song plays. Clicking the sleeve plays or pauses, and a veil on it shows when the song is loading, buffering, missing or broken.
const PlayerArt = ({ playing, status, videoRef, onToggle }: PlayerArtProps) => {
  const usable = status === "ready" || status === "buffering";

  return (
    <div className="relative h-28 w-44 shrink-0 @max-sm:h-20 @max-sm:w-32">
      {/* Record */}
      <div
        aria-hidden="true"
        style={{ animationPlayState: playing ? "running" : "paused" }}
        className="absolute top-2 right-0 grid size-24 animate-spin @max-sm:top-1.5 @max-sm:size-16 place-items-center rounded-full bg-foreground dark:border dark:border-border dark:bg-muted [animation-duration:5s] motion-reduce:animate-none"
      >
        <span className="absolute inset-2 rounded-full text-background opacity-30 dark:text-foreground dark:opacity-20 [background:repeating-radial-gradient(circle,transparent_0_3px,currentColor_3px_4px)]" />
        <span className="grid size-[36%] place-items-center rounded-full bg-primary">
          <span
            style={{ maskImage: `url(${logo})` }}
            className="size-[60%] bg-background mask-center mask-no-repeat mask-contain"
          />
        </span>
      </div>
      {/* Sleeve */}
      <div className="absolute top-0 left-0 size-28 overflow-hidden rounded-lg border border-border bg-muted @max-sm:size-20">
        <div
          ref={videoRef}
          className="absolute inset-0 [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-1/2 [&_iframe]:h-[200px] [&_iframe]:w-[356px] [&_iframe]:origin-top [&_iframe]:-translate-x-1/2 [&_iframe]:scale-[0.56] [&_iframe]:border-0 @max-sm:[&_iframe]:scale-[0.4]"
        />
        {/* Veil */}
        {status === "loading" && (
          <div aria-hidden="true" className="absolute inset-0 z-20 animate-pulse bg-muted" />
        )}
        {status === "buffering" && (
          <div className="absolute inset-0 z-20 grid place-items-center bg-background/60">
            <CustomSpinner size="md" />
          </div>
        )}
        {(status === "error" || status === "empty") && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 grid place-items-center bg-muted text-muted-foreground"
          >
            {status === "error" ? (
              <CircleAlert className="size-8 text-error" />
            ) : (
              <Music className="size-8" />
            )}
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          disabled={!usable}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-default"
        />
      </div>
    </div>
  );
};

export default PlayerArt;
