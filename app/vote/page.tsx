import { Suspense } from "react";
import { Skeleton } from "@/components/ui/8bit/skeleton";
import { VoteIndexContent } from "./vote-index-content";

export default function VoteIndexPage() {
  return (
    <Suspense
      fallback={
        <main className="retro mx-auto flex max-w-2xl flex-col gap-6 py-12">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="h-40 w-full" />
        </main>
      }
    >
      <VoteIndexContent />
    </Suspense>
  );
}
