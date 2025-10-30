import { getProjectCount } from "@/server/projects";

export async function TotalProjects() {
  const totalProjects = await getProjectCount();

  return <span>{totalProjects}</span>;
}
