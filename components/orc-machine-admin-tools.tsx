"use client";

import Link from "next/link";
import { useState } from "react";
import { PickProject } from "@/components/pick-project";
import { RandomNumber } from "@/components/random-number";
import { Button } from "@/components/ui/8bit/button";
import { Switch } from "@/components/ui/8bit/switch";

export function OrcMachineAdminTools() {
  const [showArchiveAction, setShowArchiveAction] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>

        <Switch
          aria-label="Show archive button"
          checked={showArchiveAction}
          onCheckedChange={setShowArchiveAction}
          size="sm"
        />
      </div>

      <PickProject showReviewArchiveAction={showArchiveAction} />
      <RandomNumber />
    </>
  );
}
