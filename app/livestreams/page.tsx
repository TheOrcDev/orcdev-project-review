import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

const livestreams = [
  {
    date: "20th January 2026",
    url: "https://www.youtube.com/live/DTnn9b8tbqc",
  },
  {
    date: "14th January 2026",
    url: "https://www.youtube.com/live/qcEPCamwg6I",
  },
  {
    date: "8th January 2026",
    url: "https://www.youtube.com/live/1Yd0xYtWHCE",
  },
  {
    date: "30th December 2025",
    url: "https://www.youtube.com/live/m7OgBhY36tU",
  },
  {
    date: "23rd December 2025",
    url: "https://www.youtube.com/live/bJ9wuU0Jj6g",
  },
  {
    date: "16th December 2025",
    url: "https://www.youtube.com/live/D2mzsmNXEm8",
  },
  {
    date: "9th December 2025",
    url: "https://www.youtube.com/live/m-pT1Jl2568",
  },
  {
    date: "2nd December 2025",
    url: "https://www.youtube.com/live/Q1JyVbDoQSM",
  },
  {
    date: "26th November 2025",
    url: "https://www.youtube.com/live/w4AUms5wNpY",
  },
  {
    date: "20th November 2025",
    url: "https://www.youtube.com/live/qpWkvlYjqvE",
  },
  {
    date: "11th November 2025",
    url: "https://www.youtube.com/watch?v=EG45hfpIAoc",
  },
  {
    date: "4th November 2025",
    url: "https://www.youtube.com/watch?v=oaD2svrWWnU",
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
            className="w-full text-center font-bold text-primary underline md:text-xl"
            href={livestream.url}
            key={livestream.date}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button className="w-full">{livestream.date}</Button>
          </Link>
        ))}
      </div>
    </main>
  );
}
