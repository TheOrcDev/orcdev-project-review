import { desc } from "drizzle-orm";
import Link from "next/link";
import { connection } from "next/server";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { db } from "@/db/drizzle";
import { votingRounds } from "@/db/schema";

export async function VoteIndexContent() {
  await connection();
  const rounds = await db
    .select()
    .from(votingRounds)
    .orderBy(desc(votingRounds.batch))
    .limit(20);

  const now = new Date();

  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-6 py-12">
      <Link href="/">
        <Button variant="outline">Back</Button>
      </Link>

      <div className="flex flex-col items-center gap-2">
        <Badge className="bg-yellow-500 text-black">BETA</Badge>
        <h1 className="text-center font-bold text-2xl">Vote</h1>
        <p className="text-center text-muted-foreground text-xs">
          Vote for your favorite project from each episode. Winner gets a prize!
        </p>
      </div>

      {rounds.length === 0 && (
        <p className="text-center text-muted-foreground text-sm">
          No voting rounds yet. Check back after the next livestream!
        </p>
      )}

      <div className="flex flex-col gap-4">
        {rounds.map((round) => {
          const isOpen = now >= round.opensAt && now <= round.closesAt;
          const isClosed = now > round.closesAt;

          return (
            <Link href={`/vote/${round.batch}`} key={round.id}>
              <div className="flex items-center justify-between rounded border p-4 transition-colors hover:bg-accent/50">
                <div>
                  <h3 className="font-bold">{round.title}</h3>
                  <p className="text-muted-foreground text-xs">
                    Episode {round.batch}
                  </p>
                </div>
                <div>
                  {isOpen && (
                    <Badge className="bg-green-500 text-white">Open</Badge>
                  )}
                  {isClosed && <Badge variant="outline">Closed</Badge>}
                  {!(isOpen || isClosed) && (
                    <Badge variant="outline">Upcoming</Badge>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
