import CustomSpinner from "./CustomSpinner";

type CustomFullScreenLoaderProps = {
  open: boolean;
  message?: string;
};

// A veil over the whole screen with a spinner and an optional message, nothing underneath can be used while it shows.
const CustomFullScreenLoader = ({ open, message }: CustomFullScreenLoaderProps) => {
  if (!open) return null;

  return (
    <div
      aria-busy="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-md bg-background/85 backdrop-blur-sm animate-in fade-in-0"
    >
      <CustomSpinner size="lg" message={message} className="flex-col text-body-lg" />
    </div>
  );
};

export default CustomFullScreenLoader;
