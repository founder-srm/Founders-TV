ALTER TABLE "collection" ADD COLUMN "event_type" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "date" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "venue" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "participants" integer DEFAULT 100;--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "detail_info" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "organizer" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "edition" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "theme" text DEFAULT '';