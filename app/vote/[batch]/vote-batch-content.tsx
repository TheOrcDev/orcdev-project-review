import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Button } from "@/components/ui/8bit/button";
import { db } from "@/db/drizzle";
import { accounts, reviewedProjects, votes, votingRounds } from "@/db/schema";
import { auth } from "@/lib/auth";
import { VoteClient } from "./vote-client";

const ADMIN_GITHUB_ID = "7549148"; // TheOrcDev

async function getRoundData(batch: number) {
  const [round] = await db
    .select()
    .from(votingRounds)
    .where(eq(votingRounds.batch, batch))
    .limit(1);

  if (!round) {
    return null;
  }

  const projects = await db
    .select()
    .from(reviewedProjects)
    .where(eq(reviewedProjects.batch, batch));

  const allVotes = await db
    .select()
    .from(votes)
    .where(eq(votes.roundId, round.id));

  const voteCounts = new Map<string, number>();
  for (const vote of allVotes) {
    voteCounts.set(vote.projectId, (voteCounts.get(vote.projectId) ?? 0) + 1);
  }

  const now = new Date();
  const isOpen = now >= round.opensAt && now <= round.closesAt;
  const isClosed = now > round.closesAt;
  const isUpcoming = now < round.opensAt;

  return {
    round,
    projects: projects.map((p) => ({
      ...p,
      voteCount: voteCounts.get(p.id) ?? 0,
    })),
    isOpen,
    isClosed,
    isUpcoming,
    totalVotes: allVotes.length,
  };
}

export async function VoteBatchContent({ batch: batchStr }: { batch: string }) {
  await connection();
  const batch = Number.parseInt(batchStr, 10);
  if (Number.isNaN(batch)) {
    notFound();
  }

  const data = await getRoundData(batch);
  if (!data) {
    notFound();
  }

  const { round, projects, isOpen, isClosed, totalVotes } = data;

  // Check if current user already voted in this round + admin check
  let existingVoteProjectId: string | null = null;
  let isAdmin = false;
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    const [existingVote] = await db
      .select()
      .from(votes)
      .where(
        and(eq(votes.roundId, round.id), eq(votes.userId, session.user.id))
      )
      .limit(1);
    if (existingVote) {
      existingVoteProjectId = existingVote.projectId;
    }

    // Check if admin
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
    isAdmin = account?.accountId === ADMIN_GITHUB_ID;
  }

  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-6 py-12">
      <Link href="/">
        <Button variant="outline">Back</Button>
      </Link>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-2xl">{round.title}</h1>
        {round.livestreamUrl && (
          <a
            className="mt-2 inline-block text-primary text-sm underline"
            href={round.livestreamUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Watch the livestream
          </a>
        )}
        <p className="mt-2 text-muted-foreground text-xs">
          {isOpen && "Voting is open!"}
          {isClosed &&
            round.winnerId &&
            `Voting closed — ${totalVotes} total votes`}
          {isClosed &&
            !round.winnerId &&
            "Voting closed — results coming soon!"}
          {data.isUpcoming && "Voting opens soon"}
        </p>
      </div>

      <VoteClient
        existingVoteProjectId={existingVoteProjectId}
        isAdmin={isAdmin}
        isClosed={isClosed}
        isOpen={isOpen}
        projects={projects}
        roundId={round.id}
        winnerId={round.winnerId}
      />
    </main>
  );
}
