import { getBatchCount } from "@/server/projects";
import { ReviewedProjects } from "./reviewed-projects";

export async function AllBatches() {
  const batchCount = await getBatchCount();

  const batches = Array.from({ length: batchCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-10">
      {batches.map((batch) => (
        <ReviewedProjects
          batch={batch}
          key={batch}
          livestreamUrl={"https://www.youtube.com/watch?v=oaD2svrWWnU"}
        />
      ))}
    </div>
  );
}
