"use server";

import { db } from "@/db/drizzle";
import { type InsertProject, projects } from "@/db/schema";

export async function getProjects() {
  try {
    const allProjects = await db.query.projects.findMany();
    return allProjects;
  } catch {
    throw new Error("Failed to get projects");
  }
}

export async function createProject(project: InsertProject) {
  try {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  } catch {
    throw new Error("Failed to create project");
  }
}
