// One slider per number shared by both modes, drives the theme panel.
export const SLIDERS = [
  { key: "radius", label: "Corner radius (rem)", min: 0, max: 1.5, step: 0.05 },
  { key: "spaceScale", label: "Spacing scale", min: 0.6, max: 1.6, step: 0.05 },
  { key: "typeScale", label: "Text size scale", min: 0.85, max: 1.3, step: 0.01 },
] as const;

// The text lightness slider, light text on dark needs a different range than dark text on light.
export const TEXT_LIGHTNESS = {
  light: { min: 0.12, max: 0.55, step: 0.01 },
  dark: { min: 0.85, max: 0.99, step: 0.01 },
} as const;

// The themes the panel offers for each mode. Each one is a page background, the cards, dialogs and
// borders are derived from it in index.css, so they follow.
export const THEMES = {
  light: [
    { value: "#f8fafc", label: "Cool white" },
    { value: "#ffffff", label: "White" },
    { value: "#faf7f5", label: "Warm" },
    { value: "#eef1f5", label: "Light grey" },
  ],
  dark: [
    { value: "#09090b", label: "Near black" },
    { value: "#000000", label: "Black" },
    { value: "#0f172a", label: "Slate" },
    { value: "#18181b", label: "Charcoal" },
  ],
} as const;
