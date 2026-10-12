import { type FormEvent } from "react";
import { toast } from "sonner";
import { CustomButton, CustomTextarea } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ROLES } from "../constant";
import SpecimenFrame from "./SpecimenFrame";
import SpecimenSection from "./SpecimenSection";

// Every form control in one realistic settings form, including an invalid field and a validation message.
const FormSection = () => {
  // Stops the page from reloading and confirms the save.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("This is a toast, nothing was saved");
  };

  return (
    <SpecimenSection
      id="forms"
      title="Forms"
      description="Inputs, select, textarea, checkbox, radio and switch, with labels, helper text and an error state."
    >
      <SpecimenFrame label="A settings form, every control in one place">
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="settings-name">Text input</Label>
              <Input id="settings-name" placeholder="Type something" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="settings-email">Input with an error</Label>
              <Input
                id="settings-email"
                type="email"
                defaultValue="name@"
                aria-invalid
              />
              <p className="text-caption text-error">Errors show a message like this one.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Select</Label>
              <Select defaultValue="editor">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="settings-org">Disabled input</Label>
              <Input id="settings-org" disabled defaultValue="Can't be edited" />
              <p className="text-caption text-muted-foreground">
                Helper text goes under the field.
              </p>
            </div>
          </div>

          <CustomTextarea
            placeholder="A textarea, for longer answers"
            defaultValue="Too short"
            error="A textarea error shows underneath, like this."
          />

          <RadioGroup defaultValue="b" className="grid grid-cols-1 gap-sm sm:grid-cols-2">
            {[
              { value: "a", title: "Radio option A", note: "Pick one of a few" },
              { value: "b", title: "Radio option B", note: "Selected by default" },
            ].map(({ value, title, note }) => (
              <Label
                key={value}
                htmlFor={`plan-${value}`}
                className="flex cursor-pointer items-center gap-sm rounded-xl border border-border p-sm has-[[data-state=checked]]:border-primary"
              >
                <RadioGroupItem id={`plan-${value}`} value={value} />
                <span>
                  <span className="block text-body font-medium">{title}</span>
                  <span className="block text-caption font-normal text-muted-foreground">
                    {note}
                  </span>
                </span>
              </Label>
            ))}
          </RadioGroup>

          <div className="flex items-center justify-between gap-md">
            <div>
              <Label htmlFor="settings-notify">Switch</Label>
              <p className="text-caption text-muted-foreground">
                For a setting that turns on or off right away.
              </p>
            </div>
            <Switch id="settings-notify" defaultChecked />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="settings-terms" defaultChecked />
            <Label htmlFor="settings-terms">Checkbox, for a yes or no choice</Label>
          </div>

          <div className="flex justify-end gap-sm border-t border-border pt-md">
            <CustomButton type="button" variant="ghost">
              Cancel
            </CustomButton>
            <CustomButton type="submit">Save changes</CustomButton>
          </div>
        </form>
      </SpecimenFrame>
    </SpecimenSection>
  );
};

export default FormSection;
