import { createContext, useContext } from "react";
import type { ModeTweaks, SharedTweakKey, ThemeMode, Tweaks } from "@/types/theme";

type ThemeTweaksContextValue = {
  tweaks: Tweaks;
  mode: ModeTweaks;
  modeName: ThemeMode;
  css: string;
  setTweak: (key: SharedTweakKey, value: number) => void;
  setModeTweak: <K extends keyof ModeTweaks>(key: K, value: ModeTweaks[K]) => void;
  reset: () => void;
};

export const ThemeTweaksContext = createContext<ThemeTweaksContextValue | null>(null);

// Reads the live theme tweaks, or null when the provider is switched off, so a screen can tell whether the Theme panel exists.
export function useThemeTweaks() {
  return useContext(ThemeTweaksContext);
}
