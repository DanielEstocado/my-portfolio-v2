import { useEffect } from "react";
import { useLoading } from "@/context/loadingContext";

// Shows a loader while a boolean is true and closes it when it turns false or the component goes away, so a request flag is all it takes.
export function useLoader(
  isLoading: boolean,
  kind: "dialog" | "fullscreen" = "dialog",
  message?: string,
) {
  const { showDialogLoader, hideDialogLoader, showFullScreenLoader, hideFullScreenLoader } =
    useLoading();

  useEffect(() => {
    if (!isLoading) return;
    const show = kind === "fullscreen" ? showFullScreenLoader : showDialogLoader;
    const hide = kind === "fullscreen" ? hideFullScreenLoader : hideDialogLoader;
    show(message);
    return hide;
  }, [isLoading, kind, message, showDialogLoader, hideDialogLoader, showFullScreenLoader, hideFullScreenLoader]);
}
