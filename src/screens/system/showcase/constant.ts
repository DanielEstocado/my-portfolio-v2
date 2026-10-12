export type ItemStatus = "Active" | "Draft" | "Archived";

export type ListItem = {
  id: string;
  title: string;
  detail: string;
  status: ItemStatus;
};

// The in-page navigation, one entry per section below the hero.
export const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "list", label: "List screen" },
  { id: "buttons", label: "Buttons" },
  { id: "forms", label: "Forms" },
  { id: "overlays", label: "Overlays" },
  { id: "loaders", label: "Loaders" },
  { id: "feedback", label: "Feedback" },
];

// The filter tabs of the sample list, "all" shows every row.
export const LIST_TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

// Which badge variant each status uses, so the chips follow the state color tokens.
export const STATUS_BADGES = {
  Active: "success",
  Draft: "warning",
  Archived: "outline",
} as const;

// The brand and surface swatches, the class names are written out so Tailwind sees them.
export const BRAND_SWATCHES = [
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "accent", className: "bg-accent" },
  { name: "muted", className: "bg-muted" },
  { name: "card", className: "bg-card border border-border" },
  { name: "border", className: "bg-border" },
];

// The state colors, each one drives the alert, badge and toast of the same name.
export const STATE_SWATCHES = [
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "error", className: "bg-error" },
  { name: "info", className: "bg-info" },
];

// Plainly labelled sample rows, replace them with data from a services/ hook.
export const ITEMS: ListItem[] = [
  { id: "1", title: "First row", detail: "Replace this with your own data", status: "Active" },
  { id: "2", title: "Second row", detail: "A short line about the row", status: "Draft" },
  { id: "3", title: "Third row", detail: "Rows come from a services/ hook", status: "Active" },
  { id: "4", title: "Fourth row", detail: "Status chips follow the theme", status: "Archived" },
  { id: "5", title: "Fifth row", detail: "Tabs filter what is shown", status: "Draft" },
];

export const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

export const NOTIFICATIONS = [
  { title: "Notification title", time: "Just now" },
  { title: "Another notification", time: "An hour ago" },
  { title: "An older notification", time: "Yesterday" },
];

export const FAQ = [
  {
    value: "tokens",
    title: "Where do the colors come from?",
    body: "Every color is a token in index.css. Components read them through classes like bg-primary, never a hex.",
  },
  {
    value: "scale",
    title: "How do I make everything a bit tighter?",
    body: "Set --type-scale and --space-scale in :root. They multiply every size in the type and spacing scales at once.",
  },
  {
    value: "shadcn",
    title: "Can I add more shadcn components?",
    body: "Yes. Run npx shadcn@latest add <name>, then check the new file imports cn from @/lib/cn.",
  },
];
