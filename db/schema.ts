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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
  description: text("description").notNull(),
  githubRepoUrl: text("github_repo_url").unique().notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  resetDate: timestamp("reset_date"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  xHandle: text("x_handle"),
});

export const reviewedProjects = pgTable("reviewed_projects", {
  batch: integer("batch").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: text("description").notNull(),
  githubRepoUrl: text("github_repo_url").notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  xHandle: text("x_handle"),
});

export const previouslySubmittedProjects = pgTable(
  "previously_submitted_projects",
  {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    description: text("description").notNull(),
    githubRepoUrl: text("github_repo_url").unique().notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    xHandle: text("x_handle"),
  }
);

export const records = pgTable("records", {
  highestProjectCount: integer("highest_project_count").notNull().default(0),
  id: uuid("id").primaryKey().defaultRandom(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Better Auth tables ─────────────────────────────────────────

export const users = pgTable("users", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  id: text("id").primaryKey(),
  image: text("image"),
  name: text("name").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  id: text("id").primaryKey(),
  ipAddress: text("ip_address"),
  token: text("token").notNull().unique(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const accounts = pgTable("accounts", {
  accessToken: text("access_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  accountId: text("account_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  id: text("id").primaryKey(),
  idToken: text("id_token"),
  password: text("password"),
  providerId: text("provider_id").notNull(),
  refreshToken: text("refresh_token"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const verifications = pgTable("verifications", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  value: text("value").notNull(),
});

// ─── Voting tables ──────────────────────────────────────────────

export const votingRounds = pgTable("voting_rounds", {
  batch: integer("batch").notNull().unique(),
  closesAt: timestamp("closes_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  livestreamUrl: text("livestream_url"),
  opensAt: timestamp("opens_at").notNull(),
  title: text("title").notNull(),
  winnerId: text("winner_id"),
});

export const votes = pgTable(
  "votes",
  {
    githubAccountAgeDays: integer("github_account_age_days"),
    githubPublicRepos: integer("github_public_repos"),
    githubUsername: text("github_username").notNull(),
    hasStarred: boolean("has_starred").notNull().default(false),
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => reviewedProjects.id),
    roundId: uuid("round_id")
      .notNull()
      .references(() => votingRounds.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
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
  accounts,
  previouslySubmittedProjects,
  projects,
  records,
  reviewedProjects,
  sessions,
  users,
  verifications,
  votes,
  votingRounds,
};
