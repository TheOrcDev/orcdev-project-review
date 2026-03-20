import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { auth } from "@/lib/auth";

const GITHUB_REPO_RE = /github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9._-]+)/;
const GIT_SUFFIX_RE = /\.git$/;

function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(GITHUB_REPO_RE);
  if (!match) {
    return null;
  }
  return { owner: match[1], repo: match[2].replace(GIT_SUFFIX_RE, "") };
}

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { name: null, description: null },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    if (!url) {
      return NextResponse.json({ name: null, description: null });
    }

    const parsed = parseGitHubRepo(url);
    if (!parsed) {
      return NextResponse.json({ name: null, description: null });
    }

    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.userId, session.user.id),
          eq(accounts.providerId, "github")
        )
      )
      .limit(1);

    if (!account?.accessToken) {
      return NextResponse.json({ name: null, description: null });
    }

    const ghRes = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
      {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!ghRes.ok) {
      return NextResponse.json({ name: null, description: null });
    }

    const ghData = await ghRes.json();

    return NextResponse.json({
      name: ghData.name ?? null,
      description: ghData.description ?? null,
    });
  } catch {
    return NextResponse.json({ name: null, description: null });
  }
}
