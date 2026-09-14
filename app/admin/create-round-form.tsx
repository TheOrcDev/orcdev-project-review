"use client";

import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/8bit/input";
import { FieldError } from "@/components/ui/field";
import { type CreateRoundState, createVotingRound } from "./actions";

const INITIAL_CREATE_ROUND_STATE: CreateRoundState = {};

function fieldErrorList(message: string | undefined) {
  return message ? [{ message }] : undefined;
}

export function CreateRoundForm() {
  const [state, formAction, isPending] = useActionState(
    createVotingRound,
    INITIAL_CREATE_ROUND_STATE
  );
  const { fieldErrors } = state;

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 border border-dashed p-4"
      noValidate
    >
      <h2 className="font-bold">Create Voting Round</h2>

      {state.error ? (
        <p className="text-destructive text-xs" role="alert">
          {state.error}
        </p>
      ) : null}

      <p aria-live="polite" className="sr-only" role="status">
        {isPending ? "Creating voting round" : ""}
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="batch">
          Batch Number (episode)
        </label>
        <Input
          aria-describedby="batch-error"
          aria-invalid={Boolean(fieldErrors?.batch)}
          id="batch"
          min={1}
          name="batch"
          placeholder="18"
          required
          type="number"
        />
        <FieldError
          className="text-xs"
          errors={fieldErrorList(fieldErrors?.batch)}
          id="batch-error"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="title">
          Title
        </label>
        <Input
          aria-describedby="title-error"
          aria-invalid={Boolean(fieldErrors?.title)}
          id="title"
          name="title"
          placeholder="Episode 18 — March 3, 2026"
          required
        />
        <FieldError
          className="text-xs"
          errors={fieldErrorList(fieldErrors?.title)}
          id="title-error"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="livestreamUrl">
          Livestream URL (optional)
        </label>
        <Input
          aria-describedby="livestreamUrl-error"
          aria-invalid={Boolean(fieldErrors?.livestreamUrl)}
          id="livestreamUrl"
          name="livestreamUrl"
          placeholder="https://youtube.com/live/..."
          type="url"
        />
        <FieldError
          className="text-xs"
          errors={fieldErrorList(fieldErrors?.livestreamUrl)}
          id="livestreamUrl-error"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs" htmlFor="durationDays">
          Voting duration (days)
        </label>
        <Input
          aria-describedby="durationDays-error"
          aria-invalid={Boolean(fieldErrors?.durationDays)}
          defaultValue="7"
          id="durationDays"
          min={1}
          name="durationDays"
          type="number"
        />
        <FieldError
          className="text-xs"
          errors={fieldErrorList(fieldErrors?.durationDays)}
          id="durationDays-error"
        />
      </div>

      <Button aria-busy={isPending} disabled={isPending} type="submit">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Round"
        )}
      </Button>
    </form>
  );
}
