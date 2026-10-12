import { useNavigate } from "react-router-dom";
import { CustomPageHeader } from "@/components";
import ButtonsSection from "./components/ButtonsSection";
import ColorsSection from "./components/ColorsSection";
import FeedbackSection from "./components/FeedbackSection";
import FormSection from "./components/FormSection";
import HeroSection from "./components/HeroSection";
import ListDemo from "./components/ListDemo";
import LoadersSection from "./components/LoadersSection";
import OverlaysSection from "./components/OverlaysSection";
import ShowcaseIntro from "./components/ShowcaseIntro";

// The template's own landing screen: a full-height hero, then the component library underneath.
const ShowcaseScreen = () => {
  const navigate = useNavigate();

  // Sends the user to the About screen, which documents this template's own structure.
  const handleNavigateToAbout = () => {
    navigate("/system/about");
  };

  // Glides down to the component library below the hero.
  const handleScrollToComponents = () => {
    document.getElementById("components")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomPageHeader />

      <HeroSection
        onAbout={handleNavigateToAbout}
        onExplore={handleScrollToComponents}
      />

      <div id="components" className="page-container scroll-mt-20 pb-xl">
        <ShowcaseIntro />
        <ColorsSection />
        <ListDemo />
        <ButtonsSection />
        <FormSection />
        <OverlaysSection />
        <LoadersSection />
        <FeedbackSection />
      </div>
    </main>
  );
};

export default ShowcaseScreen;
