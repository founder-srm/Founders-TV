import { NextResponse } from "next/server";
import { auth, type AuthUser } from "@/lib/auth";
import { adminVideoSchema } from "@/validations";

function isAdminUser(user: AuthUser | null | undefined): user is AuthUser & { role: string } {
  return !!user && user.role === "ADMIN";
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!isAdminUser(session?.user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await request.json();
  const parsed = adminVideoSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "Admin video creation endpoint is ready",
      data: parsed.data,
    },
    { status: 201 },
  );
}
