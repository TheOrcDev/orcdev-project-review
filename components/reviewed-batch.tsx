"use client";

import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import type { SelectReviewedProject } from "@/db/schema";
import { Button } from "./ui/8bit/button";

export function ReviewedBatch({
  projects,
  batch,
}: {
  projects: SelectReviewedProject[];
  batch: number;
}) {
  const [search] = useQueryState("search", parseAsString);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search?.toLowerCase() ?? "")
  );

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h2 className="font-bold text-lg">Episode #{batch}</h2>
      <div className="flex min-w-0 max-w-full flex-wrap gap-2">
        {filteredProjects.map((project) => (
          <Button asChild className="min-w-0 max-w-full" key={project.id}>
            <Link
              className="min-w-0 max-w-full"
              href={
                project.githubRepoUrl.startsWith("http")
                  ? project.githubRepoUrl
                  : `https://${project.githubRepoUrl}`
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="block min-w-0 truncate">{project.name}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
