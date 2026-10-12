import { lazy } from "react";

type RouteConfig = {
  path: string;
  screen: React.LazyExoticComponent<() => React.ReactElement>;
};

// system-routes:start
// The template's own screens (the component showcase and the guide), kept apart from the app's.
// Setting this to false removes both routes and keeps their code out of the production build,
// `npm run new-project -- --soft` does it. The imports sit inside the condition on purpose, that is
// what lets the bundler drop them.
const SHOW_SYSTEM_SCREENS = true;

const SYSTEM_ROUTES: RouteConfig[] = SHOW_SYSTEM_SCREENS
  ? [
      {
        path: "/system",
        screen: lazy(() => import("@/screens/system/showcase/ShowcaseScreen")),
      },
      {
        path: "/system/about",
        screen: lazy(() => import("@/screens/system/about/AboutScreen")),
      },
    ]
  : [];
// system-routes:end

// Every routable screen in the app, add one entry here to register a new route. The first entry is
// where "/" redirects to. The 404 lives in routes/index.tsx.
export const ROUTES: RouteConfig[] = [
  { path: "/home", screen: lazy(() => import("@/screens/home/HomeScreen")) },
  // system-routes:start
  ...SYSTEM_ROUTES,
  // system-routes:end
];
