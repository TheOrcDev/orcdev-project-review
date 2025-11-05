import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

export default function Home() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-10 py-12">
      {/* <PickProject /> */}
      <Link href="/">
        <Button variant="outline">Back</Button>
      </Link>
      <h1>The Orc Machine currently waits for the next stream.</h1>
    </main>
  );
}
