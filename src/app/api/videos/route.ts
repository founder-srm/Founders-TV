import { NextResponse } from "next/server";
import { getLatestVideos } from "@/services/videos";

export async function GET() {
  const videos = await getLatestVideos();
  return NextResponse.json(videos);
}
