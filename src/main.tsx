import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import CustomToaster from "./components/CustomToaster";
import ErrorBoundary from "./components/ErrorBoundary";
import { TooltipProvider } from "./components/ui/tooltip";
import LoadingProvider from "./providers/LoadingProvider";
import ThemeTweaksProvider from "./providers/ThemeTweaksProvider";
import "@fontsource-variable/inter/index.css";
import "@fontsource/noto-sans-tagalog/400.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./theme.css";
import "./index.css";
import { initDarkMode } from "./hooks/useDarkMode";
import { captureThemeDefaults } from "./providers/themeTweaks";

// The panel starts from what theme.css says, read before dark mode is applied or anything is on screen.
captureThemeDefaults();
initDarkMode();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* The floating Theme button on every screen, set enabled to false to hide it and apply nothing. */}
      <ThemeTweaksProvider enabled>
        <LoadingProvider>
          <ErrorBoundary>
            <TooltipProvider>
              <AppRoutes />
            </TooltipProvider>
          </ErrorBoundary>
        </LoadingProvider>
      </ThemeTweaksProvider>
      <CustomToaster />
    </BrowserRouter>
  </React.StrictMode>,
);
