"use client";

import { useQueryState } from "nuqs";
import { Input } from "./ui/8bit/input";
import { Label } from "./ui/label";

export function SearchReviewedProjects() {
  const [search, setSearch] = useQueryState("search");

  return (
    <div>
      <Label className="sr-only" htmlFor="search-projects">
        Search projects
      </Label>
      <Input
        id="search-projects"
        onChange={(e) => setSearch(e.target.value ?? "")}
        placeholder="Search projects"
        type="search"
        value={search ?? ""}
      />
    </div>
  );
}
