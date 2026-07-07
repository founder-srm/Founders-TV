import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { adminCollectionSchema } from "@/validations";
import { db } from "@/database/db";
import { collection } from "@/database/schemas/collection";
import { BadRequest } from "@/lib/errors/BadRequest";
import { handleApiError } from "@/lib/errors/error-handler";

export async function POST(request: Request) {
  // Ensures the request is authenticated and the user is an admin.
  const admin = await requireAdmin();

  try {
    const json = await request.json();
    const parsed = adminCollectionSchema.safeParse(json);
  
    if (!parsed.success) {
      return handleApiError(new BadRequest("Invalid request body"));
    }
  
    await db?.insert(collection).values({
      name: parsed.data.name,
      thumbnail: parsed.data.thumbnail,
      description: parsed.data.description,
      createdById: admin.id,
    });
    return NextResponse.json(
      {
        message: `Admin created collection ${parsed.data.name} successfully.`,
        data: parsed.data,
      },
      { status: 201 },
    );
  }
  catch (error) {
    return handleApiError(error);
  }
}
