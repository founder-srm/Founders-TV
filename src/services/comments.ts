import { and, desc, eq } from "drizzle-orm";
import { assertDb } from "@/database/db";
import { comment, user } from "@/database/schemas";

export async function getCommentsByVideo(videoId: string) {
  const database = assertDb();
  return database
    .select({
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      videoId: comment.videoId,
      userId: comment.userId,
      userName: user.name,
      userImage: user.image,
    })
    .from(comment)
    .innerJoin(user, eq(comment.userId, user.id))
    .where(eq(comment.videoId, videoId))
    .orderBy(desc(comment.createdAt));
}

export async function createComment(data: {
  videoId: string;
  userId: string;
  body: string;
}) {
  const database = assertDb();
  const [created] = await database
    .insert(comment)
    .values({
      videoId: data.videoId,
      userId: data.userId,
      body: data.body,
    })
    .returning();

  return created;
}

export async function updateComment(
  id: string,
  userId: string,
  body: string,
) {
  const database = assertDb();
  const [updated] = await database
    .update(comment)
    .set({ body, updatedAt: new Date() })
    .where(and(eq(comment.id, id), eq(comment.userId, userId)))
    .returning();

  return updated ?? null;
}

export async function deleteComment(id: string, userId?: string) {
  const database = assertDb();
  if (userId) {
    const result = await database
      .delete(comment)
      .where(and(eq(comment.id, id), eq(comment.userId, userId)));
    return result.rowCount !== null && result.rowCount > 0;
  }

  const result = await database.delete(comment).where(eq(comment.id, id));
  return result.rowCount !== null && result.rowCount > 0;
}
