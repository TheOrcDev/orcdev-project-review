"use client";

import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="retro flex min-w-full flex-col items-center justify-center gap-6 py-12">
      <h1 className="font-bold text-2xl tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="text-center text-muted-foreground text-sm">
        An unexpected error occurred. You can try again or return home.
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={reset} type="button">
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
