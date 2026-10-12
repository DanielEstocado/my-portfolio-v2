import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type CustomAnimatedButtonProps = {
  href: string;
  children: ReactNode;
};

// A primary link button with an arrow: on hover it springs up, fades into a darker gradient, gets a ring and a slanted bar slides across it from right to left, on press it squeezes.
const CustomAnimatedButton = ({ href, children }: CustomAnimatedButtonProps) => {
  return (
    <Button
      asChild
      size="lg"
      className="text-body-lg group/button relative h-auto gap-3 overflow-hidden rounded-4xl px-5 py-3 font-semibold text-background transition-[background-color,color,box-shadow] duration-300 hover:bg-linear-to-r hover:from-primary hover:to-[color-mix(in_oklab,var(--primary),var(--foreground)_35%)] hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background"
    >
      <motion.a
        href={href}
        whileHover={{ y: -3, scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 420, damping: 20 }}
      >
        {/* Shine */}
        <span
          aria-hidden="true"
          className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover/button:-translate-x-40 motion-reduce:transition-none"
        />
        {/* Label */}
        <span className="relative">{children}</span>
        {/* Arrow */}
        <ArrowRight aria-hidden="true" className="relative size-5" />
      </motion.a>
    </Button>
  );
};

export default CustomAnimatedButton;
