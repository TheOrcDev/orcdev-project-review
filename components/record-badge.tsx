import { getRecord } from "@/server/projects";
import { Badge } from "./ui/8bit/badge";

export async function RecordBadge() {
  const { highest, current } = await getRecord();

  return (
    <div className="retro flex items-center gap-5 text-xs">
      <p className="hidden md:block">Record: </p>
      <Badge variant={"secondary"}>{highest}</Badge>
      <p className="hidden md:block">Current: </p>
      <Badge>{current}</Badge>
    </div>
  );
}
