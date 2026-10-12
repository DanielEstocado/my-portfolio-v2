import { useState, type KeyboardEvent } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import CustomButton from "./CustomButton";
import CustomThemePanel from "./CustomThemePanel";

// A floating Theme button that opens the theme panel over the page, so it never takes up layout space.
const CustomThemeDock = () => {
  const [open, setOpen] = useState(false);

  // Flips the panel open or closed.
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  // Closes the panel when Escape is pressed from inside it.
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-sm">
      {open && (
        <div
          role="dialog"
          aria-label="Theme"
          onKeyDown={handleKeyDown}
          className="max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card p-md shadow-xl animate-in fade-in-0 slide-in-from-bottom-2"
        >
          <div className="mb-md flex items-center justify-between">
            <h2 className="title text-h3">Theme</h2>
            <button
              type="button"
              onClick={handleToggle}
              aria-label="Close theme panel"
              className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          </div>
          <CustomThemePanel />
        </div>
      )}

      <CustomButton
        className="rounded-4xl shadow-lg"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <SlidersHorizontal />
        Theme
      </CustomButton>
    </div>
  );
};

export default CustomThemeDock;
