import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import CustomIconButton from "./CustomIconButton";

// The dark mode icon button, it shows the mode you would switch to.
const CustomDarkModeToggle = () => {
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
    >
      {dark ? <Sun /> : <Moon />}
    </CustomIconButton>
  );
};

export default CustomDarkModeToggle;
