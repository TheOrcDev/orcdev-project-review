"use client";

import Link from "next/link";
import { useState } from "react";
import { PickProject } from "@/components/pick-project";
import { RandomNumber } from "@/components/random-number";
import { Button } from "@/components/ui/8bit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/8bit/dropdown-menu";
import { Switch } from "@/components/ui/8bit/switch";

export function OrcMachineAdminTools() {
  const [showArchiveAction, setShowArchiveAction] = useState(false);
  const [showRandomNumber, setShowRandomNumber] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Admin Tools</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center justify-between gap-4"
              onSelect={(event) => event.preventDefault()}
            >
              <span className="text-xs">Archive stream projects</span>
              <Switch
                aria-label="Show archive stream projects"
                checked={showArchiveAction}
                onCheckedChange={setShowArchiveAction}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between gap-4"
              onSelect={(event) => event.preventDefault()}
            >
              <span className="text-xs">Random number generator</span>
              <Switch
                aria-label="Show random number generator"
                checked={showRandomNumber}
                onCheckedChange={setShowRandomNumber}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <PickProject showReviewArchiveAction={showArchiveAction} />
      {showRandomNumber ? <RandomNumber /> : null}
    </>
  );
}
