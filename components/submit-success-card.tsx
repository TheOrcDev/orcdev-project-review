import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SubmitSuccessCard() {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Successfully submitted! ⚔️</CardTitle>
        <CardDescription>Good luck! May the code be with you!</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <p>
          Project reviews will be randomly selected and livestreamed on{" "}
          <Link
            className="text-primary underline"
            href="https://youtube.com/@orcdev"
            rel="noopener noreferrer"
            target="_blank"
          >
            OrcDev YouTube Channel
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
