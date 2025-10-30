import Link from "next/link";
import { Suspense } from "react";
import { SubmitProjectForm } from "@/components/forms/submit-project-form";
import { Button } from "@/components/ui/8bit/button";
import { Skeleton } from "@/components/ui/8bit/skeleton";

export default function Home() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 py-6">
      <h1 className="sr-only font-bold text-2xl">OrcDev Project Review</h1>
      <p className="sr-only text-center text-muted-foreground text-xs">
        Want your open source project reviewed live on stream? Drop it here and
        join the spotlight.
      </p>

      <Link href="/">
        <Button>Back</Button>
      </Link>

      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <SubmitProjectForm />
      </Suspense>
    </main>
  );
}
