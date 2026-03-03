import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import {
  accounts,
  reviewedProjects,
  votes,
  votingRounds,
} from "@/db/schema";
import { auth } from "@/lib/auth";

const MIN_ACCOUNT_AGE_DAYS = 90;
const MIN_PUBLIC_REPOS = 3;

function daysBetween(d1: Date, d2: Date): number {
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

export async function POST(request: Request) {
  try {
    // 1. Check auth
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { roundId, projectId } = body as {
      roundId: string;
      projectId: string;
    };

    if (!roundId || !projectId) {
      return NextResponse.json(
        { error: "roundId and projectId are required" },
        { status: 400 }
      );
    }

    // 2. Check round is open
    const [round] = await db
      .select()
      .from(votingRounds)
      .where(eq(votingRounds.id, roundId))
      .limit(1);

    if (!round) {
      return NextResponse.json(
        { error: "Voting round not found" },
        { status: 404 }
      );
    }

    const now = new Date();
    if (now < round.opensAt) {
      return NextResponse.json(
        { error: "Voting hasn't opened yet" },
        { status: 400 }
      );
    }
    if (now > round.closesAt) {
      return NextResponse.json(
        { error: "Voting is closed" },
        { status: 400 }
      );
    }

    // 3. Check project belongs to this round's batch
    const [project] = await db
      .select()
      .from(reviewedProjects)
      .where(
        and(
          eq(reviewedProjects.id, projectId),
          eq(reviewedProjects.batch, round.batch)
        )
      )
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found in this round" },
        { status: 404 }
      );
    }

    // 4. Get GitHub account info (access token from accounts table)
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
      return NextResponse.json(
        { error: "GitHub account not linked" },
        { status: 400 }
      );
    }

    // Fetch GitHub user info
    const ghUserRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!ghUserRes.ok) {
      return NextResponse.json(
        { error: "Failed to verify GitHub account" },
        { status: 500 }
      );
    }

    const ghUser = await ghUserRes.json();
    const githubUsername = ghUser.login as string;
    const accountCreatedAt = new Date(ghUser.created_at as string);
    const publicRepos = ghUser.public_repos as number;
    const accountAgeDays = daysBetween(accountCreatedAt, now);

    // 5. Check account age
    if (accountAgeDays < MIN_ACCOUNT_AGE_DAYS) {
      return NextResponse.json(
        {
          error: `GitHub account must be at least ${MIN_ACCOUNT_AGE_DAYS} days old (yours: ${accountAgeDays} days)`,
        },
        { status: 403 }
      );
    }

    // 6. Check public repos
    if (publicRepos < MIN_PUBLIC_REPOS) {
      return NextResponse.json(
        {
          error: `You need at least ${MIN_PUBLIC_REPOS} public repos to vote (you have ${publicRepos})`,
        },
        { status: 403 }
      );
    }

    // 7. Check proof of star
    const parsed = parseGitHubRepo(project.githubRepoUrl);
    let hasStarred = false;

    if (parsed) {
      const starRes = await fetch(
        `https://api.github.com/user/starred/${parsed.owner}/${parsed.repo}`,
        {
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
      hasStarred = starRes.status === 204;
    }

    if (!hasStarred) {
      return NextResponse.json(
        {
          error:
            "You must star this project on GitHub before voting. Star it and try again!",
        },
        { status: 403 }
      );
    }

    // 8. Check no double vote (also enforced by DB unique constraint)
    const [existingVote] = await db
      .select()
      .from(votes)
      .where(
        and(eq(votes.roundId, roundId), eq(votes.userId, session.user.id))
      )
      .limit(1);

    if (existingVote) {
      return NextResponse.json(
        { error: "You already voted in this round" },
        { status: 409 }
      );
    }

    // 9. Cast vote
    await db.insert(votes).values({
      roundId,
      userId: session.user.id,
      projectId,
      githubUsername,
      githubAccountAgeDays: accountAgeDays,
      githubPublicRepos: publicRepos,
      hasStarred: true,
    });

    return NextResponse.json({ success: true, votedFor: project.name });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
