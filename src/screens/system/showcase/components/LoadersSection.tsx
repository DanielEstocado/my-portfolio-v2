import { useState } from "react";
import { CustomButton, CustomSpinner } from "@/components";
import { useLoading } from "@/context/loadingContext";
import { useLoader } from "@/hooks/useLoader";
import SpecimenFrame from "./SpecimenFrame";
import SpecimenSection from "./SpecimenSection";

const DEMO_MILLISECONDS = 2500;

const USAGE = `const { showFullScreenLoader, hideFullScreenLoader } = useLoading();

// or let a flag drive it: it shows while isPending is true and closes when it is false
useLoader(isPending, "dialog", "Saving your changes");`;

// A spinner on its own, with a message, and the two blocking loaders you can trigger from anywhere.
const LoadersSection = () => {
  const { showFullScreenLoader, hideFullScreenLoader } = useLoading();
  const [isSaving, setIsSaving] = useState(false);

  // The dialog loader follows this flag, the way it would follow a request's pending state.
  useLoader(isSaving, "dialog", "Saving your changes");

  // Flips the flag on for a couple of seconds, standing in for a real request.
  const handleShowDialogLoader = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), DEMO_MILLISECONDS);
  };

  // Opens the full screen loader for a couple of seconds, standing in for a real request.
  const handleShowFullScreenLoader = () => {
    showFullScreenLoader("Loading the page");
    setTimeout(hideFullScreenLoader, DEMO_MILLISECONDS);
  };

  return (
    <SpecimenSection
      id="loaders"
      title="Loaders"
      description="A spinner for a spot that is loading, and a dialog or full screen loader for work that should block the page. Both blockers are called from a hook, nothing is passed down as props."
    >
      <SpecimenFrame label="Spinner">
        <div className="flex flex-wrap items-center gap-lg">
          <CustomSpinner size="sm" />
          <CustomSpinner size="md" />
          <CustomSpinner size="lg" />
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="Spinner with a message">
        <div className="flex flex-wrap items-center gap-lg">
          <CustomSpinner size="sm" message="Loading" />
          <CustomSpinner message="Loading your data" />
          <CustomSpinner size="lg" message="Almost there" />
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="Dialog loader">
        <div className="flex flex-wrap items-center gap-md">
          <CustomButton variant="secondary" onClick={handleShowDialogLoader}>
            Show dialog loader
          </CustomButton>
          <p className="text-caption text-muted-foreground">
            A small dialog that can't be dismissed. It closes itself after a
            moment here.
          </p>
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="Full screen loader">
        <div className="flex flex-wrap items-center gap-md">
          <CustomButton variant="secondary" onClick={handleShowFullScreenLoader}>
            Show full screen loader
          </CustomButton>
          <p className="text-caption text-muted-foreground">
            A veil over the whole page, for a page load or a big action. It
            closes itself after a moment here.
          </p>
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="How to use it">
        <pre className="overflow-x-auto rounded-xl bg-muted p-sm font-mono text-caption text-foreground">
          {USAGE}
        </pre>
      </SpecimenFrame>
    </SpecimenSection>
  );
};

export default LoadersSection;
