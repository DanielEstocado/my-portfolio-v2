import { motion } from "framer-motion";
import { CustomAnimatedButton } from "@/components";
import { HERO_FADE_UP } from "../constant";

// The call to action, in the open space at the top left of the hero.
const RoleBlock = () => {
  return (
    <motion.div variants={HERO_FADE_UP} className="absolute top-(--space-lg) left-[calc(4.5rem*var(--type-scale)+var(--space-sm))] z-40 hidden flex-col items-start gap-sm lg:flex">
      {/* Action */}
      <CustomAnimatedButton href="#projects">View my works</CustomAnimatedButton>
    </motion.div>
  );
};

export default RoleBlock;
