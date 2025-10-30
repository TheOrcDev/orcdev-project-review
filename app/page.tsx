import MainMenu from "@/components/ui/8bit/blocks/main-menu";
import { getProjectCount } from "@/server/projects";

export default async function Home() {
  const totalProjects = await getProjectCount();

  return (
    <main className="retro flex min-w-full flex-col items-center justify-center gap-5 py-12">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-center text-muted-foreground text-xs">
          Total projects submitted for review so far
        </p>
        <p className="font-bold text-2xl">{totalProjects}</p>
      </div>

      <MainMenu className="w-full max-w-sm" />
    </main>
  );
}
