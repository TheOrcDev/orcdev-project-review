import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { BackButton } from "@/components/back-button";
import { OrcMachineAdminTools } from "@/components/orc-machine-admin-tools";
import { auth } from "@/lib/auth";

async function AdminTools() {
  const session = await auth.api.getSession({ headers: await headers() });
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    return <BackButton />;
  }

  return <OrcMachineAdminTools />;
}

async function SleepingNotice() {
  const session = await auth.api.getSession({ headers: await headers() });
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 border border-dashed p-4">
      <h1 className="text-center font-bold">
        The Orc Machine is sleeping (for now)
      </h1>
      <p className="text-xs">
        The Orc Machine is our random project picker for the livestream. When
        it&apos;s awake, it grabs one project from the submitted list and
        that&apos;s what gets reviewed — no favoritism, just the wheel of fate.
      </p>

      <p className="text-xs">
        Want better odds? We also pick one project from the Discord community
        each stream, so joining gives you an extra chance to get pulled. Hop in:{" "}
        <Link className="underline" href="https://join.thehorde.dev/">
          Join the Horde
        </Link>
        !
      </p>
    </div>
  );
}

function AdminToolsFallback() {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button disabled type="button" variant="outline">
        Loading admin tools…
      </Button>
    </div>
  );
}

function SleepingNoticeFallback() {
  return (
    <div className="flex flex-col gap-3 border border-dashed p-4">
      <h1 className="text-center font-bold">The Orc Machine is waking up…</h1>
      <p className="text-xs">
        Checking whether the random project picker is still sleeping.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-10 py-12">
      <Suspense fallback={<AdminToolsFallback />}>
        <AdminTools />
      </Suspense>

      <Suspense fallback={<SleepingNoticeFallback />}>
        <SleepingNotice />
      </Suspense>
    </main>
  );
}
