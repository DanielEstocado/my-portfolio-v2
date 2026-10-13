import { CustomAnimatedButton } from "@/components";

// On small screens the tagline and the call to action stack above the social icons.
const MobileIntro = () => {
  return (
    <div className="absolute bottom-[calc(var(--space-lg)+4.25rem+0.25rem)] left-(--space-sm) z-40 flex flex-col items-start gap-sm lg:hidden">
      {/* Tagline */}
      <p className="font-mono text-caption font-semibold tracking-[0.08em] whitespace-nowrap text-primary uppercase [text-shadow:0_0_6px_rgb(0_0_0/0.6)]">
        - Web/App Developer &amp; Programmer -
      </p>
      {/* Action */}
      <CustomAnimatedButton href="#projects">
        View my works
      </CustomAnimatedButton>
    </div>
  );
};

export default MobileIntro;
