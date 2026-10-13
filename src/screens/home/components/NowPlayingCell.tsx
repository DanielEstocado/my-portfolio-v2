import { type KeyboardEvent, type MouseEvent } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from "lucide-react";
import { CustomIconButton } from "@/components";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/formatDuration";
import { getPlayerStatus } from "@/lib/getPlayerStatus";
import { type PlayerStatus } from "@/types/player";
import { NOW_PLAYING, WAVEFORM } from "../constant";
import { usePlayer } from "../hooks/usePlayer";
import PlayerArt from "./PlayerArt";

const SEEK_STEP = 5;
const SKIP_STEP = 10;
const LABELS: Record<PlayerStatus, (playing: boolean) => string> = {
  empty: () => "No song set",
  loading: () => "Loading song...",
  buffering: () => "Buffering...",
  error: () => "Cannot play this song",
  ready: (playing) => (playing ? "Now playing" : "Press play"),
};
const BARS = [
  { duration: "0.9s", delay: "0s" },
  { duration: "0.7s", delay: "0.2s" },
  { duration: "1.1s", delay: "0.1s" },
  { duration: "0.8s", delay: "0.35s" },
];

// A now playing card that really plays a song from YouTube: a sleeve and record that spin while it plays, a waveform that fills as it goes and can be clicked to jump around, and play, pause and restart buttons.
const NowPlayingCell = () => {
  const {
    containerRef,
    elapsed,
    duration,
    playing,
    buffering,
    ready,
    failed,
    info,
    volume,
    toggle,
    restart,
    seek,
    changeVolume,
    toggleMute,
  } = usePlayer(NOW_PLAYING.youtubeId);
  const status = getPlayerStatus({
    hasSong: NOW_PLAYING.youtubeId !== "",
    ready,
    buffering,
    failed,
  });
  const usable = status === "ready" || status === "buffering";
  const progress = duration > 0 ? elapsed / duration : 0;

  // Jumps to the spot of the waveform that was clicked.
  const handleWaveformClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!usable) return;
    const rect = event.currentTarget.getBoundingClientRect();
    seek((event.clientX - rect.left) / rect.width);
  };

  // Lets the arrow keys step through the song.
  const handleWaveformKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!usable || duration === 0) return;
    if (event.key === "ArrowRight") seek((elapsed + SEEK_STEP) / duration);
    else if (event.key === "ArrowLeft") seek((elapsed - SEEK_STEP) / duration);
    else return;
    event.preventDefault();
  };

  return (
    <div className="@container flex flex-col gap-sm p-md">
      {/* Label */}
      <div className="flex items-center justify-between font-mono text-caption tracking-[0.12em] text-muted-foreground uppercase">
        <span className={cn(status === "error" && "text-error")}>{LABELS[status](playing)}</span>
        <span aria-hidden="true" className="flex h-4 items-end gap-0.5 text-primary">
          {BARS.map((bar, index) => (
            <span
              key={index}
              style={{
                animationDuration: bar.duration,
                animationDelay: bar.delay,
                animationPlayState: playing ? "running" : "paused",
              }}
              className="equalizer-bar h-full w-1 rounded-sm bg-current"
            />
          ))}
        </span>
      </div>
      {/* Track */}
      <div className="flex items-center gap-md @max-sm:gap-sm">
        <PlayerArt playing={playing} status={status} videoRef={containerRef} onToggle={toggle} />
        <div className="min-w-0 flex-1">
          <p className="title line-clamp-2 text-body-lg leading-snug font-semibold @max-sm:line-clamp-3 @max-sm:text-body">
            {info.title || NOW_PLAYING.title}
          </p>
          <p className="truncate font-mono text-body text-muted-foreground">
            {info.author || NOW_PLAYING.artist}
          </p>
        </div>
      </div>
      {/* Waveform */}
      <div
        role="slider"
        tabIndex={usable ? 0 : -1}
        aria-disabled={!usable}
        aria-label="Song position"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(elapsed)}
        onClick={handleWaveformClick}
        onKeyDown={handleWaveformKeyDown}
        className={cn(
          "flex h-8 items-center gap-0.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary",
          usable ? "cursor-pointer" : "opacity-40",
          status === "loading" && "animate-pulse",
        )}
      >
        {WAVEFORM.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className={cn(
              "pointer-events-none flex-1 rounded-sm transition-colors duration-300",
              index / WAVEFORM.length < progress
                ? "bg-primary"
                : "bg-muted-foreground/25",
            )}
          />
        ))}
      </div>
      {/* Controls */}
      <div className="grid grid-cols-2 items-center gap-y-1 font-mono text-caption text-muted-foreground @sm:grid-cols-[1fr_auto_1fr]">
        <span className="order-1 tabular-nums">
          {formatDuration(Math.floor(elapsed))} / {formatDuration(Math.floor(duration))}
        </span>
        <div className="order-3 col-span-2 flex items-center justify-self-center gap-1 @sm:order-2 @sm:col-span-1">
          <CustomIconButton label="Restart song" size="sm" disabled={!usable} onClick={restart}>
            <SkipBack aria-hidden="true" />
          </CustomIconButton>
          <CustomIconButton
            label={playing ? "Pause" : "Play"}
            size="sm"
            variant="secondary"
            disabled={!usable}
            onClick={toggle}
          >
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </CustomIconButton>
          <CustomIconButton
            label="Skip ahead 10 seconds"
            size="sm"
            disabled={!usable}
            onClick={() => seek((elapsed + SKIP_STEP) / duration)}
          >
            <SkipForward aria-hidden="true" />
          </CustomIconButton>
        </div>
        {/* Volume */}
        <div className="order-2 flex items-center justify-end gap-1 @sm:order-3">
          <CustomIconButton
            label={volume === 0 ? "Unmute" : "Mute"}
            size="sm"
            disabled={!usable}
            onClick={toggleMute}
          >
            {volume === 0 ? (
              <VolumeX aria-hidden="true" />
            ) : volume < 50 ? (
              <Volume1 aria-hidden="true" />
            ) : (
              <Volume2 aria-hidden="true" />
            )}
          </CustomIconButton>
          <Slider
            aria-label="Volume"
            min={0}
            max={100}
            step={5}
            value={[volume]}
            disabled={!usable}
            onValueChange={([value]) => changeVolume(value)}
            className="w-16"
          />
        </div>
      </div>
      {/* Error */}
      {status === "error" && (
        <p role="alert" className="font-mono text-caption text-error">
          Could not load the song right now. Try again in a bit.
        </p>
      )}
    </div>
  );
};

export default NowPlayingCell;
