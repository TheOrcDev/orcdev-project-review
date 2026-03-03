import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// ─── Existing tables ────────────────────────────────────────────

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  githubRepoUrl: text("github_repo_url").unique().notNull(),
  description: text("description").notNull(),
  xHandle: text("x_handle"),
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
  xHandle: text("x_handle"),
  batch: integer("batch").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const previouslySubmittedProjects = pgTable(
  "previously_submitted_projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    githubRepoUrl: text("github_repo_url").unique().notNull(),
    description: text("description").notNull(),
    xHandle: text("x_handle"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export const records = pgTable("records", {
  id: uuid("id").primaryKey().defaultRandom(),
  highestProjectCount: integer("highest_project_count").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Better Auth tables ─────────────────────────────────────────

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Voting tables ──────────────────────────────────────────────

export const votingRounds = pgTable("voting_rounds", {
  id: uuid("id").primaryKey().defaultRandom(),
  batch: integer("batch").notNull().unique(),
  title: text("title").notNull(),
  livestreamUrl: text("livestream_url"),
  opensAt: timestamp("opens_at").notNull(),
  closesAt: timestamp("closes_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const votes = pgTable(
  "votes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    roundId: uuid("round_id")
      .notNull()
      .references(() => votingRounds.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    projectId: uuid("project_id")
      .notNull()
      .references(() => reviewedProjects.id),
    githubUsername: text("github_username").notNull(),
    githubAccountAgeDays: integer("github_account_age_days"),
    githubPublicRepos: integer("github_public_repos"),
    hasStarred: boolean("has_starred").notNull().default(false),
    votedAt: timestamp("voted_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("votes_round_user_idx").on(t.roundId, t.userId)]
);

// ─── Types ──────────────────────────────────────────────────────

export type SelectProject = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type SelectReviewedProject = typeof reviewedProjects.$inferSelect;
export type InsertReviewedProject = typeof reviewedProjects.$inferInsert;
export type SelectVotingRound = typeof votingRounds.$inferSelect;
export type SelectVote = typeof votes.$inferSelect;

export const schema = {
  projects,
  reviewedProjects,
  previouslySubmittedProjects,
  records,
  users,
  sessions,
  accounts,
  verifications,
  votingRounds,
  votes,
};
