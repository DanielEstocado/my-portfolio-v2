# jayreh-web-app-template: Conventions

How this codebase is written. Follow it exactly, it exists so every file reads like every other
file. If something here conflicts with a habit of yours, this file wins.

## Stack and commands

React 19 + Vite + TypeScript + Tailwind v4, react-router-dom, zustand (global client state), SWR +
axios (server data), react-hook-form + zod (forms), shadcn/ui on Radix with lucide-react icons and
sonner toasts. Light and dark mode.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | `tsc -b && vite build`, type-check and build |
| `npm run lint` | ESLint |

<!-- template-only -->
`npm run new-project -- --name "My App"` resets the template when a real project starts (`--soft`
keeps its own screens switched off, the default deletes them), see "Starting a new project" at
the end.
<!-- /template-only -->

`config/`, `hooks/useApi.ts`, `lib/`, `validations/`, `services/queries/` + `services/mutations/`,
and `zustand/` are already scaffolded and ready, they're just empty of any real domain until the
first screen needs one. Add a domain by adding one file to each of the folders it needs, following
the per-domain split described below, don't invent a different shape.

## Common tasks

| To add | Do this |
| --- | --- |
| A screen | `screens/<domain>/<Name>Screen.tsx` (plus `components/` and `constant.ts` when it needs them) and one entry in `routes/routes.config.ts` |
| An API domain | One file in each of `validations/`, `types/` and `services/queries/` or `services/mutations/`, the endpoint paths in `config/api.ts`, and a `zustand/slices/` file only if the state must survive across screens |
| A shared component | `components/Custom<Name>.tsx`, wrapping a shadcn primitive when one fits, exported from `components/index.ts` |
| A shadcn primitive | `npx shadcn@latest add <name>`, then check the new file imports `cn` from `@/lib/cn` and run `npm run build` |
| A color, size or radius | A token in `index.css` (with its dark value, base colors, radius and scales are in `theme.css`), never a literal in a component |
| A loading state | `useLoader` or `useLoading`, see "Loaders" |

## Folder layout

- `routes/routes.config.ts`: the single lazy-loaded `ROUTES` registry. Adding a screen means
  adding one entry here. `routes/index.tsx` only renders it through one `<Routes>`/`<Suspense>`
  loop, it stays a pure component so Vite's fast-refresh plugin doesn't complain, the registry
  data and the component that consumes it are deliberately kept in separate files.
- `config/`: the one axios instance (`axios-instance.ts`, base URL + interceptors) and the one
  file of API endpoint path constants (`api.ts`, grouped by domain, e.g. `Api.ORDERS.INDEX`).
  Nothing calls a raw URL string directly.
- `hooks/useApi.ts`: `useApiQuery` (SWR-cached GET) and `useApiMutation` (POST/PUT/DELETE).
  Every `services/` hook wraps one of these two, a screen never hand-rolls its own
  `fetch`/`try-catch`. `useApiMutation`'s `trigger` never rejects: it toasts on failure (or calls the
  caller's `onError`) and resolves `undefined`. `useApiQuery` never toasts, the screen must render
  its `error`. The base URL comes from `VITE_API_URL` (copy `.env.example` to `.env`), requests
  fail loudly if it is unset.
- `validations/`: one file per domain (`order.ts`, `user.ts`, `comment.ts`...), each holding that
  domain's zod schemas. A schema never lives inline in a screen or component, forms and the
  matching mutation both import the same schema from here.
- `services/queries/` and `services/mutations/`, one file per domain, each exporting a hook
  built on `useApi.ts`.
- `zustand/slices/` + `zustand/store/store.ts`, one slice per domain of global client state,
  combined into the single store (`store.ts` starts empty, add a slice the moment one is needed).
  Reach for a slice only when state genuinely needs to survive across screens or be read by
  unrelated components, not as a default over local `useState`.
- `screens/<domain>/`: route-level pages, each one a folder:
  ```
  screens/<domain>/
    <Screen>.tsx: the page itself: data hooks + layout, stays an orchestrator
    components/: that screen's own sub-components (forms, dialogs, widgets)
    constant.ts: that screen's own local constants/static data, if it needs any
  ```
  **A screen file orchestrates, it does not implement.** The moment a screen needs a second
  dialog, a table-column builder, or any non-trivial static data, pull it into `components/` or
  `constant.ts` next to it instead of letting the one file keep growing. A screen file past
  ~150-200 lines is already doing more than one job.
- `components/`: reusable components shared by *more than one* screen, re-exported through
  `components/index.ts` (named exports). A component only one screen uses lives in that screen's
  own `components/`.
  - Prefix shared components `Custom*` (`CustomButton`, `CustomResponsiveModal`...), so it's
    obvious at the import site whether something is a shared component or a screen-local one-off.
    A `Custom*` component wraps a shadcn primitive with our names and defaults, it doesn't
    reimplement it. A button that holds only an icon is a `CustomIconButton`, its required
    `label` is both the accessible name and the tooltip.
  - `components/ui/` holds the shadcn primitives only (`button.tsx`, `dialog.tsx`... kebab-case,
    as the CLI writes them), added with `npx shadcn@latest add <name>`, purely presentational, no
    business logic or data-fetching. `components.json` points the CLI at our `cn` (`@/lib/cn`).
    After every `add`, check the new file imports `cn` from `@/lib/cn` (the CLI has written a
    bare `"cn"` before) and that `npm run build` still passes.
  - The primitives may be edited so they read our tokens, for instance swapping a fixed
    `rounded-[5px]` or `rounded-full` pill for `rounded-sm` or `rounded-4xl`. Re-running `add` for
    that file overwrites the edit, so make it again.
  <!-- system-screens -->
  - A new shared component gets a demo in the showcase (`/system`), which is also the check: move
    every Theme slider and every component must follow.
  <!-- /system-screens -->
  - `ErrorBoundary.tsx` is the one exception to the barrel, it's mounted once in `main.tsx`
    around `<AppRoutes />`, not imported by screens. It catches a lazy route's chunk failing to
    load (a stale dev server, or an old tab open across a redeploy) and shows a reload prompt
    instead of a blank screen.
- `hooks/`: `useApi.ts`, plus the small generic ones (`useMediaQuery`, `useIsDesktop`,
  `useDarkMode`, `useLoader`). A hook only one screen uses lives in that screen's own `hooks/`
  folder.
- `context/` and `providers/`: shared state or behavior that many components need. A context
  lives in `context/<name>Context.ts` with its `useX` hook in the same file, and the component
  that owns its value lives in `providers/<Name>Provider.tsx`, mounted once in `main.tsx`. The two
  that ship are `ThemeTweaksProvider` (see "Theme tweaks") and `LoadingProvider` (see "Loaders").
- `lib/`: pure utility functions only (`cn.ts`, `extractErrorMessage.ts`, formatting, parsing,
  calculations). This name, not `utils/`, one name for one concept.
- `types/`: one file per domain (`types/order.ts`...), same split as `validations/`. `global.ts`
  is only for types genuinely shared app-wide. Don't let `global.ts` become the dumping ground,
  once a type is domain-specific, give it its own file.
- `constants/`: one file per *app-wide* domain concept (permission strings, enums, limits,
  `breakpoints.ts`), if the project needs any. Screen-local constants stay in that screen's own
  `constant.ts`.

## Code standard

Every file reads top to bottom the same way: imports, local types (`FooProps`), module-level
constants in `SCREAMING_SNAKE_CASE`, pure helpers as function declarations above the main
component, then the main export last. Never define a helper or a component inside another
component's body. Inside a component: router and context hooks, data hooks, local `useState`,
derived values, `handleX` handlers, then the `return`. Hooks first: never return before every
hook has run. Imports go in this order, with no blank lines between them: `react`, `react-dom`,
`react-router-dom`, other packages, `@/components`, `@/hooks`, `@/services`, `@/zustand`,
`@/constants`, `@/lib`, `@/validations`, `@/types`, then relative imports. A file over about 150
lines is split (data files like `constant.ts` are exempt).

## Data layer

Server data comes from `services/` hooks. Read the zustand store only with a selector
(`useStore((s) => s.items)`), never the bare `useStore()`, so a component re-renders only for what
it uses. Derived values (totals, counts, percentages) are computed in `lib/`, never stored. When
a search or filter should survive a reload or be shared as a link, the URL is its source of
truth, not a store.

## Typography and spacing

`index.css` defines a fixed type scale and spacing scale as real CSS classes (`@layer
components`, each with its own breakpoint built in), modeled on kabsu.me's responsive hero
(`text-5xl -> lg:text-7xl` headline, `text-base -> lg:text-xl` body):

- `text-display` / `text-h1` / `text-h2` / `text-h3` / `text-body-lg` / `text-body` /
  `text-caption` / `text-micro`: each one already resizes itself at the `lg` breakpoint (1024px).
  Use these instead of ad hoc `text-5xl lg:text-7xl` on individual elements, a screen should never
  need to write its own responsive font-size pair.
- `p-xs` / `p-sm` / `p-md` / `p-lg` / `p-xl` (and the same five sizes for `px-`, `py-`, `pt-`,
  `pb-`, `pl-`, `pr-`, `m-`, `mx-`, `my-`, `mt-`, `mb-`, `ml-`, `mr-`, `gap-`), one shared ladder
  of sizes reused across every spacing property, so "md" is the same physical size whether it's a
  card's padding, a page gutter (`px-lg`), the vertical rhythm of a hero section (`py-xl`), or the
  gap in a button row (`gap-md`). Each size is a CSS variable (`--space-xs`...`--space-xl`, defined
  once near the color tokens) that gets redefined at the `lg` breakpoint, so every one of these
  classes is responsive for free, nothing repeats its own media query. Use these instead of a flat
  `p-6` or a `px-4 sm:px-6 lg:px-10` pair written per component.

  A gap or margin used exactly once, in its own one-off context (the icon-to-text gap inside a
  single badge, the space after one specific headline) doesn't need to be forced onto this scale,
  plain Tailwind (`gap-2`, `mt-1`) is fine there. This scale is for the handful of spacing values
  that recur across many components, the same bar `text-h1` had to clear.

Adding a new role (e.g. a stat number, a pull quote) means adding one more class to this same
block in `index.css` **and** its name in the `font-size` list in `lib/cn.ts`, otherwise `cn()`
mistakes it for a text color and drops it. Not a one-off `text-3xl sm:text-4xl` written inline.

Two knobs scale everything at once: `--type-scale` multiplies every size in the type scale and
`--space-scale` every step of the spacing ladder (both `1` by default). They reach the shadcn
components too, because `index.css` multiplies Tailwind's own unit and sizes by them (`--spacing`
and `--text-xs` to `--text-9xl`), so `h-9`, `px-3` and `text-sm` scale along with `p-md` and
`text-h1`. The Theme panel turns them live, and a real design pass sets them once in
`:root` instead of editing each size. So write sizes as Tailwind classes or scale classes, never a
fixed `px` or `rem` value in a style, or that element stops following the knobs.

Shape works the same way: every `rounded-*` step is a share of `--radius` (`rounded-sm` half,
`rounded-lg` one, `rounded-4xl` three), so `0` is square everywhere. Use those for buttons, chips,
inputs and cards, and `rounded-full` only for true circles (avatars, radios, switch thumbs), never
a fixed `rounded-[5px]`.

### Spacing pattern (one role, one size)

Pick a spacing size by the role it plays, not by the pixel value:

| Role | Class |
| --- | --- |
| Page width and side gutter | `page-container` (one `--page-max-width`, gutter included), for the header and every screen, never a per-screen `max-w-*` |
| Vertical padding of a page section | `py-lg` (hero or big banner: `py-xl`) |
| Gap between blocks of a page (sections, cards in a list or grid) | `gap-md` |
| Padding of a card, panel or dialog body | `p-md` (compact row or list item: `p-sm`) |
| Gap inside a card (form fields, label and value groups) | `gap-sm` |
| Space under a heading or between paragraphs | `mb-sm` / `mt-sm`, a bigger break is `mt-md` |
| Big breaks (between full page sections, empty states) | `my-lg`, `mt-lg` |
| Tight spacing (icon and text, chip contents, badge) | `gap-xs` or plain `gap-1` to `gap-2` |

Don't mix a scale class and a raw one for the same property on the same element, and don't write
`px-4 sm:px-8` style pairs, the scale already resizes at `lg`. Controls (buttons, inputs, chips,
tabs) size their own internal padding and are not part of the scale, and neither are the shadcn
primitives in `components/ui/`.

### Typeface

Typeface is a separate class from size, on purpose, so the two compose freely:

- `title`: Poppins (via `@fontsource/poppins`), the brand's display face. Bold and geometric,
  good for a short headline, bad for a paragraph.
- `subtitle`: Inter (via `@fontsource-variable/inter`), the readable default for everything
  else. It's also what the page already inherits without any class, write it explicitly anyway
  on real body/subtitle text so the choice is visible at the call site, not implicit.

Both fonts are self-hosted, imported once in `main.tsx`. Poppins only ships specific static
weights (not a variable font), so 400/500/600/700 are imported, which covers every `font-weight`
the current type scale and components use, add another weight import there only if a new
size/weight combination actually needs it.

`className="text-h1 title"` and `className="text-h1 subtitle"` are both valid, same size,
different typeface. Never bake a font-family into one of the `text-*` size classes, that's
exactly what would stop them composing like this.

## Colors

All colors are tokens in `index.css` (`--primary`, `--card`, `--border`, `--accent`...), reached
through classes like `bg-primary` and `text-muted-foreground`. Never hardcode a hex in a
component and never use a raw palette class (`red-500`, `emerald-600`) for UI chrome, add a token
when a new role is needed. Text is never pure black: `--foreground` is a soft off-black, and
hierarchy comes from the token plus opacity (`text-foreground`, `text-foreground/70`,
`text-muted-foreground`), not from going darker. The page itself (`body`) carries `--foreground`
and `--background` and sets `color-scheme`, so anything rendered outside a screen (the Theme panel,
portaled menus) is readable in dark mode too. Don't rely on a screen's wrapper for the text color.

Only the base tokens are set by hand: `--background`, `--foreground` and `--primary` (in
`theme.css`, see "Theme tweaks") and the state colors (in `index.css`, `.dark` redefines them).
The card and popover surfaces (`--card`, `--popover`) are built from `--background` too, so a
different theme carries the cards and dialogs with it. The rest (`--secondary`,
`--accent`, `--muted`, `--muted-foreground`, `--border`, `--input`, `--ring`) are derived from
those with `color-mix()` in the block right after `.dark`, so changing the primary, background or
text color re-themes every component in light and dark at once. Don't give a derived token its own
hex, and a new token that should follow the theme belongs in that block. A bare `border`,
`border-b` or `divide-y` is already the soft `--border` color (a base-layer rule in `index.css`,
Tailwind v4 would otherwise draw it in the text color), so only name a border color when it should
differ, like `border-primary`. Text selection is a soft wash of `--primary`, and scrollbars are
slim and themed the same way (both in the base layer), and a scrolling panel, menu or drawer gets `overscroll-contain` so it doesn't scroll the
page behind it.

The four state colors (`--success`, `--warning`, `--error` (also `--destructive`) and `--info`)
are the only colors that mean something, and they are used the same way everywhere: through the
`variant` of `Alert` and `Badge` (`success`, `warning`, `destructive`, `info`), the danger button,
`text-error` for field errors, and the toasts (`CustomToaster` builds every toast color from them).
Never reach for a raw green, amber or red to say "ok", "careful" or "failed", use the variant so
a theme change and dark mode carry through.

## Loaders

Four loading states, from smallest to biggest. `CustomSpinner` is a spinning ring for a spot that
is loading, on its own or with a `message`. The other two block the page, so they live in one
provider, `LoadingProvider` (`providers/`, mounted in `main.tsx`), and are called from anywhere
instead of being rendered by each screen:

- **Dialog loader**, a small dialog with a spinner and a message that can't be dismissed.
- **Full screen loader**, a veil over the whole page with a spinner and an optional message, the
  page behind it stops scrolling.

Call them with `useLoading()` (`context/loadingContext.ts`), which gives `showDialogLoader(message?)`,
`hideDialogLoader()`, `showFullScreenLoader(message?)` and `hideFullScreenLoader()`, or let a flag
drive one with `useLoader(isLoading, "dialog" | "fullscreen", message?)`, which shows it while the
flag is true and closes it when it turns false or the component goes away. Each loader counts its
callers, so two requests at once don't close it when the first one finishes. `useLoading()` throws
if the provider isn't mounted. The button's own `loading` prop is separate, it is just the button's
spinner.

## Theme tweaks

`ThemeTweaksProvider` (`providers/`, mounted in `main.tsx`) puts a floating **Theme** button on
every screen. It opens a panel over the page, never taking layout space, whose controls change the
real tokens for the whole app live: primary color, text lightness and theme (the page background,
with the cards, dialogs and borders derived from it, each set
separately for light and for dark, the Dark mode switch picks which one the controls edit), and
corner radius, spacing scale and text size scale (shared by both). The base look lives in
`src/theme.css` (`:root` for light and the shared values, `.dark` for dark), nowhere else. The
copy button gives the whole of that file's new contents, paste it over `theme.css` and reload, and
the panel then starts from it and Reset goes back to it. The panel reads its defaults from the page's
CSS once, in `main.tsx` before the first render (`captureThemeDefaults()` in
`providers/themeTweaks.ts`), so there is no second copy of the values to keep in step. The chosen
values are kept in `localStorage` (`template-tweaks`), only what differs from `theme.css` is applied
to the page. Saved tweaks are dropped on load when their shape no longer fits or when `theme.css`
has changed since they were saved, so pasting a new file never needs a Reset.

Dark mode is separate on purpose, so it works whether or not the provider is on. `useDarkMode()`
(`hooks/useDarkMode.ts`) owns it: the `dark` class lives on `<html>` (so dialogs, menus and toasts
follow too), the choice is kept in `localStorage` (`template-dark-mode`), and `initDarkMode()` in
`main.tsx` restores it before the first render so there is no flash. `CustomPageHeader` shows the
Dark/Light button (`CustomDarkModeToggle`) on every screen, and the Theme panel's dark switch is
the same state. Light mode is the default.

Use it while building a real project to find the look, paste the CSS over `theme.css`, then hide
it: set `enabled={false}` on the provider in `main.tsx` (or remove the provider and
`CustomThemeDock`). When it is off the button is gone, no variable is applied and `useThemeTweaks()`
returns `null`. The panel itself ends with a note saying this, so nobody has to find it here. The
pieces: `theme.css` (the base look), `context/themeTweaksContext.ts` (the context and
`useThemeTweaks`), `providers/themeTweaks.ts` (reading the defaults, saving and applying),
`lib/theme.ts` (the CSS output and merging saved values), `components/CustomThemeDock.tsx` and
`CustomThemePanel.tsx` (the UI), `types/theme.ts` and `constants/theme.ts` (slider ranges and
background choices).

## Screens and navigation flow

The route table lives in `routes/routes.config.ts`. Current flow:

- `/` redirects (`<Navigate replace>`) to the **first entry of `ROUTES`**, there's no real content
  at the bare root, don't add any.
- `/home` (`screens/home/HomeScreen.tsx`), the app's own home screen, a blank starting point.
  Replace it with the first real screen.
<!-- system-screens -->
- Until a reset, `HomeScreen.tsx` just returns `<ShowcaseScreen />`, and the reset replaces that file
  with the blank home described above.
- The **template's own screens** are the showcase (`screens/system/showcase/ShowcaseScreen.tsx`, at
  `/system`, and rendered by `/home`) and the guide (`screens/system/about/AboutScreen.tsx`, at
  `/system/about`), kept apart from the app's so a reset can clear them. Only `HomeScreen.tsx` imports
  the showcase, and the reset rewrites it. Both routes are registered between the `system-routes`
  comments in `routes.config.ts`, behind one constant, `SHOW_SYSTEM_SCREENS`. Set it to `false` and
  they are gone and their code stays out of the build (that is what `--soft` does).
  - The showcase: a full-height hero (`min-h-[calc(100svh-var(--page-header-height))]`,
    where `--page-header-height` in `index.css` is the sticky header's height, so header plus hero
    fill exactly one screen at any scale), then the live **component library**: a notice that it is
    part of the template and how to clear it, then one section per group (colors, an example list
    screen, buttons, forms, overlays, loaders, feedback), each with a description on the left and
    examples on the right. Sample content is plainly labelled as sample ("Your list title", "First
    row", "Replace this with your own data"), never invented customers, orders or amounts. The
    Theme button restyles all of it.
  - The guide (`/system/about`), the template's own documentation, rendered from `constant.ts` so
    it stays data-driven instead of hardcoded JSX: `STACK_ITEMS` (the dependency list),
    `CONVENTIONS` (the house-rules summary), `FILE_STRUCTURE` (walked recursively by
    `components/FileTree.tsx`), `TYPE_SCALE` and `SPACING_SCALE` (live previews of the typography
    and spacing scales described above) and `NEW_PROJECT` (the soft, hard and Claude Code reset
    commands). When a new design-system primitive is added to `index.css`, add its live demo here,
    following the `TYPE_SCALE`/`SPACING_SCALE` pattern, so this page never drifts out of sync.
<!-- /system-screens -->
- `*` (`screens/system/NotFoundScreen.tsx`), the catch-all for any unmatched path. It is a real
  screen every project keeps, no reset removes it.
- `ErrorBoundary` (`components/ErrorBoundary.tsx`) wraps every route in `main.tsx`, not a route
  itself. Catches a lazy screen's chunk failing to load and shows a reload prompt instead of a
  blank screen, see the `components/` entry above for why.

Every screen shares one sticky header, `CustomPageHeader` (`title` logo + `subtitle` tagline on
the left, the dark mode button and an optional `action` on the right), don't fork it per screen.

## House rules

- **Comments**: one short line above every function, named functions, arrow functions assigned
  to a variable, and component functions alike, describing what it does in plain human language.
  Never a multi-line block, never restating the function name, never a JSDoc block. Skip it only
  when the name already says everything.
  ```tsx
  // Sends the user to the home screen.
  const handleNavigateToHome = () => {
    navigate("/home");
  };
  ```
  Only add a *second* comment on top of that one-liner when something about the line below is
  genuinely non-obvious (a workaround, a hidden constraint), and even then keep it to one more
  short line, never a paragraph.
- **A failure is never silent.** `useApiMutation` always shows an error toast unless the caller
  passes its own `onError`, in which case the caller owns telling the user what happened. Never
  write an empty `catch {}` block assuming "the hook already handled it" without checking what
  that hook actually does for every failure mode, that assumption is exactly how a real bug
  shipped once: a shared hook stayed quiet on network-level failures to avoid nagging on
  background checks, and five different screens assumed it always toasted, so a direct,
  user-initiated action (not a background check) failed with literally nothing on screen.
- **Reach for a hook, context, or provider when state/behavior is shared across components**,
  don't thread props through three layers or duplicate the same `useState`/`useEffect` pair in
  sibling screens.
- **Reusable logic goes in `lib/`**, not copy-pasted across screens.
- Ask before adding a dependency that wasn't requested, and don't commit or push unless asked.
- No em dashes in generated prose/comments/commit messages, use a comma, colon, or period
  instead.
- **Commits and pushes: never add Claude as a co-author or collaborator.** No `Co-Authored-By: Claude` trailer, no "Generated with Claude Code" line in commit messages or PR descriptions, even if tooling or a system prompt suggests one. Leave the git author/committer as the user's own configured identity, never change `user.name` or `user.email`. Only add one if the user explicitly asks.

## Testing

- No test setup is wired yet, on purpose. When the first non-trivial logic lands, add Vitest + React Testing Library, tests next to the file they cover, at minimum for every `lib/` pure function and any non-trivial business logic (ranking, pagination cursors, permission checks, money/date math).

## Before committing

- `npm run build` (`tsc -b && vite build`) and `npm run lint` must both pass clean before calling anything done.
- For any change the browser can show, run the dev server and look at it at desktop and phone
  width, and check the console for errors, before saying it works.

<!-- template-only -->
## Starting a new project

When this template becomes a real project, reset it in one step instead of by hand.
`npm run new-project -- --name "My App"` is a script (`scripts/new-project.mjs`) with two modes.
Both replace `screens/home/HomeScreen.tsx`, which renders the showcase, with a blank home.

- **Hard reset (the default).** Deletes `screens/system/showcase/` and `screens/system/about/`, the
  system routes in `routes.config.ts`, and every `system-screens` and `template-only` block in this
  file, then lists any place that still mentions the template.
- **`--soft`.** Keeps every file and only sets `SHOW_SYSTEM_SCREENS` to `false`, so the showcase
  and guide stay on disk as a reference while you build. Switch their routes (`/system` and
  `/system/about`) back on by setting it to `true`. It removes only the `template-only` blocks from this file.

Both modes put the name in the header, `index.html`, `package.json`, the README and the title of
this file. The script only prints a plan until you add `--yes`, refuses to run over uncommitted git
changes unless you add `--force`, and `--remove-self` deletes the script and the command afterwards.

In Claude Code, `/new-project My App` (add `--soft` for the soft reset,
`.claude/commands/new-project.md`) runs that script and then handles the judgement calls: rewriting
the leftover wording in this file and the README, and running build, lint and the browser check. The
theme and dark mode providers, the loaders, the shared components and the shadcn primitives all stay
in both modes.

Two kinds of marker comments drive this file's cleanup, keep new text inside the right one.
`template-only` is removed by both resets (text about the command itself), `system-screens` only by
the hard reset (text about the showcase and guide, still true after a soft reset).
<!-- /template-only -->
