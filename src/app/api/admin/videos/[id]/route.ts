import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { adminVideoSchema } from "@/validations";
import { video } from "@/database/schemas/video";
import { db } from "@/database/db";
import {eq} from "drizzle-orm";
import { handleApiError } from "@/lib/errors/error-handler";
import { ForbiddenError } from "@/lib/errors/ForbiddenError";
import {BadRequest} from "@/lib/errors/BadRequest"

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const admin = await requireAdmin();
  if (!admin) {
    return handleApiError(new ForbiddenError("Forbidden: User is not an admin."));
  }
  
  try {
    const parsed = adminVideoSchema.safeParse(await request.json());
    if (!parsed.success) {
      return handleApiError(new BadRequest("Invalid video data"));
    }
    await db?.update(video).set(parsed.data).where(eq(video.id, id));
  } 
  catch (error) {
    return handleApiError(new Error("Failed to update video"));
  }

  return NextResponse.json({
    message: `Admin updated video ${id}`,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const admin = await requireAdmin();

  if (!admin) {
    return handleApiError(new ForbiddenError("Forbidden: User is not an admin."));
  }

  try {
    await db?.delete(video).where(eq(video.id, id));
  } 
  catch (error) {
    return handleApiError(new Error("Failed to delete video"));
  }

  return NextResponse.json({
    message: `Admin deleted video ${id}`,
  });
}
