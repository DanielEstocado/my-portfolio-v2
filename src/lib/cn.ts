import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The text-* size classes from index.css, registered so cn() doesn't mistake them for a text color.
// Add a new size class to index.css and to this list together.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body-lg",
            "body",
            "caption",
            "micro",
          ],
        },
      ],
    },
  },
});

// Combines conditional class names and resolves any conflicting Tailwind utilities.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
