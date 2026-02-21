import { Suspense } from "react";
import { RecordBadge } from "./record-badge";
import { ThemeSelector } from "./theme-selector";
import { Badge } from "./ui/8bit/badge";
import { RetroModeSwitcher } from "./ui/retro-mode-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-dashed bg-background/95">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center gap-1 border-r border-l border-dashed px-4 md:gap-5 md:px-6">
        <div className="flex h-10 items-center justify-center gap-3">
          <Badge className="min-size-10 h-[42px] w-full min-w-[42px] font-bold text-2xl">
            <Suspense fallback={null}>
              <RecordBadge />
            </Suspense>
          </Badge>
        </div>

        <div className="ml-auto flex items-center gap-5">
          <RetroModeSwitcher />

          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
