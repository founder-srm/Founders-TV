import { eq } from "drizzle-orm";
import { assertDb } from "@/database/db";
import { user } from "@/database/schemas";

export async function getProfileById(userId: string) {
  const database = assertDb();
  const rows = await database
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .where(eq(user.id, userId));

  return rows[0] ?? null;
}

export async function updateProfileById(
  userId: string,
  data: { name?: string; image?: string },
) {
  const database = assertDb();
  const [updated] = await database
    .update(user)
    .set({
      name: data.name,
      image: data.image,
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId))
    .returning();

  return updated ?? null;
}
