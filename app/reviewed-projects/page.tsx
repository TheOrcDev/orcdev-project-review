import Link from "next/link";
import { Suspense } from "react";
import { ReviewedProjects } from "@/components/reviewed-projects";
import { Button } from "@/components/ui/8bit/button";
import { Skeleton } from "@/components/ui/8bit/skeleton";

export default async function ReviewedProjectsPage() {
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
        <div className="flex flex-col gap-10">
          <ReviewedProjects
            batch={6}
            date="9th December 2025"
            livestreamUrl="https://www.youtube.com/live/m-pT1Jl2568"
          />
          <ReviewedProjects
            batch={5}
            date="2nd December 2025"
            livestreamUrl="https://www.youtube.com/live/Q1JyVbDoQSM"
          />
          <ReviewedProjects
            batch={4}
            date="26th November 2025"
            livestreamUrl="https://www.youtube.com/live/w4AUms5wNpY"
          />
          <ReviewedProjects
            batch={3}
            date="20th November 2025"
            livestreamUrl="https://www.youtube.com/live/qpWkvlYjqvE"
          />{" "}
          <ReviewedProjects
            batch={2}
            date="11th November 2025"
            livestreamUrl="https://www.youtube.com/watch?v=EG45hfpIAoc"
          />
          <ReviewedProjects
            batch={1}
            date="4th November 2025"
            livestreamUrl="https://www.youtube.com/watch?v=oaD2svrWWnU"
          />
        </div>
      </Suspense>
    </main>
  );
}
