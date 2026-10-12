import logo from "@/assets/logo.svg";
import AboutSection from "./components/AboutSection";
import HeroPanel from "./components/HeroPanel";
import MarqueeBand from "./components/MarqueeBand";
import SidePattern from "./components/SidePattern";
import SocialProof from "./components/SocialProof";

const LOGO_COUNT = 40;
const NAME_COUNT = 14;

// The home screen: the hero between two sliding bands, then the numbers and the about section.
const HomeScreen = () => {
  return (
    // isolate keeps the -z-1 wireframe lines above the page background, overflow-x-clip hides their extra width.
    <main className="relative isolate overflow-clip bg-background text-foreground">
      {/* Edge strips */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-9 bg-primary"
      />
      <div className="wireframe-column">
        {/* Hero area, clipped at its bottom so the tilted band cannot spill into the next section */}
        <div className="relative z-10 [clip-path:inset(0_-100vw_0_-100vw)]">
          {/* Side pattern */}
          <SidePattern />
          {/* Bottom strip */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 z-40 h-5 w-screen -translate-x-1/2 bg-primary"
          />
          {/* Logo band */}
          <MarqueeBand edge="top">
            {Array.from({ length: LOGO_COUNT }, (_, i) => (
              <span key={i} className="flex shrink-0 items-center">
                <span
                  style={{ maskImage: `url(${logo})` }}
                  className="size-6 bg-background mask-center mask-no-repeat mask-contain"
                />
                <span className="mx-md">·</span>
              </span>
            ))}
          </MarqueeBand>
          <HeroPanel />
          {/* Name band */}
          <MarqueeBand edge="bottom" reverse>
            {Array.from({ length: NAME_COUNT }, (_, i) => (
              <span
                key={i}
                className="title shrink-0 text-body font-extrabold tracking-wide whitespace-nowrap uppercase"
              >
                Daniel Estocado<span className="mx-md">·</span>
              </span>
            ))}
          </MarqueeBand>
        </div>
        {/* Stripes */}
        <div className="stripe-divider" />
        {/* Social proof */}
        <SocialProof />
        {/* Stripes */}
        <div className="stripe-divider" />
        {/* About */}
        <AboutSection />
      </div>
    </main>
  );
};

export default HomeScreen;
