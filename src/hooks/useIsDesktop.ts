import { DESKTOP_QUERY } from "@/constants/breakpoints";
import { useMediaQuery } from "./useMediaQuery";

// True on screens wide enough to show a dialog, false where a bottom drawer fits better.
export function useIsDesktop() {
  return useMediaQuery(DESKTOP_QUERY);
}
