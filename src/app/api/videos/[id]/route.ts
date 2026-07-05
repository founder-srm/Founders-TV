import { NextResponse } from "next/server";
import { getVideoById } from "@/services/videos";
import { trackVideoView } from "@/services/analytics";
import { handleApiError } from "@/lib/errors/error-handler";
import { BadRequest } from "@/lib/errors/BadRequest";
import { getCurrentUser } from "@/lib/auth/current-user";


export async function GET(_request: Request,{ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }
  try {
    const user = await getCurrentUser();
    if(user) {
      await trackVideoView(id, user.id); // Track the video view with user ID
    }
    else {
      await trackVideoView(id); // Track the video view
    }
    return NextResponse.json(video);
  }
  catch (error) {
    return handleApiError(new BadRequest("Error tracking video view"));
  }
}
