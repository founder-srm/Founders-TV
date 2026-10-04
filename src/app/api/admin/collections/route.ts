import { NextResponse } from "next/server";
import { requireApiKey } from "@/lib/auth/require-api-key";
import { adminCollectionSchema } from "@/validations";
import { db } from "@/database/db";
import { collection } from "@/database/schemas/collection";
import { BadRequest } from "@/lib/errors/BadRequest";
import { handleApiError } from "@/lib/errors/error-handler";

export async function POST(request: Request) {
  try {
    await requireApiKey(request);
    const json = await request.json();
    const parsed = adminCollectionSchema.safeParse(json);
  
    if (!parsed.success) {
      return handleApiError(new BadRequest("Invalid request body"));
    }
  
    await db?.insert(collection).values({
      name: parsed.data.name,
      thumbnail: parsed.data.thumbnail,
      description: parsed.data.description,
    });
    return NextResponse.json(
      {
        message: `Created collection ${parsed.data.name} successfully.`,
        data: parsed.data,
      },
      { status: 201 },
    );
  }
  catch (error) {
    return handleApiError(error);
  }
}
