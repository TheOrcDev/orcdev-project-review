"use client";

import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/8bit/input";
import { createVotingRound } from "./actions";

export function CreateRoundForm() {
  return (
    <form
      action={createVotingRound}
      className="flex flex-col gap-4 border border-dashed p-4"
    >
      <h2 className="font-bold">Create Voting Round</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="batch">
          Batch Number (episode)
        </label>
        <Input id="batch" name="batch" placeholder="18" required type="number" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="Episode 18 — March 3, 2026"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="livestreamUrl">
          Livestream URL (optional)
        </label>
        <Input
          id="livestreamUrl"
          name="livestreamUrl"
          placeholder="https://youtube.com/live/..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="durationDays">
          Voting duration (days)
        </label>
        <Input
          defaultValue="7"
          id="durationDays"
          name="durationDays"
          type="number"
        />
      </div>

      <Button type="submit">Create Round</Button>
    </form>
  );
}
