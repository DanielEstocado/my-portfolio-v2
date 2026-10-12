import { type ReactNode } from "react";

type SpecimenFrameProps = {
  label: string;
  children: ReactNode;
};

// A bordered surface holding one group of components, with a quiet label above it.
const SpecimenFrame = ({ label, children }: SpecimenFrameProps) => {
  return (
    <div>
      <p className="subtitle mb-xs text-caption font-medium text-muted-foreground">
        {label}
      </p>
      <div className="rounded-2xl border border-border bg-card p-md">
        {children}
      </div>
    </div>
  );
};

export default SpecimenFrame;
