import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { accounts, votes, votingRounds } from "@/db/schema";
import { auth } from "@/lib/auth";

const ADMIN_GITHUB_ID = "7549148"; // TheOrcDev

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Check if user is admin via GitHub account ID
  const [account] = await db
    .select()
    .from(accounts)
    .where(
      and(
        eq(accounts.userId, session.user.id),
        eq(accounts.providerId, "github")
      )
    )
    .limit(1);

  if (!account || account.accountId !== ADMIN_GITHUB_ID) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { roundId } = await req.json();

  // Get the round
  const [round] = await db
    .select()
    .from(votingRounds)
    .where(eq(votingRounds.id, roundId))
    .limit(1);

  if (!round) {
    return NextResponse.json({ error: "Round not found" }, { status: 404 });
  }

  if (round.winnerId) {
    return NextResponse.json({ error: "Winner already announced", winnerId: round.winnerId }, { status: 400 });
  }

  // Count votes per project
  const allVotes = await db
    .select()
    .from(votes)
    .where(eq(votes.roundId, roundId));

  const voteCounts = new Map<string, number>();
  for (const vote of allVotes) {
    voteCounts.set(vote.projectId, (voteCounts.get(vote.projectId) ?? 0) + 1);
  }

  // Find the winner (most votes)
  let winnerId = "";
  let maxVotes = 0;
  for (const [projectId, count] of voteCounts) {
    if (count > maxVotes) {
      maxVotes = count;
      winnerId = projectId;
    }
  }

  if (!winnerId) {
    return NextResponse.json({ error: "No votes cast" }, { status: 400 });
  }

  // Update round with winner
  await db
    .update(votingRounds)
    .set({ winnerId })
    .where(eq(votingRounds.id, roundId));

  return NextResponse.json({ winnerId, votes: maxVotes });
}
