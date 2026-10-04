import { NextResponse } from "next/server";
import { UnauthorizedError } from "@/lib/errors/UnauthorizedError";
import { requireApiKey } from "@/lib/auth/require-api-key";
import { adminVideoSchema } from "@/validations";
import { video } from "@/database/schemas/video";
import { db } from "@/database/db";
import {eq} from "drizzle-orm";
import { handleApiError } from "@/lib/errors/error-handler";
import {BadRequest} from "@/lib/errors/BadRequest"

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await requireApiKey(request);
    const parsed = adminVideoSchema.safeParse(await request.json());
    if (!parsed.success) {
      return handleApiError(new BadRequest("Invalid video data"));
    }
    await db?.update(video).set(parsed.data).where(eq(video.id, id));
  } 
  catch (error) {
    if (error instanceof UnauthorizedError) return handleApiError(error);
    return handleApiError(new Error("Failed to update video"));
  }

  return NextResponse.json({
    message: `Updated video ${id}`,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await requireApiKey(request);
    await db?.delete(video).where(eq(video.id, id));
  } 
  catch (error) {
    if (error instanceof UnauthorizedError) return handleApiError(error);
    return handleApiError(new Error("Failed to delete video"));
  }

  return NextResponse.json({
    message: `Deleted video ${id}`,
  });
}
