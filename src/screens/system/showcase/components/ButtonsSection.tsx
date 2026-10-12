import { ArrowRight, Bell, Download, Plus, Settings, Trash2 } from "lucide-react";
import { CustomButton, CustomIconButton } from "@/components";
import { Button } from "@/components/ui/button";
import SpecimenFrame from "./SpecimenFrame";
import SpecimenSection from "./SpecimenSection";

// Our CustomButton in its variants, sizes and states, then the shadcn Button it is built on.
const ButtonsSection = () => {
  return (
    <SpecimenSection
      id="buttons"
      title="Buttons"
      description="CustomButton keeps our variant names, a loading state and full width. Button is shadcn's own."
    >
      <SpecimenFrame label="Variants">
        <div className="flex flex-wrap items-center gap-sm">
          <CustomButton variant="primary">Primary</CustomButton>
          <CustomButton variant="secondary">Secondary</CustomButton>
          <CustomButton variant="muted">Muted</CustomButton>
          <CustomButton variant="ghost">Ghost</CustomButton>
          <CustomButton variant="danger">Danger</CustomButton>
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="Sizes and states">
        <div className="flex flex-wrap items-center gap-sm">
          <CustomButton size="sm">Small</CustomButton>
          <CustomButton size="md">Medium</CustomButton>
          <CustomButton size="lg">Large</CustomButton>
          <CustomButton loading>Loading</CustomButton>
          <CustomButton disabled>Disabled</CustomButton>
          <CustomButton variant="secondary">
            <Download /> With an icon
          </CustomButton>
          <CustomButton variant="ghost">
            <Plus /> Ghost with an icon
          </CustomButton>
        </div>
        <CustomButton fullWidth className="mt-md">
          Full width <ArrowRight />
        </CustomButton>
      </SpecimenFrame>

      <SpecimenFrame label="Icon buttons, the label is the tooltip and the accessible name">
        <div className="flex flex-wrap items-center gap-sm">
          <CustomIconButton label="Add" variant="primary">
            <Plus />
          </CustomIconButton>
          <CustomIconButton label="Settings" variant="secondary">
            <Settings />
          </CustomIconButton>
          <CustomIconButton label="Notifications">
            <Bell />
          </CustomIconButton>
          <CustomIconButton label="Delete" variant="danger">
            <Trash2 />
          </CustomIconButton>
          <CustomIconButton label="Small" size="sm">
            <Settings />
          </CustomIconButton>
          <CustomIconButton label="Large" size="lg">
            <Settings />
          </CustomIconButton>
          <CustomIconButton label="Disabled" disabled>
            <Bell />
          </CustomIconButton>
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="shadcn Button, the base">
        <div className="flex flex-wrap items-center gap-sm">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="icon" aria-label="Add">
            <Plus />
          </Button>
        </div>
      </SpecimenFrame>
    </SpecimenSection>
  );
};

export default ButtonsSection;
