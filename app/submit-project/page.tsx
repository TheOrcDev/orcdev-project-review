import { Suspense } from "react";
import { BackButton } from "@/components/back-button";
import { SubmitProjectForm } from "@/components/forms/submit-project-form";
import { Skeleton } from "@/components/ui/8bit/skeleton";

export default function Home() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-4 py-6">
      <h1 className="sr-only font-bold text-2xl">OrcDev Project Review</h1>
      <p className="sr-only text-center text-muted-foreground text-xs">
        Want your open source project reviewed live on stream? Drop it here and
        join the spotlight.
      </p>

      <BackButton />

      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <SubmitProjectForm />
      </Suspense>
    </main>
  );
}
