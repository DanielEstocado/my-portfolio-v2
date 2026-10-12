import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomTypewriter } from "@/components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FAQ, TYPED_WORDS } from "../constant";
import SpecimenFrame from "./SpecimenFrame";
import SpecimenSection from "./SpecimenSection";

// Messages, status chips, the FAQ accordion and the loading skeleton.
const FeedbackSection = () => {
  return (
    <SpecimenSection
      id="feedback"
      title="Feedback"
      description="How the app talks back. Alerts, badges and toasts share the same four state colors."
    >
      <SpecimenFrame label="Typewriter, types the words one after another">
        <p className="title text-h2 font-extrabold">
          I&apos;m a <CustomTypewriter words={TYPED_WORDS} />
        </p>
      </SpecimenFrame>

      <SpecimenFrame label="Alerts">
        <div className="flex flex-col gap-sm">
          <Alert variant="info">
            <Info />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>A notice that doesn't need action. Say what happened in one line.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CircleCheck />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Something worked. Say what, and what comes next.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Something needs attention before it becomes a problem.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something failed. Say what went wrong and how to recover.</AlertDescription>
          </Alert>
          <Alert>
            <Info />
            <AlertTitle>Neutral</AlertTitle>
            <AlertDescription>The default alert, for plain information with no state.</AlertDescription>
          </Alert>
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="Badges">
        <div className="flex flex-wrap items-center gap-sm">
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="Help and FAQ">
        <Accordion type="single" collapsible defaultValue="tokens">
          {FAQ.map(({ value, title, body }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SpecimenFrame>

      <SpecimenFrame label="Loading">
        <div className="flex flex-col gap-sm">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-sm">
              <Skeleton className="size-9 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-3.5 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </SpecimenFrame>
    </SpecimenSection>
  );
};

export default FeedbackSection;
