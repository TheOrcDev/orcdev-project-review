"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { votingRounds } from "@/db/schema";

export async function createVotingRound(formData: FormData) {
  const batch = parseInt(formData.get("batch") as string, 10);
  const title = formData.get("title") as string;
  const livestreamUrl = (formData.get("livestreamUrl") as string) || null;
  const durationDays = parseInt(
    (formData.get("durationDays") as string) || "7",
    10
  );

  if (!batch || !title) {
    throw new Error("Batch and title are required");
  }

  const now = new Date();
  const closesAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

  await db.insert(votingRounds).values({
    batch,
    title,
    livestreamUrl,
    opensAt: now,
    closesAt,
  });

  revalidatePath("/admin");
  revalidatePath("/vote");
}
