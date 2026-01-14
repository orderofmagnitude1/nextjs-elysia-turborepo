ALTER TABLE "todo"."task"
ALTER COLUMN "priority"
SET DATA TYPE integer USING "priority"::integer;
--> statement-breakpoint
ALTER TABLE "todo"."task"
ADD COLUMN "estimated_hours" integer NOT NULL;