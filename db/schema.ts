import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  githubRepoUrl: text("github_repo_url").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  resetDate: timestamp("reset_date"),
  deletedAt: timestamp("deleted_at"),
});

export const reviewedProjects = pgTable("reviewed_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  githubRepoUrl: text("github_repo_url").notNull(),
  description: text("description").notNull(),
  batch: integer("batch").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SelectProject = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export const schema = { projects, reviewedProjects };
