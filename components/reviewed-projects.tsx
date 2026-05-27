import type { SelectReviewedProject } from "@/db/schema";
import { getReviewedProjects } from "@/server/projects";
import { ReviewedProjectsList } from "./reviewed-projects-list";

export async function ReviewedProjects() {
  const reviewedProjects = await getReviewedProjects();

  const batches = reviewedProjects.reduce((acc, project) => {
    if (project.batch !== null && !acc.includes(project.batch)) {
      acc.push(project.batch);
    }
    return acc;
  }, [] as number[]);

  const projectsByBatch = batches.reduce(
    (acc, batch) => {
      acc[batch] = reviewedProjects.filter(
        (project) => project.batch === batch
      );
      return acc;
    },
    {} as Record<number, SelectReviewedProject[]>
  );

  return (
    <ReviewedProjectsList batches={batches} projectsByBatch={projectsByBatch} />
  );
}
