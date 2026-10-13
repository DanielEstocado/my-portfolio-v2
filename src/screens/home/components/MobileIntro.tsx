import { motion } from "framer-motion";
import { CustomAnimatedButton } from "@/components";
import { HERO_FADE_UP } from "../constant";

// On small screens the tagline and the call to action stack above the social icons.
const MobileIntro = () => {
  return (
    <motion.div variants={HERO_FADE_UP} className="absolute bottom-[calc(var(--space-lg)+4.25rem+0.25rem)] left-(--space-sm) z-40 flex flex-col items-start gap-sm lg:hidden">
      {/* Tagline */}
      <p className="font-mono text-caption font-semibold tracking-[0.08em] whitespace-nowrap text-primary uppercase [text-shadow:0_0_6px_rgb(0_0_0/0.6)]">
        - Web/App Developer &amp; Programmer -
      </p>
      {/* Action */}
      <CustomAnimatedButton href="#projects">
        View my works
      </CustomAnimatedButton>
    </motion.div>
  );
};

export default MobileIntro;
