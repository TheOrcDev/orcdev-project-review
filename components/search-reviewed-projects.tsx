"use client";

import { useQueryState } from "nuqs";
import { Input } from "./ui/8bit/input";

export function SearchReviewedProjects() {
  const [search, setSearch] = useQueryState("search");

  return (
    <div>
      <Input
        onChange={(e) => setSearch(e.target.value ?? "")}
        placeholder="Search projects"
        type="search"
        value={search ?? ""}
      />
    </div>
  );
}
