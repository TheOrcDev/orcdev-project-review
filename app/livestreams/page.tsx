import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

export default function Livestreams() {
  return (
    <main className="retro flex min-w-full flex-col items-center justify-center gap-5 py-12">
      <Link href="/">
        <Button>Back</Button>
      </Link>
      <h1 className="text-center font-bold md:text-2xl">
        OrcDev Project Review Livestreams
      </h1>
      <p className="text-center text-muted-foreground text-xs md:text-sm">
        All livestreams are listed here.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <h2 className="text-center font-bold md:text-2xl">
            4th November 2025
          </h2>
          <div className="flex justify-center">
            <iframe
              className="aspect-video w-full"
              src={"https://www.youtube.com/embed/oaD2svrWWnU"}
              title="OrcDev Project Review Livestream"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
