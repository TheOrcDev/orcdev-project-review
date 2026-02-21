ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "x_handle" text;
--> statement-breakpoint
ALTER TABLE "reviewed_projects" ADD COLUMN IF NOT EXISTS "x_handle" text;
--> statement-breakpoint
ALTER TABLE "previously_submitted_projects" ADD COLUMN IF NOT EXISTS "x_handle" text;
