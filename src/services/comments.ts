import { and, desc, eq, sql } from "drizzle-orm";
import { assertDb } from "@/database/db";
import { comment, user, video } from "@/database/schemas";

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

export async function createComment(videoId: string,userId: string,body: string) {
  const database = assertDb();
  try {
    await database.update(video)
      .set({
          commentCount: sql`${video.commentCount} + 1`,
      })
      .where(eq(video.id, videoId));
    
    const [created] = await database.insert(comment)
      .values({
        videoId: videoId,
        userId: userId,
        body: body,
      })
      .returning();
    return created;
  }
  catch (error) {
    console.error("Error creating comment:", error);
    return null;
  }
}

export async function updateComment(id: string,userId: string,body: string) {
  const database = assertDb();  
  try {
    const [updated] = await database
      .update(comment)
      .set({ body, updatedAt: new Date() })
      .where(and(eq(comment.id, id), eq(comment.userId, userId)))
      .returning();
  
    return updated ?? null;
  }
  catch (error) {
    console.error("Error updating comment:", error);
    return null;
  }
}

export async function deleteComment(id: string, userId?: string) {
  const database = assertDb();
  let result : any = null;
  try {
    //Delete the comment and decrement the comment count for the associated video
    const commentToDel = await database.query.comment.findFirst({
        where: eq(comment.id, id),
    });
    if (commentToDel) {
      await database.update(video)
        .set({
          commentCount: sql`${video.commentCount} - 1`,
        }).where(eq(video.id, commentToDel.videoId));
      if (userId) {
        result = await database.delete(comment).where(and(eq(comment.id, id), eq(comment.userId, userId))).returning();
      }
      else {
        result = await database.delete(comment).where(eq(comment.id, id)).returning();
      }
      return true;
    }
  }
  catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
}
