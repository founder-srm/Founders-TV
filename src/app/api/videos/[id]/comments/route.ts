import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { createCommentSchema } from "@/validations";
import { deleteComment, updateComment, createComment } from "@/services/comments";
import { handleApiError } from "@/lib/errors/error-handler";
import { BadRequest } from "@/lib/errors/BadRequest";
import { NotFoundError } from "@/lib/errors/NotFoundError";

export async function POST(request: Request,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; //Video ID
  const user = await requireAuth();

  const json = await request.json();
  const parsed = createCommentSchema.safeParse(json);

  if (!parsed.success) {
    return handleApiError(new BadRequest("Invalid request body"));
  }

  const comment = await createComment(id,user.id,parsed.data.body);

  if (comment === null) {
    return handleApiError(new NotFoundError("Comment not found"));
  }

  return NextResponse.json(comment);
}


export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireAuth();

  const json = await request.json();
  const parsed = createCommentSchema.safeParse(json);

  if (!parsed.success) {
    return handleApiError(new BadRequest("Invalid request body"));
  }

  const updated = await updateComment(
    id,
    user.id,
    parsed.data.body,
  );

  if (!updated) {
    return handleApiError(new NotFoundError("Comment not found"));
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> },) {
  const { id } = await params;
  const user = await requireAuth();

  const deleted = await deleteComment(id, user.id);

  if (!deleted) {
    return handleApiError(new NotFoundError("Comment not found"));
  }

  return NextResponse.json({status:200, ok: true });
}
