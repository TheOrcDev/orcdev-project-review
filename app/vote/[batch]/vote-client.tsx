"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { toast } from "@/components/ui/8bit/toast";
import type { SelectReviewedProject } from "@/db/schema";

type ProjectWithVotes = SelectReviewedProject & { voteCount: number };

function projectBorderClass(isWinner: boolean, isVoted: boolean): string {
  if (isWinner) {
    return "border-yellow-500 bg-yellow-500/10";
  }
  if (isVoted) {
    return "border-primary bg-primary/5";
  }
  return "border-border";
}

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
  isAdmin: boolean;
  projects: ProjectWithVotes[];
  roundId: string;
  winnerId: string | null;
}

export function VoteClient({
  roundId,
  projects,
  isOpen,
  isClosed,
  isAdmin,
  existingVoteProjectId,
  winnerId: initialWinnerId,
}: VoteClientProps) {
  const [votedFor, setVotedFor] = useState<string | null>(
    existingVoteProjectId
  );
  const [loading, setLoading] = useState<string | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(initialWinnerId);
  const [announcing, setAnnouncing] = useState(false);
  const [showResults, setShowResults] = useState(!!initialWinnerId);

  // Only sort by votes if results are revealed
  const sorted = showResults
    ? [...projects].sort((a, b) => b.voteCount - a.voteCount)
    : [...projects].sort((a, b) => a.name.localeCompare(b.name));
  const _maxVotes = Math.max(...sorted.map((p) => p.voteCount), 0);

  async function handleAnnounce() {
    setAnnouncing(true);
    try {
      const res = await fetch("/api/vote/announce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roundId }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error ?? "Failed to announce");
        return;
      }
      setWinnerId(data.winnerId);
      setShowResults(true);
      toast("Winner announced! 🎉");
    } catch {
      toast("Something went wrong");
    } finally {
      setAnnouncing(false);
    }
  }

  async function handleVote(projectId: string) {
    setLoading(projectId);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roundId, projectId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.error ?? "Failed to vote");
        return;
      }

      setVotedFor(projectId);
      toast("Vote cast!");
    } catch {
      toast("Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {isAdmin && isClosed && !winnerId && (
        <div className="flex items-center justify-between border border-dashed border-yellow-500 bg-yellow-500/10 p-3">
          <p className="font-bold text-sm">Admin: Results are hidden until you announce the winner</p>
          <Button
            disabled={announcing}
            onClick={handleAnnounce}
            size="sm"
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            {announcing ? "Announcing..." : "🏆 Announce Winner"}
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="flex items-center justify-between border border-dashed p-3">
          <p className="text-muted-foreground text-xs">
            {votedFor ? "Vote cast!" : "Pick your favorite project below"}
          </p>
        </div>
      )}

      {/* Projects list */}
      <div className="flex flex-col gap-4">
        {sorted.map((project, idx) => {
          const isWinner = showResults && idx === 0 && project.voteCount > 0 && winnerId === project.id;
          const isVoted = votedFor === project.id;

          return (
            <div
              className={`border p-4 transition-all ${projectBorderClass(isWinner, isVoted)}`}
              key={project.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {isWinner && "Winner"}
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
                    {project.githubRepoUrl.replace("https://github.com/", "")}
                  </a>
                </div>

                <div className="flex flex-col items-center gap-2">
                  {/* Vote count — only show after winner is announced */}
                  {showResults && (
                    <div className="text-center">
                      <div className="font-bold text-xl">
                        {project.voteCount +
                          (isVoted && !existingVoteProjectId ? 1 : 0)}
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
