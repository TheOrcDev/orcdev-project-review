import { getProjectCount } from "@/server/projects";

export async function TotalProjects() {
  const totalProjects = await getProjectCount();

  return <p className="h-4 font-bold text-2xl">{totalProjects}</p>;
}
