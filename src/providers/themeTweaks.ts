import { lightnessOf, mergeTweaks } from "@/lib/theme";
import type { ModeTweaks, ThemeMode, Tweaks } from "@/types/theme";

const STORAGE_KEY = "template-tweaks";
// The last two are no longer set, they are cleared in case an older version of the panel left them on the page.
const ALL_VARIABLES = [
  "--card-foreground",
  "--popover-foreground",
  "--foreground",
  "--primary",
  "--background",
  "--radius",
  "--space-scale",
  "--type-scale",
];

let defaults: Tweaks | null = null;

// One mode's colors as the CSS currently declares them.
function readMode(css: CSSStyleDeclaration): ModeTweaks {
  const read = (name: string) => css.getPropertyValue(name).trim();
  return {
    primary: read("--primary").toLowerCase(),
    textL: lightnessOf(read("--foreground"), 0.18),
    background: read("--background").toLowerCase(),
  };
}

// Reads the look theme.css ships with, light and dark. Call it once in main.tsx before the first
// render, so no element is there to animate when the dark class flips. If it runs later (a hot
// reload), the inline tweaks are set aside while it reads and put back after, or they would be taken for the defaults.
export function captureThemeDefaults() {
  const root = document.documentElement;
  const inline = ALL_VARIABLES.map((name) => [name, root.style.getPropertyValue(name)]);
  ALL_VARIABLES.forEach((name) => root.style.removeProperty(name));
  const wasDark = root.classList.contains("dark");
  root.classList.remove("dark");
  const lightCss = getComputedStyle(root);
  const light = readMode(lightCss);
  const shared = {
    radius: parseFloat(lightCss.getPropertyValue("--radius")) || 0.75,
    spaceScale: parseFloat(lightCss.getPropertyValue("--space-scale")) || 1,
    typeScale: parseFloat(lightCss.getPropertyValue("--type-scale")) || 1,
  };
  root.classList.add("dark");
  const dark = readMode(getComputedStyle(root));
  root.classList.toggle("dark", wasDark);
  inline.forEach(([name, value]) => value && root.style.setProperty(name, value));
  defaults = { ...shared, light, dark };
}

// The look theme.css ships with, what Reset puts back.
export function getThemeDefaults(): Tweaks {
  if (!defaults) captureThemeDefaults();
  return defaults as Tweaks;
}

// Reads the saved tweaks, falling back to the look theme.css ships with. Tweaks saved against a
// different theme.css are dropped, so pasting a new file never leaves the old ones on top of it.
export function loadTweaks(): Tweaks {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    const base = getThemeDefaults();
    if (!parsed || parsed.base !== JSON.stringify(base)) return base;
    return mergeTweaks(parsed.tweaks, base);
  } catch (error) {
    console.warn("Saved tweaks could not be read, using the defaults.", error);
    return getThemeDefaults();
  }
}

// Remembers the tweaks for the next visit.
export function saveTweaks(tweaks: Tweaks) {
  try {
    const base = JSON.stringify(getThemeDefaults());
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ base, tweaks }));
  } catch (error) {
    console.warn("Tweaks could not be saved, they will reset on reload.", error);
  }
}

// Puts the page back the way theme.css ships it.
export function clearTweaks() {
  const root = document.documentElement;
  ALL_VARIABLES.forEach((name) => root.style.removeProperty(name));
}

// Writes what differs from theme.css onto the page as CSS variables, for the mode that is showing.
export function applyTweaks(tweaks: Tweaks, mode: ThemeMode) {
  clearTweaks();
  const base = getThemeDefaults();
  const root = document.documentElement;
  const set = (name: string, value: string) => root.style.setProperty(name, value);
  if (tweaks.radius !== base.radius) set("--radius", `${tweaks.radius}rem`);
  if (tweaks.spaceScale !== base.spaceScale) set("--space-scale", String(tweaks.spaceScale));
  if (tweaks.typeScale !== base.typeScale) set("--type-scale", String(tweaks.typeScale));
  const now = tweaks[mode];
  const was = base[mode];
  if (now.primary !== was.primary) set("--primary", now.primary);
  if (now.textL !== was.textL) set("--foreground", `oklch(${now.textL} 0.012 255)`);
  if (now.background !== was.background) set("--background", now.background);
}
