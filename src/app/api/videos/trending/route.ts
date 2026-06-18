import { NextResponse } from "next/server";
import { getTrendingVideos } from "@/services/videos";

export async function GET() {
  const videos = await getTrendingVideos();
  return NextResponse.json(videos);
}
