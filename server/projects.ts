"use server";

import { eq, or } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { type InsertProject, projects, type SelectProject } from "@/db/schema";

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
    where: or(
      eq(projects.name, project.name),
      eq(projects.githubRepoUrl, project.githubRepoUrl)
    ),
  });

  if (check) {
    return "Project already submitted.";
  }

  try {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  } catch {
    throw new Error("Failed to create project");
  }
}
