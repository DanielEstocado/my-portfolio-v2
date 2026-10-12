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
