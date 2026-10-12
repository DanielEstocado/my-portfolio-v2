import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomSpinner from "./CustomSpinner";

type CustomDialogLoaderProps = {
  open: boolean;
  message?: string;
};

// A small dialog with a spinner and a message that blocks the page and can't be dismissed, the app closes it when the work is done.
const CustomDialogLoader = ({ open, message = "Loading" }: CustomDialogLoaderProps) => {
  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="max-w-xs justify-items-center text-center sm:max-w-xs"
      >
        <CustomSpinner size="lg" />
        <DialogTitle className="text-body font-medium">{message}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialogLoader;
