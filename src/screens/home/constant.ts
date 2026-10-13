import type { Variants } from "framer-motion";
import {
  Briefcase,
  Cake,
  CalendarDays,
  Church,
  Mail,
  MapPin,
  Mars,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { TerminalCommand, TerminalFile } from "@/types/terminal";

// The numbers that back up the work, shown as social proof on the home screen.
export const SOCIAL_PROOF = [
  {
    value: "1½+",
    label: "years of experience working professionally within the industry.",
  },
  { value: "6+", label: "clients and businesses I've worked with" },
  { value: "16+", label: "mobile and web projects for clients and businesses" },
];

type AboutItem = {
  label: string;
  // A null value is worked out when it is shown, the age comes from the birthdate.
  value: string | null;
  href?: string;
  // A link placed after the value, for a name inside a sentence.
  link?: { text: string; href: string };
  icon: LucideIcon;
};

export const BIRTHDATE = "2003-04-20";

// The personal details in the about section, each with its own icon.
export const ABOUT_ITEMS: AboutItem[] = [
  {
    label: "Status",
    value: "Working at",
    link: { text: "Jayreh I.T. Solutions", href: "#" },
    icon: Briefcase,
  },
  { label: "Location", value: "Cavite, Philippines", icon: MapPin },
  {
    label: "Contact",
    value: "+63 915 644 4230",
    href: "tel:+639156444230",
    icon: Phone,
  },
  {
    label: "Email",
    value: "estocado.daniel143@gmail.com",
    href: "mailto:estocado.daniel143@gmail.com",
    icon: Mail,
  },
  { label: "Birthdate", value: "April 20, 2003", icon: Cake },
  { label: "Age", value: null, icon: CalendarDays },
  { label: "Sex", value: "Male", icon: Mars },
  { label: "Religion", value: "Christian", icon: Church },
];

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

// The hero's entrance, every piece starts hidden and the hero section turns them all on together, each with its own delay.
export const HERO_NAME_LINE: Variants = {
  hidden: { y: "60%", opacity: 0 },
  visible: (line: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: REVEAL_EASE, delay: 0.1 + line * 0.12 },
  }),
};

export const HERO_FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: REVEAL_EASE, delay: 0.15 },
  },
};

export const HERO_BLOCK: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: REVEAL_EASE, delay: 0.15 },
  },
};

export const HERO_POP: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 18, delay: 0.1 },
  },
};

export const HERO_FADE_UP: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: REVEAL_EASE, delay: 0.1 },
  },
};

// The GitHub profile whose contributions the contributions cell shows.
export const GITHUB_USERNAME = "DanielEstocado";

// The song in the now playing cell. youtubeId is the part after v= in a YouTube link, the title and artist come from the video itself once it loads, these two only show until then.
export const NOW_PLAYING = {
  youtubeId: "dQw4w9WgXcQ",
  title: "Never Gonna Give You Up",
  artist: "Rick Astley",
};

// The heights of the bars in the song progress, a steady made up wave so every visit looks the same.
export const WAVEFORM = Array.from({ length: 48 }, (_, index) =>
  Math.round((0.3 + 0.7 * Math.abs(Math.sin(index * 1.7) * Math.cos(index * 0.55))) * 100),
);

export const TERMINAL_PROMPT = "C:\\Users\\Daniel>";

export const TERMINAL_WELCOME = [
  "Daniel OS [Version 1.0.0]",
  "(c) Daniel Estocado. All rights reserved.",
  "",
  "Type HELP to list the commands.",
];

export const TERMINAL_FILES: TerminalFile[] = [
  {
    name: "about.txt",
    content: [
      "Daniel Estocado, web and app developer and programmer from Cavite, Philippines.",
      "I bash my keyboard with my head until I make something.",
    ],
  },
  {
    name: "skills.txt",
    content: ["- Web Developer", "- Android Developer", "- Programmer", "- Artist"],
  },
  { name: "contact.txt", content: ["estocado.daniel143@gmail.com"] },
  {
    name: "secrets.txt",
    content: ["Nothing to see here.", "Okay, one secret: most bugs are just features with bad timing."],
  },
];

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    name: "ver",
    description: "Shows the version.",
    output: ["Daniel OS [Version 1.0.0]"],
  },
  {
    name: "whoami",
    description: "Shows who is here.",
    output: ["Daniel Estocado, web and app developer and programmer."],
  },
  {
    name: "hostname",
    description: "Shows the machine name.",
    output: ["daniel-portfolio"],
  },
  {
    name: "ping",
    description: "Checks that someone is home.",
    output: [
      "Pinging daniel-portfolio with 32 bytes of data:",
      "Reply from daniel-portfolio: bytes=32 time<1ms",
      "Reply from daniel-portfolio: bytes=32 time<1ms",
      "Packets: sent 2, received 2, lost 0 (0% loss).",
    ],
  },
  {
    name: "coffee",
    description: "Checks the fuel.",
    output: ["Brewing...", "Error: 0 cups left, compiling on determination instead."],
  },
  {
    name: "hire",
    description: "Starts a conversation.",
    output: ["Access granted.", "Send the offer to estocado.daniel143@gmail.com"],
  },
  {
    name: "exit",
    description: "Tries to leave.",
    output: ["Nice try. The window stays open, type CLS to tidy up."],
  },
];
