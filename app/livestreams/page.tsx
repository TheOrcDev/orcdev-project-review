import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

const livestreams = [
  {
    date: "4th November 2025",
    url: "https://www.youtube.com/watch?v=oaD2svrWWnU",
  },
  {
    date: "11th November 2025",
    url: "https://www.youtube.com/watch?v=EG45hfpIAoc",
  },
];

export default function Livestreams() {
  return (
    <main className="retro mx-auto flex max-w-2xl flex-col gap-5 py-12">
      <Link href="/">
        <Button variant="outline">Back</Button>
      </Link>
      <h1 className="text-center font-bold md:text-2xl">
        OrcDev Project Review Livestreams
      </h1>
      <p className="text-center text-muted-foreground text-xs md:text-sm">
        All livestreams are listed here.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {livestreams.map((livestream) => (
          <Link
            className="text-center font-bold text-primary underline md:text-xl"
            href={livestream.url}
            key={livestream.date}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button>{livestream.date}</Button>
          </Link>
        ))}
      </div>
    </main>
  );
}
