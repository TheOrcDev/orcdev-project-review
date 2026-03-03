import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { db } from "@/db/drizzle";
import { reviewedProjects, votingRounds, votes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/8bit/button";
import { VoteClient } from "./vote-client";

async function getRoundData(batch: number) {
  const [round] = await db
    .select()
    .from(votingRounds)
    .where(eq(votingRounds.batch, batch))
    .limit(1);

  if (!round) return null;

  const projects = await db
    .select()
    .from(reviewedProjects)
    .where(eq(reviewedProjects.batch, batch));

  // Get vote counts per project
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

export default async function VotePage({
  params,
}: {
  params: Promise<{ batch: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    const { batch: batchStr } = await params;
    redirect(`/api/auth/signin/social?provider=github&callbackURL=/vote/${batchStr}`);
  }

  const { batch: batchStr } = await params;
  const batch = parseInt(batchStr, 10);

  if (isNaN(batch)) notFound();

  const data = await getRoundData(batch);
  if (!data) notFound();

  const { round, projects, isOpen, isClosed, totalVotes } = data;

  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-6 py-12">
      <Link href="/">
        <Button variant="outline">Back</Button>
      </Link>

      <div className="text-center">
        <h1 className="font-bold text-2xl">{round.title}</h1>
        {round.livestreamUrl && (
          <a
            className="mt-2 inline-block text-primary text-sm underline"
            href={round.livestreamUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Watch the livestream →
          </a>
        )}
        <p className="mt-2 text-muted-foreground text-xs">
          {isOpen && "🟢 Voting is open!"}
          {isClosed && `🔒 Voting closed — ${totalVotes} total votes`}
          {data.isUpcoming && "⏳ Voting opens soon"}
        </p>
      </div>

      <VoteClient
        isClosed={isClosed}
        isOpen={isOpen}
        projects={projects}
        roundId={round.id}
      />
    </main>
  );
}
