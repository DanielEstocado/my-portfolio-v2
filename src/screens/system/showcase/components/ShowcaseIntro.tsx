import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useThemeTweaks } from "@/context/themeTweaksContext";
import { SECTIONS } from "../constant";

// The heading of the component library below the hero, with the notice that it is sample content and a jump list.
const ShowcaseIntro = () => {
  const themeTweaks = useThemeTweaks();

  return (
    <div className="py-lg">
      <h2 className="title text-h1 text-balance">Components</h2>
      <div className="mt-sm grid grid-cols-1 items-start gap-md lg:grid-cols-2 lg:gap-lg">
        <div>
          <p className="subtitle max-w-xl text-body-lg text-muted-foreground">
            Every shared component in this template, with sample content to show
            how each one looks and behaves.
            {themeTweaks && " Open Theme to restyle all of it at once."}
          </p>
          <nav aria-label="Sections" className="mt-md grid max-w-xl grid-cols-2 gap-sm sm:grid-cols-4">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="subtitle rounded-4xl border border-border bg-card px-4 py-1.5 text-center text-caption font-medium transition hover:bg-muted"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <Alert variant="info">
          <Info />
          <AlertTitle>Everything below is part of the template</AlertTitle>
          <AlertDescription>
            <p>
              Nothing here is real data. When you start your project, preview
              clearing these screens (nothing changes yet):
            </p>
            <code className="mt-1 block overflow-x-auto rounded-lg bg-background/70 px-2 py-1 font-mono text-caption text-foreground">
              npm run new-project -- --name "My App"
            </code>
            <p className="mt-1">
              Then add <code className="font-mono">--yes</code> to delete them, or{" "}
              <code className="font-mono">--soft --yes</code> to keep them as a
              reference and only switch them off.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ShowcaseIntro;
