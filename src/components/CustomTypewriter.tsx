import { type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

type CustomTypewriterProps = {
  words: string[];
  className?: string;
  renderText?: (text: string) => ReactNode;
};

// Types the words one after another with a blinking underscore, screen readers get the whole list and motion stops when the visitor asked for less.
const CustomTypewriter = ({ words, className, renderText }: CustomTypewriterProps) => {
  const reduced = useReducedMotion() ?? false;
  const text = useTypewriter(words, reduced);

  return (
    <span className={className}>
      {/* Accessible list */}
      <span className="sr-only">{words.join(", ")}</span>
      {/* Typed text */}
      <span aria-hidden="true" className="whitespace-nowrap">
        {renderText ? renderText(text) : text}
        <span className="motion-safe:animate-pulse">_</span>
      </span>
    </span>
  );
};

export default CustomTypewriter;
