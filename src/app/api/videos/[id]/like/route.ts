import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { addLike, hasLikedVideo, removeLike } from "@/services/likes";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const liked = await hasLikedVideo(session.user.id, id);
  if (liked) {
    return NextResponse.json({ ok: true });
  }

  await addLike(session.user.id, id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await removeLike(session.user.id, id);
  return NextResponse.json({ ok: true });
}
