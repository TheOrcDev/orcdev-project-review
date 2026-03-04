import { Suspense } from "react";
import { Skeleton } from "@/components/ui/8bit/skeleton";
import { AdminContent } from "./admin-content";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="retro mx-auto flex max-w-2xl flex-col gap-6 py-12">
          <Skeleton className="h-10 w-full" />
        </main>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
