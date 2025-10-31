import { getProjectCount } from "@/server/projects";
import CountUp from "./count-up";

export async function TotalProjects() {
  const totalProjects = await getProjectCount();

  return <CountUp to={totalProjects} />;
}
