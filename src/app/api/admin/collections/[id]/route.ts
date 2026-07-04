import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/database/db";
import { collection } from "@/database/schemas/collection";
import { eq } from "drizzle-orm";
import { handleApiError } from "@/lib/errors/error-handler";
import { BadRequest } from "@/lib/errors/BadRequest";
import { adminCollectionSchema } from "@/validations";

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }> },) {
  const admin = await requireAdmin();
  const { id } = await params;
  const json = await request.json();
  const parsed = adminCollectionSchema.safeParse(json);
  if (!parsed.success) { return handleApiError(new BadRequest("Invalid collection data")); }
  try {
    await db?.update(collection).set(parsed.data).where(eq(collection.id, id));
  } 
  catch (error) {
    return handleApiError(new BadRequest("Failed to update collection"));
  }

  return NextResponse.json({
    message: `Admin updated collection ${id}`,
  });
}

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> },) {
  const admin = await requireAdmin();
  const { id } = await params;

  try {
    await db?.delete(collection).where(eq(collection.id, id));
  } 
  catch (error) {
    return handleApiError(new BadRequest("Failed to delete collection"));
  }

  return NextResponse.json({
    message: `Admin deleted collection ${id}`,
  });
}
