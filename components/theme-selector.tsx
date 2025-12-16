"use client";

import { useThemeConfig } from "./active-theme";
import { SelectThemeDropdown } from "./select-theme-dropdown";

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <SelectThemeDropdown
      activeTheme={activeTheme}
      setActiveTheme={setActiveTheme}
    />
  );
}
