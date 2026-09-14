"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/8bit/select";
import { Theme } from "@/lib/themes";

const themes = [
  { color: "#000", name: Theme.Default },
  { color: "#0055a4", name: Theme.Sega },
  { color: "#8bac0f", name: Theme.Gameboy },
  { color: "#7a4009", name: Theme.Atari },
  { color: "#104cb0", name: Theme.Nintendo },
  { color: "#F07CD4", name: Theme.Arcade },
  { color: "#dc2626", name: Theme.NeoGeo },
  { color: "#4B3F99", name: Theme.SoftPop },
  { color: "#ffcc00", name: Theme.Pacman },
  { color: "#8B5CF6", name: Theme.VHS },
  { color: "#8B5A2B", name: Theme.Cassette },
  { color: "#d2691e", name: Theme.RustyByte },
  { color: "oklch(0.75 0.2 90)", name: Theme.Zelda },
  { color: "#c87533", name: Theme.DungeonTorch },
  { color: "#2196f3", name: Theme.SpaceStation },
  { color: "#4caf50", name: Theme.PixelForest },
  { color: "#81d4fa", name: Theme.IceCavern },
  { color: "#e64a19", name: Theme.LavaCore },
  { color: "#00ffcc", name: Theme.GlitchMode },
  { color: "#c8a600", name: Theme.DwarvenVault },
  { color: "#c62828", name: Theme.DragonHoard },
  { color: "#009688", name: Theme.AncientRunes },
];

function formatThemeLabel(name: string) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function SelectThemeDropdown({
  activeTheme,
  setActiveTheme,
}: {
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
}) {
  return (
    <Select
      onValueChange={(val) => setActiveTheme(val as Theme)}
      value={activeTheme}
    >
      <SelectTrigger className="w-full min-w-0 max-w-full">
        <SelectValue font="retro" placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme.name} value={theme.name}>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-sm border border-foreground"
                style={{ backgroundColor: theme.color }}
              />
              <span>{formatThemeLabel(theme.name)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
