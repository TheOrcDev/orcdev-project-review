"use server";

import { db } from "@/db/drizzle";
import { type InsertProject, projects, type SelectProject } from "@/db/schema";
import { and, eq, isNull, or } from "drizzle-orm";

export async function getProjects() {
  try {
    const allProjects = await db.query.projects.findMany();
    return allProjects;
  } catch {
    throw new Error("Failed to get projects");
  }
}

export async function createProject(
  project: InsertProject
): Promise<string | SelectProject> {
  const check = await db.query.projects.findFirst({
    where: and(
      or(
        eq(projects.name, project.name),
        eq(projects.githubRepoUrl, project.githubRepoUrl)
      ),
      isNull(projects.resetDate)
    ),
  });

  if (check) {
    return "Project already submitted for the next stream.";
  }

  try {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  } catch {
    throw new Error("Failed to create project");
  }
}
