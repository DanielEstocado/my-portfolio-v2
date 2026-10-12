import DialogsFrame from "./DialogsFrame";
import MenusFrame from "./MenusFrame";
import SpecimenSection from "./SpecimenSection";

// Everything that opens on top of the page, split into the things that ask for attention and the small menus.
const OverlaysSection = () => {
  return (
    <SpecimenSection
      id="overlays"
      title="Overlays"
      description="Dialogs, menus and toasts. Open each one to see it. The responsive modal is a dialog on desktop and a bottom drawer on phones."
    >
      <DialogsFrame />
      <MenusFrame />
    </SpecimenSection>
  );
};

export default OverlaysSection;
