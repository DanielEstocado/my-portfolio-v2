import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { CustomThemeDock } from "@/components";
import { ThemeTweaksContext } from "@/context/themeTweaksContext";
import { useDarkMode } from "@/hooks/useDarkMode";
import { toCss } from "@/lib/theme";
import type { ModeTweaks, SharedTweakKey, ThemeMode, Tweaks } from "@/types/theme";
import { applyTweaks, clearTweaks, getThemeDefaults, loadTweaks, saveTweaks } from "./themeTweaks";

type ThemeTweaksProviderProps = {
  enabled?: boolean;
  children: ReactNode;
};

// Lets the theme be tweaked live from a floating Theme button on every screen. Set enabled to false to hide the button and apply nothing, for the shipped app.
export default function ThemeTweaksProvider({ enabled = true, children }: ThemeTweaksProviderProps) {
  const [tweaks, setTweaks] = useState<Tweaks>(loadTweaks);
  const { dark } = useDarkMode();
  const mode: ThemeMode = dark ? "dark" : "light";

  useEffect(() => {
    if (!enabled) return;
    applyTweaks(tweaks, mode);
    saveTweaks(tweaks);
  }, [enabled, tweaks, mode]);

  // Turning the provider off, or unmounting it, puts the page back to normal.
  useEffect(() => {
    if (!enabled) return;
    return clearTweaks;
  }, [enabled]);

  // Changes one value shared by both modes and leaves the rest alone.
  const setTweak = useCallback((key: SharedTweakKey, value: number) => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Changes one value of the mode that is showing and leaves the rest alone.
  const setModeTweak = useCallback(
    <K extends keyof ModeTweaks>(key: K, value: ModeTweaks[K]) => {
      setTweaks((prev) => ({ ...prev, [mode]: { ...prev[mode], [key]: value } }));
    },
    [mode],
  );

  // Goes back to the look theme.css ships with.
  const reset = useCallback(() => setTweaks(getThemeDefaults()), []);

  const value = useMemo(
    () => ({ tweaks, mode: tweaks[mode], modeName: mode, css: toCss(tweaks), setTweak, setModeTweak, reset }),
    [tweaks, mode, setTweak, setModeTweak, reset],
  );

  if (!enabled) return <>{children}</>;

  return (
    <ThemeTweaksContext.Provider value={value}>
      {children}
      <CustomThemeDock />
    </ThemeTweaksContext.Provider>
  );
}
