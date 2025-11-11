import Link from "next/link";
import { Suspense } from "react";
import { ReviewedProjects } from "@/components/reviewed-projects";
import { Button } from "@/components/ui/8bit/button";
import { Skeleton } from "@/components/ui/8bit/skeleton";

export default function ReviewedProjectsPage() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-5 py-12">
      <Link href="/">
        <Button variant="outline">Back</Button>
      </Link>
      <h1 className="text-center font-bold text-2xl">Reviewed Projects</h1>

      <Suspense
        fallback={
          <div className="mt-2 flex w-full flex-col gap-10">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        }
      >
        <ReviewedProjects
          batch={1}
          livestreamUrl="https://www.youtube.com/watch?v=oaD2svrWWnU"
        />
        <ReviewedProjects
          batch={2}
          livestreamUrl="https://www.youtube.com/watch?v=EG45hfpIAoc"
        />
      </Suspense>
    </main>
  );
}
