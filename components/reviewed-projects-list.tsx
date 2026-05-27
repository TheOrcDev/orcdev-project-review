"use client";

import { useState } from "react";
import type { SelectReviewedProject } from "@/db/schema";
import { ReviewedBatch } from "./reviewed-batch";
import { Button } from "./ui/8bit/button";

const INITIAL_VISIBLE_EPISODES = 5;

export function ReviewedProjectsList({
  batches,
  projectsByBatch,
}: {
  batches: number[];
  projectsByBatch: Record<number, SelectReviewedProject[]>;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleBatches = showAll
    ? batches
    : batches.slice(0, INITIAL_VISIBLE_EPISODES);
  const hasMore = batches.length > INITIAL_VISIBLE_EPISODES && !showAll;

  return (
    <>
      {visibleBatches.map((batch) => (
        <ReviewedBatch
          batch={batch}
          key={batch}
          projects={projectsByBatch[batch] ?? []}
        />
      ))}

      {hasMore ? (
        <Button
          className="self-center"
          onClick={() => setShowAll(true)}
          variant="outline"
        >
          Open more
        </Button>
      ) : null}
    </>
  );
}
