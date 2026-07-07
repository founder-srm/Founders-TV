import { NextResponse } from "next/server";
import { searchVideos } from "@/services/videos";
import { searchSchema } from "@/validations";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "";
    const limit = Number(searchParams.get("limit") ?? 12);

    const parsed = searchSchema.safeParse({ q: query, limit });

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const videos = await searchVideos(parsed.data.q, parsed.data.limit);
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
