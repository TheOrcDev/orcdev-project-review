import { desc } from "drizzle-orm";
import Link from "next/link";
import { connection } from "next/server";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { db } from "@/db/drizzle";
import { votingRounds } from "@/db/schema";
import { CreateRoundForm } from "./create-round-form";

export async function AdminContent() {
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

      <h1 className="text-center font-bold text-2xl">Admin — Voting Rounds</h1>

      <CreateRoundForm />

      <div className="flex flex-col gap-4">
        {rounds.map((round) => {
          const isOpen = now >= round.opensAt && now <= round.closesAt;
          const isClosed = now > round.closesAt;

          return (
            <div
              className="flex items-center justify-between border p-4"
              key={round.id}
            >
              <div>
                <h3 className="font-bold">{round.title}</h3>
                <p className="text-muted-foreground text-xs">
                  Batch {round.batch} — Opens:{" "}
                  {round.opensAt.toLocaleDateString()} — Closes:{" "}
                  {round.closesAt.toLocaleDateString()}
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
          );
        })}
      </div>
    </main>
  );
}
