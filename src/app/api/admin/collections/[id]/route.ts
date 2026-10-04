import { NextResponse } from "next/server";
import { UnauthorizedError } from "@/lib/errors/UnauthorizedError";
import { requireApiKey } from "@/lib/auth/require-api-key";
import { db } from "@/database/db";
import { collection } from "@/database/schemas/collection";
import { eq } from "drizzle-orm";
import { handleApiError } from "@/lib/errors/error-handler";
import { BadRequest } from "@/lib/errors/BadRequest";
import { adminCollectionSchema } from "@/validations";

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }> },) {
  const { id } = await params;
  try {
    await requireApiKey(request);
    const json = await request.json();
    const parsed = adminCollectionSchema.safeParse(json);
    if (!parsed.success) { return handleApiError(new BadRequest("Invalid collection data")); }
    await db?.update(collection).set(parsed.data).where(eq(collection.id, id));
  } 
  catch (error) {
    if (error instanceof UnauthorizedError) return handleApiError(error);
    return handleApiError(new BadRequest("Failed to update collection"));
  }

  return NextResponse.json({
    message: `Updated collection ${id}`,
  });
}

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> },) {
  const { id } = await params;

  try {
    await requireApiKey(request);
    await db?.delete(collection).where(eq(collection.id, id));
  } 
  catch (error) {
    if (error instanceof UnauthorizedError) return handleApiError(error);
    return handleApiError(new BadRequest("Failed to delete collection"));
  }

  return NextResponse.json({
    message: `Deleted collection ${id}`,
  });
}
