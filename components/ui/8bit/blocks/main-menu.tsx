import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { menuItems } from "@/config/nav-items";
import { cn } from "@/lib/utils";

export default function MainMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <CardTitle>Main Menu</CardTitle>
        <CardDescription className="text-xs">
          Choose your adventure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {menuItems.map((item) => (
            <Link
              className="w-full"
              href={item.href}
              key={item.label}
              target={item.target}
            >
              <Button className="flex w-full items-center gap-2">
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
