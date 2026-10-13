import { type YouTubeNamespace } from "@/types/youtube";

let loading: Promise<YouTubeNamespace> | null = null;

// Loads YouTube's player script once and gives back its player tools, later calls get the same result.
export function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  loading ??= new Promise<YouTubeNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => {
      loading = null;
      reject(new Error("The YouTube player script could not be loaded."));
    };
    document.head.appendChild(script);
  });

  return loading;
}
