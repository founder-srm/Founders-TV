CREATE TABLE "video" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "video_url_unique" UNIQUE("url")
);
