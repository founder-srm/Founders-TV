import { NextResponse } from "next/server";
import { auth, type AuthUser } from "@/lib/auth";

function isAdminUser(user: AuthUser | null | undefined): user is AuthUser & { role: string } {
  return !!user && user.role === "ADMIN";
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: request.headers });

  if (!isAdminUser(session?.user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    message: `Admin update endpoint ready for collection ${id}`,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: request.headers });

  if (!isAdminUser(session?.user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    message: `Admin delete endpoint ready for collection ${id}`,
  });
}
