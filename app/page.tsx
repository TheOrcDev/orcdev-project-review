import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { TotalProjects } from "@/components/total-projects";
import MainMenu from "@/components/ui/8bit/blocks/main-menu";

export default function Home() {
  return (
    <main className="retro flex min-w-full flex-col items-center justify-center gap-10 py-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-center text-muted-foreground text-xs">
          Total projects submitted for review so far
        </p>
        <div className="flex h-10 items-center justify-center">
          <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
            <TotalProjects />
          </Suspense>
        </div>
      </div>

      <MainMenu className="w-full max-w-sm" />
    </main>
  );
}
