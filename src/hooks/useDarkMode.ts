import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "template-dark-mode";

// Tells React when the dark class on <html> changes, so every toggle in the app stays in step.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

// Whether the page is in dark mode right now.
function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

// Puts the saved choice on the page, call once in main.tsx before the first render so there is no flash.
export function initDarkMode() {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (error) {
    console.warn("Saved dark mode choice could not be read.", error);
  }
}

// Dark mode for the whole page: the class lives on <html> so dialogs, menus and toasts follow it, and the choice is remembered.
export function useDarkMode() {
  const dark = useSyncExternalStore(subscribe, getSnapshot);

  // Switches dark mode on or off and remembers it for the next visit.
  const setDark = useCallback((value: boolean) => {
    document.documentElement.classList.toggle("dark", value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? "dark" : "light");
    } catch (error) {
      console.warn("Dark mode could not be saved, it will reset on reload.", error);
    }
  }, []);

  return { dark, setDark };
}
