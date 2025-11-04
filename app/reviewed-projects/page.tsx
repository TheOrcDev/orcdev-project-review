import { Suspense } from "react";
import { ReviewedProjects } from "@/components/reviewed-projects";
import { Skeleton } from "@/components/ui/8bit/skeleton";

export default function ReviewedProjectsPage() {
  return (
    <main className="retro flex min-w-full flex-col items-center justify-center gap-5 py-12">
      <h1 className="text-center font-bold text-2xl">Reviewed Projects</h1>

      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <ReviewedProjects batch={1} />
      </Suspense>
    </main>
  );
}
