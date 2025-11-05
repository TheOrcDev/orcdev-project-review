import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import type { SelectProject } from "@/db/schema";
import { Button } from "./ui/8bit/button";

export function ProjectCard({ project }: { project: SelectProject }) {
  const url = project.githubRepoUrl.startsWith("https://")
    ? project.githubRepoUrl
    : `https://${project.githubRepoUrl}`;

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>
          {project.description ?? "No description"}
        </CardDescription>

        <CardContent className="mt-5 flex justify-center">
          <Link href={url} rel="noopener noreferrer" target="_blank">
            <Button>View Project</Button>
          </Link>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
