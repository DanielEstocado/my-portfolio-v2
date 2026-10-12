import { useEffect, useState } from "react";

// Tracks whether a CSS media query currently matches.
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    // Updates the match state whenever the query starts or stops matching.
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
