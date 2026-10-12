import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { CustomDialogLoader, CustomFullScreenLoader } from "@/components";
import { LoadingContext } from "@/context/loadingContext";

type LoaderState = {
  count: number;
  message?: string;
};

type LoadingProviderProps = {
  children: ReactNode;
};

const IDLE: LoaderState = { count: 0 };

// One more caller wants this loader open, the latest message wins.
function addLoader(state: LoaderState, message?: string): LoaderState {
  return { count: state.count + 1, message: message ?? state.message };
}

// One caller is done, the loader closes only when the last one is.
function removeLoader(state: LoaderState): LoaderState {
  const count = Math.max(0, state.count - 1);
  return count === 0 ? IDLE : { ...state, count };
}

// Owns the dialog loader and the full screen loader. Each one counts how many callers asked for it, so two requests at once don't close it early.
const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [dialog, setDialog] = useState<LoaderState>(IDLE);
  const [fullScreen, setFullScreen] = useState<LoaderState>(IDLE);
  const fullScreenOpen = fullScreen.count > 0;

  // The page behind the full screen loader should not scroll.
  useEffect(() => {
    if (!fullScreenOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [fullScreenOpen]);

  const showDialogLoader = useCallback((message?: string) => setDialog((prev) => addLoader(prev, message)), []);
  const hideDialogLoader = useCallback(() => setDialog(removeLoader), []);
  const showFullScreenLoader = useCallback((message?: string) => setFullScreen((prev) => addLoader(prev, message)), []);
  const hideFullScreenLoader = useCallback(() => setFullScreen(removeLoader), []);

  const value = useMemo(
    () => ({ showDialogLoader, hideDialogLoader, showFullScreenLoader, hideFullScreenLoader }),
    [showDialogLoader, hideDialogLoader, showFullScreenLoader, hideFullScreenLoader],
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <CustomDialogLoader open={dialog.count > 0} message={dialog.message} />
      <CustomFullScreenLoader open={fullScreenOpen} message={fullScreen.message} />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
