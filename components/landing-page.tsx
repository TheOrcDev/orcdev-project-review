import Link from "next/link";
import { Suspense } from "react";
import { TotalProjects } from "@/components/total-projects";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

const features = [
  {
    title: "Submit",
    description:
      "Drop your open source repo into the queue. One form, zero gatekeeping.",
  },
  {
    title: "Get picked",
    description:
      "The Orc Machine pulls projects at random each stream. Fair odds for everyone.",
  },
  {
    title: "Go live",
    description:
      "Watch the review on YouTube, get feedback, and level up your project in public.",
  },
];

export function LandingPage() {
  return (
    <main className="retro mx-auto flex w-full max-w-3xl flex-col gap-12 py-12 md:py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground text-xs tracking-wide">
            Live open source code reviews
          </p>
          <h1 className="font-bold text-2xl leading-relaxed md:text-3xl">
            Your project could be reviewed on stream
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground text-xs leading-relaxed md:text-sm">
            Submit your repo, join the queue, and get actionable feedback on
            code quality, architecture, and UX — picked live by the Orc Machine.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-muted-foreground text-xs">Projects in the queue</p>
          <div className="flex h-10 items-center justify-center">
            <Badge className="min-size-10 h-[42px] w-full min-w-[42px] font-bold text-2xl">
              <Suspense fallback={"0"}>
                <TotalProjects />
              </Suspense>
            </Badge>
          </div>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Link className="w-full sm:w-auto" href="/menu">
            <Button className="w-full px-8">Enter main menu</Button>
          </Link>
          <Link className="w-full sm:w-auto" href="/submit-project">
            <Button className="w-full px-8" variant="outline">
              Submit project
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="gap-2">
              <CardTitle className="text-sm">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="flex flex-col items-center gap-4 border border-dashed p-6 text-center">
        <h2 className="font-bold text-sm">Ready to roll the dice?</h2>
        <p className="max-w-md text-muted-foreground text-xs leading-relaxed">
          Jump into the main menu to submit a project, browse past reviews, or
          see what the Orc Machine is up to.
        </p>
        <Link href="/menu">
          <Button>Open main menu</Button>
        </Link>
      </section>
    </main>
  );
}
