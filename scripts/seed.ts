import "dotenv/config";
import { assertDb } from "../src/database/db";
import { collection, video, user } from "../src/database/schemas";

async function main() {
  const database = assertDb();

  const adminUserId = crypto.randomUUID();
  const sampleCollectionId = crypto.randomUUID();

  await database.insert(user).values([
    {
      id: adminUserId,
      name: "Admin User",
      email: "admin@founders.tv",
      emailVerified: true,
      role: "ADMIN",
    },
  ]);

  await database.insert(collection).values([
    {
      id: sampleCollectionId,
      slug: "hackathon-2026",
      name: "Hackathon 2026",
      description: "Club events, workshops, and highlights.",
      featured: true,
      createdById: adminUserId,
    },
  ]);

  await database.insert(video).values([
    {
      youtubeId: "dQw4w9WgXcQ",
      title: "Welcome to Founders TV",
      description: "A short welcome video for the club.",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      collectionId: sampleCollectionId,
      createdById: adminUserId,
      isPublished: true,
    },
  ]);

  console.log("Seed data inserted successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
