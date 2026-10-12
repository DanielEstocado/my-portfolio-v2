import { Copy, LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";
import { CustomButton } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SpecimenFrame from "./SpecimenFrame";

// The small things that open next to what you pressed: an account menu, a share popover, a tooltip and toasts.
const MenusFrame = () => {
  return (
    <SpecimenFrame label="Menus, popover, tooltip and toasts">
      <div className="flex flex-wrap items-center gap-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CustomButton variant="ghost">Dropdown menu</CustomButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Menu label</DropdownMenuLabel>
            <DropdownMenuItem>
              <User /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <CustomButton variant="ghost">Popover</CustomButton>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-sm">
            <Label htmlFor="popover-field">A popover holds a little extra content</Label>
            <Input id="popover-field" placeholder="Type something" />
          </PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger asChild>
            <CustomButton variant="ghost" aria-label="Tooltip on an icon button">
              <Copy />
            </CustomButton>
          </TooltipTrigger>
          <TooltipContent>A tooltip names an icon button</TooltipContent>
        </Tooltip>

        <CustomButton variant="secondary" onClick={() => toast.success("A success toast")}>
          Success toast
        </CustomButton>
        <CustomButton variant="secondary" onClick={() => toast.error("An error toast")}>
          Error toast
        </CustomButton>
        <CustomButton variant="secondary" onClick={() => toast.warning("A warning toast")}>
          Warning toast
        </CustomButton>
        <CustomButton variant="secondary" onClick={() => toast.info("An info toast")}>
          Info toast
        </CustomButton>
      </div>
    </SpecimenFrame>
  );
};

export default MenusFrame;
