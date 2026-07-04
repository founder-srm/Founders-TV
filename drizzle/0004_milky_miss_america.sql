ALTER TABLE "collection" DROP CONSTRAINT "collection_slug_unique";--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "thumbnail" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "collection" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "collection" DROP COLUMN "featured";