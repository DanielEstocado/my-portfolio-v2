import { Info } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SLIDERS, TEXT_LIGHTNESS, THEMES } from "@/constants/theme";
import { useThemeTweaks } from "@/context/themeTweaksContext";
import { useDarkMode } from "@/hooks/useDarkMode";
import CustomButton from "./CustomButton";

// The theme controls: change a token and every component on the page follows live.
const CustomThemePanel = () => {
  const theme = useThemeTweaks();
  const { dark, setDark } = useDarkMode();

  if (!theme) return null;
  const { tweaks, mode, modeName, css, setTweak, setModeTweak, reset } = theme;
  const lightness = TEXT_LIGHTNESS[modeName];
  const themes: readonly { value: string; label: string }[] = THEMES[modeName];
  const hasTheme = themes.some(({ value }) => value === mode.background);

  // Copies the whole theme.css so it can be pasted over that file.
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      toast.success("Copied, paste it over src/theme.css");
    } catch (error) {
      console.warn("Clipboard is not available", error);
      toast.error("Could not copy, select the text and copy it by hand");
    }
  };

  return (
    <div className="flex flex-col gap-md">
      <p className="flex gap-2 rounded-xl bg-muted p-sm text-caption text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <span>
          This panel is a development tool. To turn it off, set{" "}
          <code className="font-mono text-foreground">enabled={"{false}"}</code> on{" "}
          <code className="font-mono text-foreground">ThemeTweaksProvider</code>{" "}
          in <code className="font-mono text-foreground">src/main.tsx</code>.
        </span>
      </p>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tweak-primary">Primary color ({modeName})</Label>
        <div className="flex items-center gap-sm">
          <input
            id="tweak-primary"
            type="color"
            value={mode.primary}
            onChange={(e) => setModeTweak("primary", e.target.value)}
            className="h-9 w-14 cursor-pointer rounded-md border border-border bg-transparent p-1"
          />
          <span className="font-mono text-caption text-muted-foreground">
            {mode.primary}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label>Text lightness ({modeName})</Label>
          <span className="font-mono text-caption text-muted-foreground">
            {mode.textL}
          </span>
        </div>
        <Slider
          min={lightness.min}
          max={lightness.max}
          step={lightness.step}
          value={[mode.textL]}
          onValueChange={([value]) => setModeTweak("textL", value)}
        />
      </div>

      {SLIDERS.map(({ key, label, min, max, step }) => (
        <div key={key} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>{label}</Label>
            <span className="font-mono text-caption text-muted-foreground">
              {tweaks[key]}
            </span>
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={[tweaks[key]]}
            onValueChange={([value]) => setTweak(key, value)}
          />
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <Label>Theme ({modeName})</Label>
        <Select
          value={mode.background}
          onValueChange={(value) => setModeTweak("background", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {!hasTheme && (
              <SelectItem value={mode.background}>Custom {mode.background}</SelectItem>
            )}
            {themes.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="tweak-dark">Dark mode</Label>
        <Switch
          id="tweak-dark"
          checked={dark}
          onCheckedChange={setDark}
        />
      </div>

      <p className="flex gap-2 rounded-xl bg-muted p-sm text-caption text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <span>
          Paste the copied CSS over the whole of{" "}
          <code className="font-mono text-foreground">src/theme.css</code> to keep what you
          tuned. The panel then starts from these values and Reset goes back to them. Everything
          else (the state colors, and the colors built from the base ones) is in{" "}
          <code className="font-mono text-foreground">src/index.css</code>.
        </span>
      </p>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tweak-css">CSS for src/theme.css</Label>
        <Textarea
          id="tweak-css"
          readOnly
          value={css}
          rows={14}
          className="font-mono text-caption"
        />
      </div>

      <div className="flex gap-sm">
        <CustomButton size="sm" onClick={handleCopy}>
          Copy CSS
        </CustomButton>
        <CustomButton size="sm" variant="ghost" onClick={reset}>
          Reset
        </CustomButton>
      </div>
    </div>
  );
};

export default CustomThemePanel;
