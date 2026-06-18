import { NextResponse } from "next/server";
import { searchSchema } from "@/validations";
import { searchVideos } from "@/services/videos";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  const parsed = searchSchema.safeParse({ q: query, limit: searchParams.get("limit") ?? undefined });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const results = await searchVideos(parsed.data.q, parsed.data.limit);
  return NextResponse.json(results);
}
