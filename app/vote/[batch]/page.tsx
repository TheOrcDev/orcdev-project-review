import { Suspense } from "react";
import { Skeleton } from "@/components/ui/8bit/skeleton";
import { VoteBatchContent } from "./vote-batch-content";

export async function generateStaticParams() {
  // Return a dummy param to satisfy cacheComponents validation
  // Real batches are resolved at request time
  return [{ batch: "0" }];
}

export default async function VotePage({
  params,
}: {
  params: Promise<{ batch: string }>;
}) {
  const { batch } = await params;

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
      <VoteBatchContent batch={batch} />
    </Suspense>
  );
}
