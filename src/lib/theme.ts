import type { ModeTweaks, Tweaks } from "@/types/theme";

// The lightness number inside an oklch(...) value, or the fallback when it is written another way.
export function lightnessOf(value: string, fallback: number) {
  const match = value.match(/oklch\(\s*([\d.]+)/);
  return match ? Number(match[1]) : fallback;
}

// A number from saved data, or the fallback when it is missing or not a number.
function numberOr(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

// A text value from saved data, or the fallback when it is missing or not text.
function textOr(value: unknown, fallback: string) {
  return typeof value === "string" && value ? value : fallback;
}

// One mode's saved values laid over its defaults, anything unknown or the wrong type is dropped.
function mergeMode(saved: unknown, defaults: ModeTweaks): ModeTweaks {
  const mode = (saved ?? {}) as Record<string, unknown>;
  return {
    primary: textOr(mode.primary, defaults.primary),
    textL: numberOr(mode.textL, defaults.textL),
    background: textOr(mode.background, defaults.background),
  };
}

// Saved tweaks laid over the defaults, so an old saved shape can never change what is applied.
export function mergeTweaks(saved: unknown, defaults: Tweaks): Tweaks {
  const data = (saved ?? {}) as Record<string, unknown>;
  return {
    radius: numberOr(data.radius, defaults.radius),
    spaceScale: numberOr(data.spaceScale, defaults.spaceScale),
    typeScale: numberOr(data.typeScale, defaults.typeScale),
    light: mergeMode(data.light, defaults.light),
    dark: mergeMode(data.dark, defaults.dark),
  };
}

// The whole of theme.css for the current tweaks, ready to paste over that file.
export function toCss(tweaks: Tweaks) {
  const block = (selector: string, mode: ModeTweaks, shared: string[]) => [
    `${selector} {`,
    `  --primary: ${mode.primary};`,
    `  --foreground: oklch(${mode.textL} 0.012 255);`,
    `  --background: ${mode.background};`,
    ...shared,
    "}",
  ];
  return [
    ...block(":root", tweaks.light, [
      `  --radius: ${tweaks.radius}rem;`,
      `  --space-scale: ${tweaks.spaceScale};`,
      `  --type-scale: ${tweaks.typeScale};`,
    ]),
    "",
    ...block(".dark", tweaks.dark, []),
    "",
  ].join("\n");
}
