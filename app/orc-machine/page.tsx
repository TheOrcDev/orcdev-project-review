import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

export default function Home() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-10 py-12">
      <Link href="/">
        <Button variant="outline">Back</Button>
      </Link>
      {/* <PickProject />
      <Button onClick={deleteAllProjectsAndAddToReviewedProjects}>
        Delete All Projects and Add to Reviewed Projects
      </Button> */}
      <div className="flex flex-col gap-3 border border-dashed p-4">
        <h1 className="text-center font-bold">
          The Orc Machine is sleeping (for now)
        </h1>
        <p className="text-xs">
          The Orc Machine is our random project picker for the livestream. When
          it’s awake, it grabs one project from the submitted list and that’s
          what gets reviewed — no favoritism, just the wheel of fate.
        </p>

        <p className="text-xs">
          Want better odds? We also pick one project from the Discord community
          each stream, so joining gives you an extra chance to get pulled. Hop
          in:{" "}
          <Link className="underline" href="https://join.thehorde.dev/">
            Join the Horde
          </Link>
          !
        </p>
      </div>
    </main>
  );
}
