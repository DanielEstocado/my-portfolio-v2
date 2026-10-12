import { type ComponentProps, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "muted" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
type ShadcnVariant = ComponentProps<typeof Button>["variant"];
type ShadcnSize = ComponentProps<typeof Button>["size"];

type CustomButtonProps = Omit<ComponentProps<"button">, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
};

// Our variant names on top of shadcn's button variants.
const VARIANTS: Record<ButtonVariant, ShadcnVariant> = {
  primary: "default",
  secondary: "secondary",
  muted: "secondary",
  ghost: "outline",
  danger: "destructive",
};

const SIZES: Record<ButtonSize, ShadcnSize> = {
  sm: "sm",
  md: "default",
  lg: "lg",
};

// A shadcn button with our variant names, a loading spinner and a full width option.
const CustomButton = ({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      variant={VARIANTS[variant]}
      size={SIZES[size]}
      disabled={disabled || loading}
      className={cn(
        variant === "muted" && "bg-muted text-foreground hover:bg-border",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
};

export default CustomButton;
