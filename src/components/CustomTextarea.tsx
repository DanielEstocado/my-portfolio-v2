import { type ComponentProps } from "react";
import { Textarea } from "@/components/ui/textarea";

type CustomTextareaProps = ComponentProps<"textarea"> & {
  error?: string;
};

// A shadcn textarea that shows a validation message underneath when one is passed in.
const CustomTextarea = ({ error, ...props }: CustomTextareaProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <Textarea aria-invalid={error ? true : undefined} {...props} />
      {error && <p className="text-caption text-error">{error}</p>}
    </div>
  );
};

export default CustomTextarea;
