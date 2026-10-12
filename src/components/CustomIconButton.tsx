import { type ComponentProps, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type IconButtonSize = "sm" | "md" | "lg";
type ShadcnVariant = ComponentProps<typeof Button>["variant"];
type ShadcnSize = ComponentProps<typeof Button>["size"];

type CustomIconButtonProps = Omit<ComponentProps<"button">, "children"> & {
  label: string;
  description?: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
  children: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

// Our variant names on top of shadcn's button variants.
const VARIANTS: Record<IconButtonVariant, ShadcnVariant> = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
  danger: "destructive",
};

const SIZES: Record<IconButtonSize, ShadcnSize> = {
  sm: "icon-sm",
  md: "icon",
  lg: "icon-lg",
};

// A square button that holds only an icon. The label is its accessible name and shows as a tooltip, so it is required, an optional description adds a second line.
const CustomIconButton = ({
  label,
  description,
  side,
  children,
  variant = "ghost",
  size = "md",
  ...props
}: CustomIconButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={VARIANTS[variant]}
          size={SIZES[size]}
          aria-label={label}
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className={description ? "flex-col items-start gap-0.5" : undefined}
      >
        <span className="font-semibold">{label}</span>
        {description && <span className="opacity-80">{description}</span>}
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomIconButton;
