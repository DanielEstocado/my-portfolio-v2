import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import logo from "@/assets/logo-mask.png";
import AboutSection from "./components/AboutSection";
import HeroPanel from "./components/HeroPanel";
import MarqueeBand from "./components/MarqueeBand";
import SidePattern from "./components/SidePattern";
import SocialProof from "./components/SocialProof";

const LOGO_COUNT = 40;
const NAME_COUNT = 14;

// The home screen: the hero between two sliding bands, then the numbers and the about section.
const HomeScreen = () => {
  useSmoothScroll();

  return (
    // isolate keeps the -z-1 wireframe lines above the page background, overflow-x-clip hides their extra width.
    <main className="relative isolate overflow-clip bg-background text-foreground">
      <div className="wireframe-column">
        {/* Hero area */}
        <div className="relative z-10">
          {/* Side pattern */}
          <SidePattern />
          {/* Logo band */}
          <MarqueeBand>
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
          <MarqueeBand reverse>
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
