"use client";

import Image from "next/image";
import Link from "next/link";
import { useThemeConfig } from "./active-theme";
import { SelectThemeDropdown } from "./select-theme-dropdown";
import { RetroModeSwitcher } from "./ui/retro-mode-switcher";

export function Header() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-dashed bg-background/95">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center gap-1 border-r border-l border-dashed px-4 md:gap-5 md:px-6">
        <Link className="items-center gap-2" href="/">
          <Image alt="logo" height={32} src="/orcdev.png" width={32} />{" "}
        </Link>

        <div className="ml-auto flex items-center gap-5">
          <RetroModeSwitcher />

          <SelectThemeDropdown
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
          />
        </div>
      </div>
    </header>
  );
}
