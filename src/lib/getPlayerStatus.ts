import { type PlayerStatus } from "@/types/player";

type PlayerFlags = {
  hasSong: boolean;
  ready: boolean;
  buffering: boolean;
  failed: boolean;
};

// Boils the player's flags down to the one thing it is doing, a failure wins over everything and no song means there is nothing to load.
export function getPlayerStatus({ hasSong, ready, buffering, failed }: PlayerFlags): PlayerStatus {
  if (!hasSong) return "empty";
  if (failed) return "error";
  if (!ready) return "loading";
  return buffering ? "buffering" : "ready";
}
