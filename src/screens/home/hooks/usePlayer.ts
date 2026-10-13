import { useEffect, useRef, useState } from "react";
import { loadYouTubeApi } from "@/lib/loadYouTubeApi";
import { type YouTubePlayer } from "@/types/youtube";

const STATE_ENDED = 0;
const STATE_PLAYING = 1;
const STATE_BUFFERING = 3;
const LOAD_TIMEOUT_MS = 15000;
const POLL_MS = 250;

// A real player for the now playing card, driven by a YouTube video: it mounts the video into the element the returned ref is put on, reports where it is and how long it is, and gives play and pause, restart and seek. It starts paused, because browsers do not let a page play sound until the visitor asks.
export function usePlayer(videoId: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [info, setInfo] = useState({ title: "", author: "" });

  useEffect(() => {
    const container = containerRef.current;
    if (!videoId || !container) return;
    let cancelled = false;
    setFailed(false);
    setReady(false);
    // A video that never gets ready, like a blocked script or a dead connection, is treated as failed.
    const timeout = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        const mount = document.createElement("div");
        container.appendChild(mount);
        playerRef.current = new YT.Player(mount, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          width: 356,
          height: 200,
          playerVars: { controls: 0, disablekb: 1, modestbranding: 1, playsinline: 1, rel: 0, iv_load_policy: 3 },
          events: {
            onReady: (event) => {
              clearTimeout(timeout);
              setReady(true);
              setVolume(event.target.getVolume());
              setMuted(event.target.isMuted());
              setDuration(event.target.getDuration());
              setInfo(event.target.getVideoData());
            },
            onStateChange: (event) => {
              if (event.data === STATE_PLAYING) {
                setDuration(event.target.getDuration());
                setInfo(event.target.getVideoData());
              }
              if (event.data === STATE_ENDED) {
                event.target.seekTo(0, true);
                event.target.playVideo();
              }
              setPlaying(event.data === STATE_PLAYING);
              setBuffering(event.data === STATE_BUFFERING);
            },
            onError: () => {
              clearTimeout(timeout);
              setFailed(true);
            },
          },
        });
      })
      .catch((error) => {
        clearTimeout(timeout);
        console.warn("The YouTube player could not start.", error);
        setFailed(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      playerRef.current?.destroy();
      playerRef.current = null;
      container.replaceChildren();
    };
  }, [videoId]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (player) setElapsed(player.getCurrentTime());
    }, POLL_MS);
    return () => clearInterval(interval);
  }, [playing]);

  // Plays or pauses.
  const toggle = () => {
    if (playing) playerRef.current?.pauseVideo();
    else playerRef.current?.playVideo();
  };

  // Jumps to a point in the song, from 0 at the start to 1 at the end.
  const seek = (fraction: number) => {
    const player = playerRef.current;
    if (!player || duration === 0) return;
    const seconds = Math.min(1, Math.max(0, fraction)) * duration;
    player.seekTo(seconds, true);
    setElapsed(seconds);
  };

  // Sets the volume from 0 to 100, and unmutes if it is raised.
  const changeVolume = (value: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.setVolume(value);
    setVolume(value);
    if (value > 0 && muted) {
      player.unMute();
      setMuted(false);
    }
  };

  // Mutes or unmutes, coming back from a volume of 0 to a middle level so there is something to hear.
  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (muted || volume === 0) {
      if (volume === 0) {
        player.setVolume(50);
        setVolume(50);
      }
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  // Goes back to the start of the song.
  const restart = () => seek(0);

  return {
    containerRef,
    elapsed,
    duration,
    playing,
    buffering,
    ready,
    failed,
    info,
    volume: muted ? 0 : volume,
    toggle,
    restart,
    seek,
    changeVolume,
    toggleMute,
  };
}
