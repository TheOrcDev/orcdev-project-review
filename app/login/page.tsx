"use client";

import { useSearchParams } from "next/navigation";
import { Github } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { signIn } from "@/lib/auth-client";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") ?? "/vote";

  async function handleSignIn() {
    try {
      const result = await signIn.social({
        provider: "github",
        callbackURL,
      });
      if (result?.error) {
        console.error("Sign in error:", result.error);
        alert(`Sign in failed: ${JSON.stringify(result.error)}`);
      }
    } catch (err) {
      console.error("Sign in error:", err);
      alert(`Sign in failed: ${JSON.stringify(err)}`);
    }
  }

  return (
    <main className="retro flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle>Sign In</CardTitle>
          <CardDescription className="text-center text-xs">
            Sign in with your GitHub account to vote for projects
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button className="w-full" onClick={handleSignIn}>
            <Github className="mr-2 size-4" />
            Sign in with GitHub
          </Button>
          <p className="text-center text-muted-foreground text-xs">
            Requirements: GitHub account 90+ days old, 3+ public repos
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
