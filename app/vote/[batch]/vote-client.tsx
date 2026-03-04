"use client";

import { Github, Trophy } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import type { SelectReviewedProject } from "@/db/schema";

type ProjectWithVotes = SelectReviewedProject & { voteCount: number };

function normalizeGithubUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

interface VoteClientProps {
  existingVoteProjectId: string | null;
  isClosed: boolean;
  isOpen: boolean;
  projects: ProjectWithVotes[];
  roundId: string;
}

export function VoteClient({
  roundId,
  projects,
  isOpen,
  isClosed,
  existingVoteProjectId,
}: VoteClientProps) {
  const [votedFor, setVotedFor] = useState<string | null>(
    existingVoteProjectId
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const sorted = [...projects].sort((a, b) => b.voteCount - a.voteCount);
  const maxVotes = Math.max(...sorted.map((p) => p.voteCount), 0);

  async function handleVote(projectId: string) {
    setError(null);
    setLoading(projectId);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roundId, projectId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to vote");
        return;
      }

      setVotedFor(projectId);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {isOpen && (
        <div className="flex items-center justify-between border border-dashed p-3">
          <p className="text-muted-foreground text-xs">
            {votedFor ? "Vote cast!" : "Pick your favorite project below"}
          </p>
        </div>
      )}

      {error && (
        <div className="border border-destructive bg-destructive/10 p-3 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Projects list */}
      <div className="flex flex-col gap-4">
        {sorted.map((project, idx) => {
          const isWinner = isClosed && idx === 0 && project.voteCount > 0;
          const isVoted = votedFor === project.id;

          return (
            <div
              className={`border p-4 transition-all ${
                isWinner
                  ? "border-yellow-500 bg-yellow-500/10"
                  : isVoted
                    ? "border-primary bg-primary/5"
                    : "border-border"
              }`}
              key={project.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {isWinner && <Trophy className="size-5 text-yellow-500" />}
                    <h3 className="font-bold">{project.name}</h3>
                    {isVoted && (
                      <Badge className="text-xs" variant="outline">
                        Your vote
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  <a
                    className="mt-2 inline-flex items-center gap-1 text-primary text-xs underline"
                    href={normalizeGithubUrl(project.githubRepoUrl)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github className="size-3" />
                    {project.githubRepoUrl.replace("https://github.com/", "")}
                  </a>
                </div>

                <div className="flex flex-col items-center gap-2">
                  {/* Vote count (show after voting or when closed) */}
                  {(votedFor || isClosed) && (
                    <div className="text-center">
                      <div className="font-bold text-xl">
                        {project.voteCount + (isVoted ? 1 : 0)}
                      </div>
                      <div className="text-muted-foreground text-xs">votes</div>
                    </div>
                  )}

                  {/* Vote button */}
                  {isOpen && !votedFor && (
                    <Button
                      disabled={loading !== null}
                      onClick={() => handleVote(project.id)}
                      size="sm"
                    >
                      {loading === project.id ? "Voting..." : "Vote"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isOpen && (
        <p className="text-center text-muted-foreground text-xs">
          You must star a project on GitHub before voting for it
        </p>
      )}
    </div>
  );
}
