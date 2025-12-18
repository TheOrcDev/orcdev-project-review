import Link from "next/link";
import { Suspense } from "react";
import { ReviewedProjects } from "@/components/reviewed-projects";
import { SearchReviewedProjects } from "@/components/search-reviewed-projects";
import { Button } from "@/components/ui/8bit/button";
import { Skeleton } from "@/components/ui/8bit/skeleton";

export default async function ReviewedProjectsPage() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-5 py-12">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>

        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <SearchReviewedProjects />
        </Suspense>
      </div>
      <h1 className="text-center font-bold text-2xl">Reviewed Projects</h1>

      <Suspense
        fallback={
          <div className="mt-2 flex w-full flex-col gap-10">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        }
      >
        <div className="flex flex-col gap-10">
          <ReviewedProjects />
        </div>
      </Suspense>
    </main>
  );
}
