import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

export function BackButton({ href = "/" }: { href?: string }) {
  return (
    <div className="flex w-fit self-start justify-start">
      <Button asChild variant="outline">
        <Link className="after:absolute after:inset-0" href={href}>
          Back
        </Link>
      </Button>
    </div>
  );
}
