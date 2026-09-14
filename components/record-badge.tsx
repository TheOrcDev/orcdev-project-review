import { getRecord } from "@/server/projects";
import { Badge } from "./ui/8bit/badge";

export async function RecordBadge() {
  const { highest, current } = await getRecord();

  return (
    <div className="retro flex items-center gap-2 text-xs md:gap-5">
      <p className="hidden md:block">Record: </p>
      <Badge variant={"secondary"}>{highest}</Badge>
      <p className="hidden md:block">Current: </p>
      <Badge>{current}</Badge>
    </div>
  );
}
