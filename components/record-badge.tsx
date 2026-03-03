import { getRecord } from "@/server/projects";
import { Badge } from "./ui/8bit/badge";

export async function RecordBadge() {
  const { highest, current } = await getRecord();

  return (
    <div className="retro flex items-center gap-3 text-xs">
      <p>Record: </p>
      <Badge>{highest}</Badge>
      <p>Current: </p>
      <Badge>{current}</Badge>
    </div>
  );
}
