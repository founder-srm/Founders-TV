import { NextResponse } from "next/server";
import { analyticsViewSchema } from "@/validations";
import { trackCollectionView, trackVideoView } from "@/services/analytics";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = analyticsViewSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.videoId) {
    await trackVideoView(parsed.data.videoId);
  }

  if (parsed.data.collectionId) {
    await trackCollectionView(parsed.data.collectionId);
  }

  return NextResponse.json({ ok: true });
}
