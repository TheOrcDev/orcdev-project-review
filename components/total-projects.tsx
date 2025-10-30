import { getProjectCount } from "@/server/projects";
import { Badge } from "./ui/8bit/badge";

export async function TotalProjects() {
  const totalProjects = await getProjectCount();

  return <Badge className="font-bold text-2xl">{totalProjects}</Badge>;
}
