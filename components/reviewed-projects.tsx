import Link from "next/link";
import { getReviewedProjects } from "@/server/projects";
import { Button } from "./ui/8bit/button";

export async function ReviewedProjects({ batch }: { batch: number }) {
  const allReviewedProjects = await getReviewedProjects(batch);

  return (
    <>
      <h2>
        {allReviewedProjects.length} projects have been reviewed in{" "}
        <Link
          className="font-medium text-primary underline"
          href="https://www.youtube.com/watch?v=oaD2svrWWnU"
          rel="noopener noreferrer"
          target="_blank"
        >
          this livestream
        </Link>
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
    </>
  );
}
