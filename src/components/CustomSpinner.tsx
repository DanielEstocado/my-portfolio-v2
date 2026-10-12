import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type SpinnerSize = "sm" | "md" | "lg";

type CustomSpinnerProps = {
  size?: SpinnerSize;
  message?: string;
  className?: string;
};

const SIZES: Record<SpinnerSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
};

// A spinning ring in the primary color, on its own or with a message next to it.
const CustomSpinner = ({ size = "md", message, className }: CustomSpinnerProps) => {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-sm text-muted-foreground", className)}
    >
      <Loader2 className={cn("animate-spin text-primary", SIZES[size])} aria-hidden />
      {message ? (
        <span className="text-body">{message}</span>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </span>
  );
};

export default CustomSpinner;
