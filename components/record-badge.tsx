import { getRecord } from "@/server/projects";

export async function RecordBadge() {
  const { highest, current } = await getRecord();

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>
        Record: <strong className="text-foreground">{highest}</strong>
      </span>
      <span>|</span>
      <span>
        Current: <strong className="text-foreground">{current}</strong>
      </span>
    </div>
  );
}
