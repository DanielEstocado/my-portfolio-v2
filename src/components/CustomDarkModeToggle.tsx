import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from "@/hooks/useDarkMode";
import CustomIconButton from "./CustomIconButton";

type CustomDarkModeToggleProps = {
  className?: string;
};

// The dark mode icon button, it shows the mode you would switch to and the icons turn into each other without a gap.
const CustomDarkModeToggle = ({ className }: CustomDarkModeToggleProps) => {
  const { dark, setDark } = useDarkMode();

  // Flips between light and dark.
  const handleToggle = () => {
    setDark(!dark);
  };

  return (
    <CustomIconButton
      label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      onClick={handleToggle}
      className={className}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {dark ? <Sun className="size-[1em]" /> : <Moon className="size-[1em]" />}
        </motion.span>
      </AnimatePresence>
    </CustomIconButton>
  );
};

export default CustomDarkModeToggle;
