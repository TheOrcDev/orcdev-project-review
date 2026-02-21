import { getRecord } from "@/server/projects";

export async function RecordBadge() {
  const { highest, current } = await getRecord();

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span>
        Record: <strong>{highest}</strong>
      </span>
      <span>|</span>
      <span>
        Current: <strong>{current}</strong>
      </span>
    </div>
  );
}
