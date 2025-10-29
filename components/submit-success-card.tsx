import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

export function SubmitSuccessCard() {
  return (
    <Card className="w-full text-center sm:max-w-lg">
      <CardHeader>
        <CardTitle>Submission Received! ⚔️</CardTitle>
        <CardDescription>
          Awesome - your project is now in the review pool!
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <p>
          Each stream, I’ll randomly pick open source projects to review live.
          If yours gets selected, I’ll explore it, share feedback, and give it
          some spotlight time ⚡️
        </p>

        <p>
          Watch the livestreams on{" "}
          <Link
            className="font-medium text-primary underline"
            href="https://youtube.com/@orcdev"
            rel="noopener noreferrer"
            target="_blank"
          >
            the OrcDev YouTube Channel
          </Link>
          , and make sure to subscribe so you don’t miss when your project shows
          up!
        </p>

        <p className="mt-2 text-muted-foreground text-sm">
          May your code be clean and your stars ever rising 💫
        </p>
      </CardContent>
    </Card>
  );
}
