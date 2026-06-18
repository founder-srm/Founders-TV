import { NextResponse } from "next/server";
import { getCollectionBySlug, getCollectionVideos } from "@/services/collections";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  const videos = await getCollectionVideos(collection.id);

  return NextResponse.json({
    ...collection,
    videos,
  });
}
