"use server";

import { db } from "@/db/drizzle";
import { type InsertProject, projects, type SelectProject } from "@/db/schema";
import { and, count, eq, isNotNull, isNull, or, sql } from "drizzle-orm";

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

export async function getProjectCount() {
  try {
    const [totalProjects] = await db
      .select({ count: count() })
      .from(projects)
      .where(isNull(projects.resetDate));

    return totalProjects?.count ?? 0;
  } catch {
    throw new Error("Failed to get project count");
  }
}

type RandomProject = {
  projects: SelectProject[];
  pickedProject: SelectProject;
};

export async function getRandomProject(): Promise<RandomProject> {
  try {
    const random10Projects = await db.query.projects.findMany({
      where: and(isNull(projects.resetDate), isNull(projects.deletedAt)),
      orderBy: sql`RANDOM()`,
      limit: 10,
    });

    const pickedProject =
      random10Projects[Math.floor(Math.random() * random10Projects.length)];

    await db
      .update(projects)
      .set({
        deletedAt: sql`NOW()`,
      })
      .where(eq(projects.id, pickedProject.id));

    return {
      projects: random10Projects.filter(
        (project) => project.id !== pickedProject.id
      ),
      pickedProject,
    };
  } catch {
    throw new Error("Failed to get random project");
  }
}

export async function getReviewedProjects() {
  try {
    const allReviewedProjects = await db.query.projects.findMany({
      where: isNotNull(projects.deletedAt),
    });

    return allReviewedProjects;
  } catch {
    throw new Error("Failed to get reviewed projects");
  }
}
