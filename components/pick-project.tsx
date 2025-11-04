"use client";

import { useState } from "react";
import type { SelectProject } from "@/db/schema";
import { getRandomProject } from "@/server/projects";
import { ProjectCard } from "./project-card";
import { Button } from "./ui/8bit/button";

const DELAY = 500;

export function PickProject() {
  const [project, setProject] = useState<SelectProject | null>(null);
  const [pickedProject, setPickedProject] = useState<SelectProject | null>(
    null
  );

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

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-center font-bold text-2xl">The Orc Machine</h1>

      <div className="flex gap-6">
        <Button onClick={pickProject}>Pick a Project</Button>
      </div>

      {project && (
        <h2 className="text-center font-bold text-2xl">{project.name}</h2>
      )}

      <div className="flex flex-col gap-3">
        {pickedProject && (
          <ProjectCard key={pickedProject.id} project={pickedProject} />
        )}
      </div>
    </div>
  );
}
