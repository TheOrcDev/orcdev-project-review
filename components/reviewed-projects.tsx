import Link from "next/link";
import { getReviewedProjects } from "@/server/projects";
import { Button } from "./ui/8bit/button";

type ReviewedProjectsProps = {
  batch: number;
  livestreamUrl: string;
  date: string;
};

export async function ReviewedProjects({
  batch,
  livestreamUrl,
  date,
}: ReviewedProjectsProps) {
  const allReviewedProjects = await getReviewedProjects(batch);

  return (
    <div>
      <h2>
        {allReviewedProjects.length} projects have been reviewed in{" "}
        <Link
          className="font-medium text-primary underline"
          href={livestreamUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          this livestream
        </Link>{" "}
        on {date}
      </h2>

      <div className="mt-5 flex flex-wrap gap-5">
        {allReviewedProjects.map((project) => (
          <Link
            href={
              project.githubRepoUrl.startsWith("https://")
                ? project.githubRepoUrl
                : `https://${project.githubRepoUrl}`
            }
            key={project.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button key={project.id}>{project.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
