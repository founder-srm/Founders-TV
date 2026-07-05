import { and, eq, sql } from "drizzle-orm";
import { assertDb } from "@/database/db";
import { like } from "@/database/schemas";
import {video} from "@/database/schemas";

export async function hasLikedVideo(userId: string, videoId: string) {
  const database = assertDb();
  const rows = await database
    .select()
    .from(like)
    .where(and(eq(like.userId, userId), eq(like.videoId, videoId)));

  return rows.length > 0;
}

export async function addLike(userId: string, videoId: string) {
  const database = assertDb();
  await database.transaction(async (tx) => {

    await tx.insert(like).values({userId,videoId});

    await tx
        .update(video)
        .set({
            likeCount: sql`${video.likeCount} + 1`,
        })
        .where(eq(video.id, videoId));

  });
}

export async function removeLike(userId: string, videoId: string) {
  const database = assertDb();
  await database.transaction(async (tx) => {
    await tx.delete(like).where(and(eq(like.userId, userId), eq(like.videoId, videoId)));
    await tx.update(video)
        .set({
            likeCount: sql`${video.likeCount} - 1`,
        })
        .where(eq(video.id, videoId));
  });
}
