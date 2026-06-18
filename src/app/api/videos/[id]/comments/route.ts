import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCommentSchema } from "@/validations";
import { createComment, getCommentsByVideo } from "@/services/comments";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const comments = await getCommentsByVideo(id);
  return NextResponse.json(comments);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = createCommentSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const comment = await createComment({
    videoId: id,
    userId: session.user.id,
    body: parsed.data.body,
  });

  return NextResponse.json(comment, { status: 201 });
}
