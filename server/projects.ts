"use server";

import { db } from "@/db/drizzle";
import {
  type InsertProject,
  previouslySubmittedProjects,
  projects,
  reviewedProjects,
  type SelectProject,
} from "@/db/schema";
import {
  and,
  count,
  desc,
  eq,
  isNotNull,
  isNull,
  max,
  or,
  sql,
} from "drizzle-orm";
import {
  refresh,
  revalidatePath,
  revalidateTag,
  unstable_cache,
} from "next/cache";

const PROJECTS_TAG = "projects";

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
    revalidateTag(PROJECTS_TAG, "default");
    revalidatePath("/", "layout");
    refresh();
    return newProject;
  } catch {
    throw new Error("Failed to create project");
  }
}

export const getProjectCount = unstable_cache(
  async () => {
    try {
      const [totalProjects] = await db
        .select({ count: count() })
        .from(projects)
        .where(isNull(projects.resetDate));

      return totalProjects?.count ?? 0;
    } catch {
      throw new Error("Failed to get project count");
    }
  },
  ["project-count"],
  { tags: [PROJECTS_TAG] }
);

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
    const allReviewedProjects = await db.query.reviewedProjects.findMany({
      orderBy: desc(reviewedProjects.batch),
    });

    return allReviewedProjects;
  } catch {
    throw new Error("Failed to get reviewed projects");
  }
}

export async function deleteAllProjectsAndAddToReviewedProjects() {
  try {
    const allProjects = await db.query.projects.findMany({
      where: isNotNull(projects.deletedAt),
    });

    const [latestBatchRow] = await db
      .select()
      .from(reviewedProjects)
      .where(isNotNull(reviewedProjects.batch))
      .orderBy(desc(reviewedProjects.batch))
      .limit(1);

    const latestBatch = latestBatchRow?.batch ?? 0;

    await db.insert(reviewedProjects).values(
      allProjects.map((project) => ({
        name: project.name,
        githubRepoUrl: project.githubRepoUrl,
        description: project.description,
        batch: latestBatch + 1,
      }))
    );

    await db
      .insert(previouslySubmittedProjects)
      .values(
        allProjects.map((project) => ({
          name: project.name,
          githubRepoUrl: project.githubRepoUrl,
          description: project.description,
        }))
      )
      .onConflictDoNothing({
        target: previouslySubmittedProjects.githubRepoUrl,
      });
  } catch {
    throw new Error(
      "Failed to delete all projects and add to reviewed projects"
    );
  }
}

export async function getBatchCount() {
  try {
    const [batchCount] = await db
      .select({ count: max(reviewedProjects.batch) })
      .from(reviewedProjects)
      .where(isNotNull(reviewedProjects.batch));

    return batchCount?.count ?? 0;
  } catch {
    throw new Error("Failed to get batch count");
  }
}
