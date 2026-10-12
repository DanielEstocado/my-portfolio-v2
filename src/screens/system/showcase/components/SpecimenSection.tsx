import { type ReactNode } from "react";

type SpecimenSectionProps = {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
};

// One section of the screen: what it is on the left, the live components on the right.
const SpecimenSection = ({ id, title, description, children }: SpecimenSectionProps) => {
  return (
    <section
      id={id}
      className="grid scroll-mt-24 grid-cols-1 gap-md border-t border-border py-lg lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-lg"
    >
      <div>
        <h2 className="title text-h2">{title}</h2>
        <p className="subtitle mt-xs text-body text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex min-w-0 flex-col gap-md">{children}</div>
    </section>
  );
};

export default SpecimenSection;
