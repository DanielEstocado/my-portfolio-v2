import { BRAND_SWATCHES, STATE_SWATCHES } from "../constant";
import SpecimenFrame from "./SpecimenFrame";
import SpecimenSection from "./SpecimenSection";

type SwatchProps = {
  name: string;
  className: string;
};

// One color chip with its token name underneath.
const Swatch = ({ name, className }: SwatchProps) => {
  return (
    <div>
      <div className={`h-14 rounded-xl ${className}`} />
      <p className="mt-xs font-mono text-caption text-muted-foreground">{name}</p>
    </div>
  );
};

// The theme's color tokens, brand and surfaces first, then the four state colors.
const ColorsSection = () => {
  return (
    <SpecimenSection
      id="colors"
      title="Colors"
      description="Every color is a token in index.css. The four state colors drive the alerts, badges, toasts and error messages further down."
    >
      <SpecimenFrame label="Brand and surfaces">
        <div className="grid grid-cols-3 gap-md sm:grid-cols-6">
          {BRAND_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </SpecimenFrame>

      <SpecimenFrame label="States">
        <div className="grid grid-cols-2 gap-md sm:grid-cols-4">
          {STATE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </SpecimenFrame>
    </SpecimenSection>
  );
};

export default ColorsSection;
