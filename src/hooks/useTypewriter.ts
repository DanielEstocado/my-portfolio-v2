import { useEffect, useState } from "react";

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_MS = 1500;
const GAP_MS = 350;

// Types each word out, holds it, deletes it and moves to the next, forever. When still is true it just shows the first word.
export function useTypewriter(words: string[], still = false) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (still) return;

    const word = words[index];
    let delay: number;
    let next: () => void;

    if (!deleting && count < word.length) {
      delay = TYPE_MS;
      next = () => setCount(count + 1);
    } else if (!deleting) {
      delay = HOLD_MS;
      next = () => setDeleting(true);
    } else if (count > 0) {
      delay = DELETE_MS;
      next = () => setCount(count - 1);
    } else {
      delay = GAP_MS;
      next = () => {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      };
    }

    const timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [words, index, count, deleting, still]);

  return still ? words[0] : words[index].slice(0, count);
}
