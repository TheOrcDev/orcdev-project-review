import { getReviewedProjects } from "@/server/projects";
import { ReviewedBatch } from "./reviewed-batch";

export async function ReviewedProjects() {
  const reviewedProjects = await getReviewedProjects();

  const batches = reviewedProjects.reduce((acc, project) => {
    if (!acc.includes(project.batch)) {
      acc.push(project.batch);
    }
    return acc;
  }, [] as number[]);

  return (
    <>
      {batches.map((batch) => (
        <ReviewedBatch
          batch={batch}
          key={batch}
          projects={reviewedProjects.filter(
            (project) => project.batch === batch
          )}
        />
      ))}
    </>
  );
}
