import { NextResponse, NextRequest } from "next/server";
import { hasLikedVideo, addLike, removeLike } from "@/services/likes";
import { requireAuth } from "@/lib/auth/require-auth";
import { BadRequest } from "@/lib/errors/BadRequest";
import { handleApiError } from "@/lib/errors/error-handler";

export async function POST(request: NextRequest) {
    const user = await requireAuth();
    const searchParams = request.nextUrl.searchParams;
    const videoId = searchParams.get('id'); // URL: /api/products?id=324234
    try {
        if (!videoId) {
            return handleApiError(new BadRequest("Video ID required"));
        }
        addLike(user.id, videoId);
        return NextResponse.json({ message: "Video liked successfully" });
    } catch (error) {
        return handleApiError(new BadRequest("Failed to like video"));
    }
}
