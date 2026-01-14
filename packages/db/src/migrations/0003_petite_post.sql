CREATE SCHEMA "todo";
--> statement-breakpoint
CREATE TABLE "todo"."task" (
	"id" text PRIMARY KEY NOT NULL,
	"increment_id" integer GENERATED ALWAYS AS IDENTITY (sequence name "todo"."task_increment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" text GENERATED ALWAYS AS ('TAS' || lpad(increment_id::text, 8, '0')) STORED NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" text NOT NULL,
	"priority" text NOT NULL,
	"due_date" timestamp,
	"tags" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_by_id" text,
	"updated_by_id" text
);
--> statement-breakpoint
ALTER TABLE "todo"."task" ADD CONSTRAINT "task_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "todo"."task" ADD CONSTRAINT "task_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "auth"."user"("id") ON DELETE no action ON UPDATE no action;