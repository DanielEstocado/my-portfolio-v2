import { createContext, useContext } from "react";

type LoadingContextValue = {
  showDialogLoader: (message?: string) => void;
  hideDialogLoader: () => void;
  showFullScreenLoader: (message?: string) => void;
  hideFullScreenLoader: () => void;
};

export const LoadingContext = createContext<LoadingContextValue | null>(null);

// The functions that show and hide the dialog and full screen loaders, from anywhere under LoadingProvider.
export function useLoading() {
  const loading = useContext(LoadingContext);
  if (!loading) {
    throw new Error("useLoading needs LoadingProvider above it, mount it once in main.tsx.");
  }
  return loading;
}
