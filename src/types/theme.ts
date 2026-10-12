// The theme values that are set separately for light and for dark mode.
export type ModeTweaks = {
  primary: string;
  textL: number;
  background: string;
};

// The theme values the Theme panel can change: three shared by both modes, and one set per mode.
export type Tweaks = {
  radius: number;
  spaceScale: number;
  typeScale: number;
  light: ModeTweaks;
  dark: ModeTweaks;
};

// The mode the panel is editing, the same as whether the page is dark.
export type ThemeMode = "light" | "dark";

// The numbers a slider can change, shared by both modes.
export type SharedTweakKey = "radius" | "spaceScale" | "typeScale";
