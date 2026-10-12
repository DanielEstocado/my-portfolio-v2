import { type MouseEvent } from "react";
import { calculateAge } from "@/lib/calculateAge";
import { ABOUT_ITEMS, BIRTHDATE } from "../constant";

const LINK_CLASS =
  "underline underline-offset-4 transition-opacity hover:opacity-70";

// Keeps a placeholder link from jumping to the top of the page, until it has a real address.
const handlePlaceholderClick = (event: MouseEvent<HTMLAnchorElement>) => {
  if (event.currentTarget.getAttribute("href") === "#") {
    event.preventDefault();
  }
};

// The about section: a title beside a two column list of personal details, each one a small icon tile and a line of mono text.
const AboutSection = () => {
  const age = `${calculateAge(BIRTHDATE)} years old`;

  return (
    <section
      aria-label="About"
      className="screen-line-top screen-line-bottom grid lg:grid-cols-[1fr_2fr]"
    >
      {/* Title */}
      <h2 className="title text-h1 p-md leading-none font-extrabold lg:border-r lg:border-dashed lg:border-border">
        About me
      </h2>
      {/* Details */}
      <ul className="relative grid gap-x-[var(--space-lg)] gap-y-[var(--space-md)] p-md py-lg sm:grid-cols-2 sm:before:absolute sm:before:inset-y-0 sm:before:left-1/2 sm:before:border-l sm:before:border-dashed sm:before:border-border">
        {ABOUT_ITEMS.map(({ label, value, href, link, icon: Icon }) => {
          const text = value ?? age;

          return (
            <li key={label} className="flex items-center gap-sm">
              {/* Icon */}
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-muted text-muted-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              {/* Text */}
              <span className="font-mono text-body font-medium break-words">
                <span className="sr-only">{label}: </span>
                {href ? (
                  <a href={href} className={LINK_CLASS}>
                    {text}
                  </a>
                ) : (
                  text
                )}
                {link && (
                  <>
                    {" "}
                    <a
                      href={link.href}
                      onClick={handlePlaceholderClick}
                      className={LINK_CLASS}
                    >
                      {link.text}
                    </a>
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AboutSection;
