import type { Metadata } from "next";
import { Suspense } from "react";
import { TotalProjects } from "@/components/total-projects";
import { Badge } from "@/components/ui/8bit/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

export const metadata: Metadata = {
  title: "Project Stats",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StatsPage() {
  return (
    <main className="retro flex min-h-[calc(100vh-7rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <CardTitle className="text-lg">OrcDev Project Review</CardTitle>
          <CardDescription className="text-xs">
            Projects submitted for live review
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-3 pb-2">
          <p className="text-center text-muted-foreground text-xs">
            In the queue so far
          </p>
          <div className="flex h-20 items-center justify-center">
            <Badge className="min-size-10 h-[84px] w-full min-w-[84px] font-bold text-5xl">
              <Suspense fallback={"0"}>
                <TotalProjects />
              </Suspense>
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-2 border-t border-dashed pt-6 text-center">
          <p className="text-xs leading-relaxed">
            Got an open source project? Submit yours and join the queue for a
            live code review on stream.
          </p>
          <p className="text-[10px] text-muted-foreground">
            review.thehorde.dev
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
