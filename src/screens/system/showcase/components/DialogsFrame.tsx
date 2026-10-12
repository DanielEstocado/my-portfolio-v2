import { useState } from "react";
import { toast } from "sonner";
import { CustomButton, CustomResponsiveModal } from "@/components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NOTIFICATIONS } from "../constant";
import SpecimenFrame from "./SpecimenFrame";

// The things that ask for attention: a dialog, a confirm, the responsive filters panel and a side sheet.
const DialogsFrame = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <SpecimenFrame label="Dialogs and panels">
      <div className="flex flex-wrap items-center gap-sm">
        <Dialog>
          <DialogTrigger asChild>
            <CustomButton variant="ghost">Dialog</CustomButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>
                A dialog holds a short form or a message. Say what it is for here.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="dialog-field">A field</Label>
              <Input id="dialog-field" placeholder="Type something" />
            </div>
            <DialogFooter>
              <CustomButton onClick={() => toast.success("This is a toast, nothing was saved")}>
                Primary action
              </CustomButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <CustomButton variant="danger">Confirm dialog</CustomButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Use this for an action that can't be undone. It asks for an answer before it closes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep it</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast.error("This is a toast, nothing was deleted")}>
                Yes, do it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <CustomButton variant="secondary" onClick={() => setFiltersOpen(true)}>
          Responsive modal
        </CustomButton>
        <CustomResponsiveModal
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          title="Responsive modal"
          description="A dialog on desktop, a bottom drawer on phones, same content in both."
          footer={
            <CustomButton fullWidth onClick={() => setFiltersOpen(false)}>
              Done
            </CustomButton>
          }
        >
          <div className="flex flex-col gap-sm">
            {["First option", "Second option", "Third option"].map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox id={`option-${option}`} defaultChecked />
                <Label htmlFor={`option-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        </CustomResponsiveModal>

        <Sheet>
          <SheetTrigger asChild>
            <CustomButton variant="ghost">Side sheet</CustomButton>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Side sheet</SheetTitle>
              <SheetDescription>A side panel for secondary tasks, like a list of notifications.</SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col divide-y divide-border px-md">
              {NOTIFICATIONS.map(({ title, time }) => (
                <li key={title} className="py-sm">
                  <p className="text-body font-medium">{title}</p>
                  <p className="text-caption text-muted-foreground">{time}</p>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </SpecimenFrame>
  );
};

export default DialogsFrame;
