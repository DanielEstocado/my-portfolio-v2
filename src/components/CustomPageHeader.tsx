import { type ReactNode } from "react";
import CustomDarkModeToggle from "./CustomDarkModeToggle";

type CustomPageHeaderProps = {
  action?: ReactNode;
};

// The sticky top bar shared by every screen: the brand on the left, the dark mode button and one optional action on the right.
const CustomPageHeader = ({ action }: CustomPageHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="page-container flex items-center justify-between py-sm">
        <div>
          <p className="title text-h3">Daniel Estocado</p>
        </div>
        <div className="flex items-center gap-sm">
          <CustomDarkModeToggle />
          {action}
        </div>
      </div>
    </header>
  );
};

export default CustomPageHeader;
