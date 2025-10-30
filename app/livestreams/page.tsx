import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

export default function Livestreams() {
  return (
    <main className="retro flex min-w-full flex-col items-center justify-center gap-5 py-12">
      <Link href="/">
        <Button>Back</Button>
      </Link>
      <h1 className="font-bold text-2xl">OrcDev Project Review Livestreams</h1>
      <p className="text-center text-muted-foreground text-xs">
        All livestreams will be listed here.
      </p>
    </main>
  );
}
