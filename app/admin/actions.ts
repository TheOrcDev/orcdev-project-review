"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { votingRounds } from "@/db/schema";

const MIN_BATCH = 1;
const MIN_DURATION_DAYS = 1;
const DEFAULT_DURATION_DAYS = 7;
const URL_PROTOCOL_REGEX = /^https?:\/\//i;

export type CreateRoundField =
  | "batch"
  | "durationDays"
  | "livestreamUrl"
  | "title";

export interface CreateRoundState {
  error?: string;
  fieldErrors?: Partial<Record<CreateRoundField, string>>;
}

function readField(formData: FormData, name: CreateRoundField): string {
  return String(formData.get(name) ?? "").trim();
}

function parsePositiveInt(value: string): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < MIN_BATCH) {
    return null;
  }

  return parsed;
}

function parseLivestreamUrl(value: string): string | null {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(
      URL_PROTOCOL_REGEX.test(value) ? value : `https://${value}`
    );
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export async function createVotingRound(
  _previousState: CreateRoundState,
  formData: FormData
): Promise<CreateRoundState> {
  const batchRaw = readField(formData, "batch");
  const title = readField(formData, "title");
  const livestreamUrlRaw = readField(formData, "livestreamUrl");
  const durationDaysRaw = readField(formData, "durationDays");

  const fieldErrors: NonNullable<CreateRoundState["fieldErrors"]> = {};

  const batch = parsePositiveInt(batchRaw);
  if (batch === null) {
    fieldErrors.batch = "Enter a valid batch number.";
  }

  if (!title) {
    fieldErrors.title = "Title is required.";
  }

  const livestreamUrl = livestreamUrlRaw
    ? parseLivestreamUrl(livestreamUrlRaw)
    : null;
  if (livestreamUrlRaw && livestreamUrl === null) {
    fieldErrors.livestreamUrl = "Enter a valid livestream URL.";
  }

  const durationDays =
    parsePositiveInt(durationDaysRaw || String(DEFAULT_DURATION_DAYS)) ?? null;
  if (durationDays === null || durationDays < MIN_DURATION_DAYS) {
    fieldErrors.durationDays = "Duration must be at least 1 day.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      error: "Fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const now = new Date();
  const closesAt = new Date(
    now.getTime() +
      (durationDays ?? DEFAULT_DURATION_DAYS) * 24 * 60 * 60 * 1000
  );

  try {
    await db.insert(votingRounds).values({
      batch: batch ?? MIN_BATCH,
      closesAt,
      livestreamUrl,
      opensAt: now,
      title,
    });
  } catch {
    return {
      error: "Could not create the voting round. Try again.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/vote");
  return {};
}
