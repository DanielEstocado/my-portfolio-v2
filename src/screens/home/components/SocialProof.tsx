import { SOCIAL_PROOF } from "../constant";

// Three numbers that back up the work, in a row of columns split by dashed lines.
const SocialProof = () => {
  return (
    <section aria-label="Experience" className="screen-line-top screen-line-bottom">
      {/* Stats */}
      <ul className="grid grid-cols-1 divide-y divide-dashed divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {SOCIAL_PROOF.map((stat) => (
          <li key={stat.label} className="flex flex-col gap-xs p-md py-lg">
            <span className="title text-display leading-none font-extrabold text-foreground">{stat.value}</span>
            <span className="subtitle text-body text-muted-foreground">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SocialProof;
