"use client";

import { useState, useTransition } from "react";
import type { SelectProject } from "@/db/schema";
import {
  deleteAllProjectsAndAddToReviewedProjects,
  getRandomProject,
} from "@/server/projects";
import { ProjectCard } from "./project-card";
import { Button } from "./ui/8bit/button";

const DELAY = 500;

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

  async function pickProject() {
    const data = await getRandomProject();

    const projectsToShow = data.projects.slice(0, 10);
    projectsToShow.forEach((p, index) => {
      setTimeout(
        () => {
          setProject(p);
        },
        DELAY * (index + 1)
      );
    });

    setTimeout(
      () => {
        setPickedProject(data.pickedProject);
        setProject(null);
      },
      DELAY * (projectsToShow.length + 1)
    );
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

  let archiveButtonLabel = "Move Pulled Projects to Reviewed";
  if (isConfirmingArchive) {
    archiveButtonLabel = "Confirm Move";
  }
  if (isArchiving) {
    archiveButtonLabel = "Moving Projects...";
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-center font-bold text-2xl">The Orc Machine</h1>

      <div className="flex gap-6">
        <Button onClick={pickProject}>Pick a Project</Button>
        {showReviewArchiveAction ? (
          <div className="flex gap-3">
            <Button disabled={isArchiving} onClick={archiveReviewedProjects}>
              {archiveButtonLabel}
            </Button>
            {isConfirmingArchive ? (
              <Button
                disabled={isArchiving}
                onClick={() => setIsConfirmingArchive(false)}
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
