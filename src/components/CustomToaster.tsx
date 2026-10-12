import { type CSSProperties } from "react";
import { Toaster } from "sonner";

// Every toast color comes from a token, so the state colors, a theme change and dark mode all restyle them.
const TOAST_STYLE = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
  "--success-bg": "color-mix(in oklab, var(--success) 12%, var(--popover))",
  "--success-text": "var(--success)",
  "--success-border": "color-mix(in oklab, var(--success) 35%, var(--popover))",
  "--error-bg": "color-mix(in oklab, var(--error) 12%, var(--popover))",
  "--error-text": "var(--error)",
  "--error-border": "color-mix(in oklab, var(--error) 35%, var(--popover))",
  "--warning-bg": "color-mix(in oklab, var(--warning) 18%, var(--popover))",
  "--warning-text": "var(--foreground)",
  "--warning-border": "color-mix(in oklab, var(--warning) 45%, var(--popover))",
  "--info-bg": "color-mix(in oklab, var(--info) 12%, var(--popover))",
  "--info-text": "var(--info)",
  "--info-border": "color-mix(in oklab, var(--info) 35%, var(--popover))",
  "--border-radius": "var(--radius-xl)",
} as CSSProperties;

// The app's toast stack, a sonner Toaster dressed in the theme tokens.
const CustomToaster = () => {
  return <Toaster richColors position="top-right" style={TOAST_STYLE} />;
};

export default CustomToaster;
