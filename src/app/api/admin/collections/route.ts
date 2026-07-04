import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { adminCollectionSchema } from "@/validations";
import { db } from "@/database/db";
import { collection } from "@/database/schemas/collection";

export async function POST(request: Request) {
  // Ensures the request is authenticated and the user is an admin.
  const admin = await requireAdmin();

  const json = await request.json();
  const parsed = adminCollectionSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await db?.insert(collection).values({
    name: parsed.data.name,
    thumbnail: parsed.data.thumbnail,
    description: parsed.data.description,
    createdById: admin.id,
  });

  return NextResponse.json(
    {
      message: "Admin collection creation endpoint is ready",
      data: parsed.data,
    },
    { status: 201 },
  );
}
