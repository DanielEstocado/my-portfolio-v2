import { type IconType } from "react-icons";
import { FaFacebook, FaFacebookMessenger, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiDailydotdev } from "react-icons/si";
import { MotionConfig, motion } from "framer-motion";
import { CustomIconButton } from "@/components";
import { useIsDesktop } from "@/hooks/useIsDesktop";

type Social = {
  label: string;
  description: string;
  Icon: IconType;
};

const SOCIALS: Social[] = [
  { label: "Facebook", description: "Find me on Facebook", Icon: FaFacebook },
  { label: "Messenger", description: "Send me a message", Icon: FaFacebookMessenger },
  { label: "GitHub", description: "Browse my code and projects", Icon: FaGithub },
  { label: "LinkedIn", description: "Connect with me", Icon: FaLinkedin },
  { label: "daily.dev", description: "Follow me on daily.dev", Icon: SiDailydotdev },
  { label: "Email", description: "Write me an email", Icon: MdEmail },
];

const SPRING = { type: "spring", stiffness: 380, damping: 18 } as const;

// A pill of social icons that spring in one after another, a full-height rail with a hairline on the right on desktop and a centred row along the bottom on small screens.
const SocialIcons = () => {
  const isDesktop = useIsDesktop();

  return (
    <MotionConfig reducedMotion="user">
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.09 } },
        }}
        className="absolute bottom-[calc(var(--space-md)+1.25rem)] left-1/2 z-40 flex -translate-x-1/2 gap-xs rounded-full bg-background/80 p-xs backdrop-blur lg:inset-y-0 lg:bottom-0 lg:left-0 lg:translate-x-0 lg:flex-col lg:justify-start lg:rounded-none lg:border-r lg:bg-transparent lg:px-xs lg:pt-[calc(var(--space-md)+0.55rem)] lg:pb-0 lg:backdrop-blur-none"
      >
        {SOCIALS.map(({ label, description, Icon }) => (
          <motion.li
            key={label}
            variants={{
              hidden: { opacity: 0, scale: 0.4, x: isDesktop ? -20 : 0, y: isDesktop ? 0 : 20 },
              visible: { opacity: 1, scale: 1, x: 0, y: 0, transition: SPRING },
            }}
            whileHover={{ scale: 1.18, rotate: 8, x: isDesktop ? 4 : 0, y: isDesktop ? 0 : -4 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING}
          >
            <CustomIconButton
              label={label}
              description={description}
              size="lg"
              side={isDesktop ? "right" : "top"}
              className="size-[calc(2.75rem*var(--type-scale))] text-primary transition-colors duration-200 hover:bg-primary hover:text-background dark:hover:bg-primary"
            >
              <Icon className="size-[calc(1.5rem*var(--type-scale))]" />
            </CustomIconButton>
          </motion.li>
        ))}
      </motion.ul>
    </MotionConfig>
  );
};

export default SocialIcons;
