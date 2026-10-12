export type FileNode = {
  name: string;
  type: "file" | "folder";
  description: string;
  children?: FileNode[];
};

// Drives the Typography scale card, one row per size class, shown in both the title and subtitle typeface.
export const TYPE_SCALE = [
  { className: "text-display", label: "text-display", sample: "Display" },
  { className: "text-h1", label: "text-h1", sample: "Heading 1" },
  { className: "text-h2", label: "text-h2", sample: "Heading 2" },
  { className: "text-h3", label: "text-h3", sample: "Heading 3" },
  { className: "text-body-lg", label: "text-body-lg", sample: "Body large" },
  { className: "text-body", label: "text-body", sample: "Body" },
  { className: "text-caption", label: "text-caption", sample: "Caption" },
  { className: "text-micro", label: "text-micro", sample: "Micro" },
];

// Drives the Spacing scale card's padding/gap demos.
export const SPACING_SCALE = ["xs", "sm", "md", "lg", "xl"] as const;

export const FILE_STRUCTURE: FileNode[] = [
  {
    name: "src/",
    type: "folder",
    description: "Application source root",
    children: [
      {
        name: "main.tsx",
        type: "file",
        description: "Entry point, mounts React into the DOM",
      },
      {
        name: "theme.css",
        type: "file",
        description: "The base look: primary, text and background colors for light and dark, radius and the two scale knobs. The Theme panel copies its new contents here",
      },
      {
        name: "index.css",
        type: "file",
        description: "Design tokens, the text-h1 typography scale, the p-md/gap-lg spacing scale, and the title/subtitle typeface classes",
      },
      {
        name: "components/",
        type: "folder",
        description: "Shared, reusable UI components across the entire app",
        children: [
          {
            name: "index.ts",
            type: "file",
            description: "Barrel export, import all components from one place",
          },
          {
            name: "ErrorBoundary.tsx",
            type: "file",
            description: "Mounted once in main.tsx, catches a failed lazy chunk and shows a reload prompt instead of a blank screen",
          },
          {
            name: "CustomButton.tsx",
            type: "file",
            description: "A shadcn Button with our variant names, a loading spinner and full width",
          },
          {
            name: "CustomTextarea.tsx",
            type: "file",
            description: "A shadcn Textarea with a validation message underneath",
          },
          {
            name: "CustomResponsiveModal.tsx",
            type: "file",
            description: "A dialog on desktop and a bottom drawer on phones, same content in both",
          },
          {
            name: "CustomPageHeader.tsx",
            type: "file",
            description: "The sticky top bar every screen shares, brand on the left, the dark mode button and one optional action on the right",
          },
          {
            name: "CustomIconButton.tsx",
            type: "file",
            description: "A square icon-only button, its required label is the accessible name and the tooltip",
          },
          {
            name: "CustomDarkModeToggle.tsx",
            type: "file",
            description: "The dark mode icon button in the page header, switches dark mode for the whole page",
          },
          {
            name: "CustomSpinner.tsx",
            type: "file",
            description: "A spinning ring in three sizes, on its own or with a message",
          },
          {
            name: "CustomDialogLoader.tsx",
            type: "file",
            description: "A small non-dismissable dialog with a spinner and message, opened by LoadingProvider",
          },
          {
            name: "CustomFullScreenLoader.tsx",
            type: "file",
            description: "A veil over the whole screen with a spinner and message, opened by LoadingProvider",
          },
          {
            name: "CustomToaster.tsx",
            type: "file",
            description: "The app's toast stack, every toast color built from the state color tokens",
          },
          {
            name: "CustomThemeDock.tsx",
            type: "file",
            description: "The floating Theme button that opens the theme panel over any screen",
          },
          {
            name: "CustomThemePanel.tsx",
            type: "file",
            description: "The theme controls: color, text, radius, spacing and type scale, background, dark mode",
          },
          {
            name: "ui/",
            type: "folder",
            description: "shadcn primitives (button, dialog, drawer, dropdown-menu, select, tabs...), added with npx shadcn@latest add",
          },
        ],
      },
      {
        name: "context/",
        type: "folder",
        description: "Contexts, each with its useX hook in the same file",
        children: [
          { name: "themeTweaksContext.ts", type: "file", description: "The theme tweaks context and useThemeTweaks(), null when the provider is off" },
          { name: "loadingContext.ts", type: "file", description: "The loader context and useLoading(): show and hide the dialog and full screen loaders" },
        ],
      },
      {
        name: "providers/",
        type: "folder",
        description: "Components that own a context's value, mounted once in main.tsx",
        children: [
          { name: "ThemeTweaksProvider.tsx", type: "file", description: "Applies the live theme tweaks to the page and shows the Theme button, enabled={false} hides it" },
          { name: "themeTweaks.ts", type: "file", description: "Reads the defaults from theme.css, saves and applies the tweaks" },
          { name: "LoadingProvider.tsx", type: "file", description: "Owns the dialog and full screen loaders and counts how many callers asked for each" },
        ],
      },
      {
        name: "config/",
        type: "folder",
        description: "The one axios instance and every API endpoint path, nothing calls a raw URL string",
        children: [
          { name: "axios-instance.ts", type: "file", description: "Shared axios client, base URL comes from VITE_API_URL (see .env.example)" },
          { name: "api.ts", type: "file", description: "Endpoint path constants, grouped by domain, empty until the first domain is added" },
        ],
      },
      {
        name: "hooks/",
        type: "folder",
        description: "Hooks shared by more than one screen",
        children: [
          { name: "useApi.ts", type: "file", description: "useApiQuery (SWR-cached GET) + useApiMutation (POST/PUT/DELETE, never rejects) that every services/ hook wraps" },
          { name: "useMediaQuery.ts", type: "file", description: "Tracks whether a CSS media query matches" },
          { name: "useIsDesktop.ts", type: "file", description: "True where a dialog fits, false where a bottom drawer does" },
          { name: "useLoader.ts", type: "file", description: "useLoader(isLoading, kind, message) shows a loader while the flag is true and closes it after" },
          { name: "useDarkMode.ts", type: "file", description: "Dark mode for the whole page: the class on html, remembered between visits, restored by initDarkMode() in main.tsx" },
        ],
      },
      {
        name: "constants/",
        type: "folder",
        description: "One file per app-wide concept, breakpoints.ts holds the desktop media query and theme.ts the Theme panel slider ranges and background choices",
      },
      {
        name: "validations/",
        type: "folder",
        description: "One zod schema file per domain, added as each domain is built, a schema never lives inline in a screen",
      },
      {
        name: "services/",
        type: "folder",
        description: "The data layer, one file per domain in each of queries/ and mutations/, added as each domain is built",
      },
      {
        name: "zustand/",
        type: "folder",
        description: "Global client state, one slice per domain, combined into a single store",
        children: [
          { name: "store/store.ts", type: "file", description: "Combines every slice into the one useStore() hook, empty until the first slice is added" },
        ],
      },
      {
        name: "routes/",
        type: "folder",
        description:
          "Centralized route declarations and lazy-loaded screen map",
        children: [
          {
            name: "routes.config.ts",
            type: "file",
            description: "The ROUTES array, add a screen here, nowhere else",
          },
          {
            name: "index.tsx",
            type: "file",
            description: "AppRoutes component, renders ROUTES with Suspense, kept component-only for fast refresh",
          },
        ],
      },
      {
        name: "screens/",
        type: "folder",
        description:
          "Feature screens, each folder owns its screen, constants, and local components",
        children: [
          {
            name: "home/",
            type: "folder",
            description: "The app's own home screen, a blank starting point that a reset never touches",
            children: [
              { name: "HomeScreen.tsx", type: "file", description: "Root component for the /home route, it renders the showcase until a reset swaps it for a blank home" },
            ],
          },
          {
            name: "system/",
            type: "folder",
            description: "System-level screens. NotFoundScreen stays in every project, the template's own screens below are cleared by npm run new-project",
            children: [
              {
                name: "NotFoundScreen.tsx",
                type: "file",
                description: "Rendered on unmatched routes via the * catch-all",
              },
              {
                name: "showcase/",
                type: "folder",
                description: "The template's landing screen at /system, also rendered by the home screen: a full-height hero, then the component library. Sample content only",
                children: [
                  { name: "ShowcaseScreen.tsx", type: "file", description: "Root component for the /system route, the hero then the library sections" },
                  { name: "constant.ts", type: "file", description: "Section list, color swatches, sample rows, notifications and FAQ for the demos" },
                  { name: "components/", type: "folder", description: "HeroSection, ShowcaseIntro, the Colors, Buttons, Forms, Overlays, Loaders and Feedback sections, ListDemo (the example list screen) and SpecimenSection and SpecimenFrame (the layout)" },
                ],
              },
              {
                name: "about/",
                type: "folder",
                description: "The template guide at /system/about, rendered from its constant.ts",
                children: [
                  { name: "AboutScreen.tsx", type: "file", description: "Root component for the /system/about route" },
                  { name: "constant.ts", type: "file", description: "The stack, conventions, file tree, scales and new project commands this page shows" },
                  { name: "components/FileTree.tsx", type: "file", description: "Recursive file structure visualizer" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "types/",
        type: "folder",
        description: "One file per domain, added as each domain is built, plus global.ts for truly app-wide types",
        children: [
          {
            name: "global.ts",
            type: "file",
            description: "App-wide type definitions shared across features",
          },
        ],
      },
      {
        name: "lib/",
        type: "folder",
        description: "Pure utility functions only, formatting, parsing, calculations",
        children: [
          { name: "cn.ts", type: "file", description: "Merges conditional class names, resolving Tailwind conflicts" },
          { name: "extractErrorMessage.ts", type: "file", description: "Pulls a readable message out of a failed API call" },
          { name: "theme.ts", type: "file", description: "Builds the theme.css text for the Theme panel and merges saved tweaks" },
        ],
      },
    ],
  },
  {
    name: "scripts/",
    type: "folder",
    description: "Project scripts, run from npm",
    children: [
      { name: "new-project.mjs", type: "file", description: "npm run new-project, clears the sample screens and component library and renames the app. Run it once" },
    ],
  },
  {
    name: ".claude/commands/",
    type: "folder",
    description: "Claude Code slash commands for this project",
    children: [
      { name: "new-project.md", type: "file", description: "/new-project, runs the script above then tidies the docs and checks the build" },
    ],
  },
];

// The ways to clear the template's own screens when a real project starts, drives the "Start a new project" card.
export const NEW_PROJECT = [
  {
    label: "1. Preview the plan",
    command: 'npm run new-project -- --name "My App"',
    note: "Changes nothing, it only prints what a hard reset would do. Add --soft to preview the soft one.",
  },
  {
    label: "2. Hard reset (the default)",
    command: 'npm run new-project -- --name "My App" --yes',
    note: "Deletes the showcase and this guide, their routes and the template wording in the docs, and swaps the home screen for a blank one.",
  },
  {
    label: "2. Or soft reset",
    command: 'npm run new-project -- --name "My App" --soft --yes',
    note: "Keeps the files but switches their routes off in routes.config.ts, so they stay as a reference. Set SHOW_SYSTEM_SCREENS back to true to bring them back.",
  },
  {
    label: "Other flags",
    command: '--tagline "..."   --force   --remove-self',
    note: "A line under the name in the header, apply even with uncommitted git changes, and delete the script and the /new-project command afterwards.",
  },
];

export const STACK_ITEMS = [
  { label: "React", description: "UI library" },
  { label: "Vite", description: "Build tool" },
  { label: "TypeScript", description: "Type safety" },
  { label: "Tailwind v4", description: "Styling" },
  { label: "shadcn/ui + Radix", description: "Component primitives" },
  { label: "Poppins + Inter", description: "title / subtitle typefaces" },
  { label: "React Router v7", description: "Routing" },
  { label: "Zustand", description: "Global client state" },
  { label: "SWR + Axios", description: "Data fetching and caching" },
  { label: "React Hook Form + Zod", description: "Forms and validation" },
  { label: "Sonner", description: "Toasts" },
];

export const CONVENTIONS = [
  { label: "Screen naming", example: "AboutScreen.tsx, NotFoundScreen.tsx" },
  {
    label: "Component exports",
    example: 'import { CustomButton } from "@/components"',
  },
  {
    label: "Route registration",
    example: "Add to ROUTES[] in routes/routes.config.ts only",
  },
  {
    label: "Screen-local components",
    example: "screens/<domain>/components/, never imported globally",
  },
  {
    label: "One schema, one place",
    example: "validations/<domain>.ts, never an inline zod schema in a screen",
  },
  {
    label: "A screen orchestrates, it doesn't implement",
    example: "Second dialog or column-builder? Split into components/ next to it.",
  },
  {
    label: "A failure is never silent",
    example: "useApiMutation always toasts unless the caller passes its own onError",
  },
  {
    label: "Comments",
    example: "One short, human line above every function, see CLAUDE.md",
  },
  {
    label: "Responsive text and spacing",
    example: "text-display, text-h1... / p-md, px-lg, gap-sm..., defined once in index.css",
  },
  {
    label: "One shared ladder, every spacing property",
    example: '"md" is the same physical size in p-md, gap-md, and mt-md alike',
  },
  {
    label: "Pick spacing by role, not pixels",
    example: "Page gutter px-md, section py-lg, blocks gap-md, card p-md, inside a card gap-sm",
  },
  {
    label: "Colors are tokens, never hex",
    example: "bg-primary, text-muted-foreground, never #b11031 or red-500",
  },
  {
    label: "shadcn primitives, our Custom* wrappers",
    example: "npx shadcn@latest add dialog, then use CustomResponsiveModal, see the home screen",
  },
  {
    label: "Show a loader from a flag, or call it",
    example: 'useLoader(isPending, "dialog", "Saving") or useLoading().showFullScreenLoader("Loading")',
  },
  {
    label: "One knob scales the type or spacing",
    example: "--type-scale and --space-scale in :root multiply every size in the scales",
  },
  {
    label: "Typeface is a separate class from size",
    example: '"text-h1 title" or "text-h1 subtitle", never baked into the size class',
  },
];
