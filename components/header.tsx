import { Suspense } from "react";
import { RecordBadge } from "./record-badge";
import { ThemeSelector } from "./theme-selector";
import { RetroModeSwitcher } from "./ui/retro-mode-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 min-w-0 shrink-0 items-center gap-2 border-b border-dashed bg-background/95">
      <div className="mx-auto flex h-full w-full min-w-0 max-w-[1400px] items-center gap-1 border-r border-l border-dashed px-3 md:gap-5 md:px-6">
        <div className="flex h-10 shrink-0 items-center justify-center gap-2 md:gap-3">
          <Suspense fallback={null}>
            <RecordBadge />
          </Suspense>
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-1.5 md:gap-5">
          <RetroModeSwitcher />

          <div className="min-w-0 max-w-[8.5rem] sm:max-w-[11rem] md:max-w-[14rem]">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
