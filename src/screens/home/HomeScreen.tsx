import logo from "@/assets/logo.svg";
import HeroPanel from "./components/HeroPanel";
import MarqueeBand from "./components/MarqueeBand";
import SidePattern from "./components/SidePattern";

const LOGO_COUNT = 40;
const NAME_COUNT = 14;

// The home screen: the hero between two sliding bands.
const HomeScreen = () => {
  return (
    // isolate keeps the -z-1 wireframe lines above the page background, overflow-x-clip hides their extra width.
    <main className="relative isolate overflow-clip bg-background text-foreground">
      {/* Side pattern */}
      <SidePattern />
      {/* Edge strips */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-40 h-5 bg-primary" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-40 h-5 bg-primary" />
      <div className="wireframe-column">
        {/* Logo band */}
        <MarqueeBand edge="top">
          {Array.from({ length: LOGO_COUNT }, (_, i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span
                style={{ maskImage: `url(${logo})` }}
                className="size-6 bg-background [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              />
              <span className="mx-md">·</span>
            </span>
          ))}
        </MarqueeBand>
        <HeroPanel />
        {/* Name band */}
        <MarqueeBand edge="bottom" reverse>
          {Array.from({ length: NAME_COUNT }, (_, i) => (
            <span key={i} className="title shrink-0 text-body font-extrabold tracking-wide whitespace-nowrap uppercase">
              Daniel Estocado<span className="mx-md">·</span>
            </span>
          ))}
        </MarqueeBand>
      </div>
    </main>
  );
};

export default HomeScreen;
