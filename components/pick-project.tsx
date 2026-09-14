"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import type { SelectProject } from "@/db/schema";
import {
  deleteAllProjectsAndAddToReviewedProjects,
  getRandomProject,
} from "@/server/projects";
import { ProjectCard } from "./project-card";
import { Button } from "./ui/8bit/button";

const DELAY = 500;
const PREVIEW_PROJECT_COUNT = 10;

interface PickProjectProps {
  showReviewArchiveAction?: boolean;
}

export function PickProject({
  showReviewArchiveAction = false,
}: PickProjectProps) {
  const [project, setProject] = useState<SelectProject | null>(null);
  const [pickedProject, setPickedProject] = useState<SelectProject | null>(
    null
  );
  const [isConfirmingArchive, setIsConfirmingArchive] = useState(false);
  const [isArchiving, startArchiveTransition] = useTransition();
  const [isPending, setIsPending] = useState(false);

  async function pickProject() {
    if (isPending) {
      return;
    }

    setIsPending(true);
    setPickedProject(null);

    try {
      const data = await getRandomProject();
      const projectsToShow = data.projects.slice(0, PREVIEW_PROJECT_COUNT);

      for (const [index, previewProject] of projectsToShow.entries()) {
        setTimeout(
          () => {
            setProject(previewProject);
          },
          DELAY * (index + 1)
        );
      }

      setTimeout(
        () => {
          setPickedProject(data.pickedProject);
          setProject(null);
          setIsPending(false);
        },
        DELAY * (projectsToShow.length + 1)
      );
    } catch {
      setIsPending(false);
    }
  }

  function archiveReviewedProjects() {
    if (!isConfirmingArchive) {
      setIsConfirmingArchive(true);
      return;
    }

    startArchiveTransition(async () => {
      await deleteAllProjectsAndAddToReviewedProjects();
      setIsConfirmingArchive(false);
    });
  }

  let archiveButtonLabel = "Archive Stream Projects";
  if (isConfirmingArchive) {
    archiveButtonLabel = "Confirm Move";
  }
  if (isArchiving) {
    archiveButtonLabel = "Moving Projects...";
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-center font-bold text-2xl">The Orc Machine</h1>

      <p aria-live="polite" className="sr-only" role="status">
        {isPending ? "Picking a project" : ""}
      </p>

      <div className="flex gap-6">
        <Button
          aria-busy={isPending}
          disabled={isPending}
          onClick={pickProject}
          type="button"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Picking...
            </>
          ) : (
            "Pick a Project"
          )}
        </Button>
        {showReviewArchiveAction ? (
          <div className="flex gap-3">
            <Button
              disabled={isArchiving || isPending}
              onClick={archiveReviewedProjects}
              type="button"
            >
              {archiveButtonLabel}
            </Button>
            {isConfirmingArchive ? (
              <Button
                disabled={isArchiving || isPending}
                onClick={() => setIsConfirmingArchive(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>

      {project ? (
        <h2 className="text-center font-bold text-2xl">{project.name}</h2>
      ) : null}

      <div className="flex flex-col gap-3">
        {pickedProject ? (
          <ProjectCard key={pickedProject.id} project={pickedProject} />
        ) : null}
      </div>
    </div>
  );
}
