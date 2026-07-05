import { NextResponse, NextRequest } from "next/server";
import { hasLikedVideo, addLike, removeLike } from "@/services/likes";
import { requireAuth } from "@/lib/auth/require-auth";
import { BadRequest } from "@/lib/errors/BadRequest";
import { handleApiError } from "@/lib/errors/error-handler";

export async function POST(request: Request,{ params }: { params: Promise<{ id: string }> }) {
    const user = await requireAuth();
    const { id } = await params;
    const liked = await hasLikedVideo(user.id, id);
    try {
        if (!id) {
            return handleApiError(new BadRequest("Video ID required"));
        }
        if (liked) {
            return handleApiError(new BadRequest("You have already liked this video"));
        }
        addLike(user.id, id);
        return NextResponse.json({ message: "Video liked successfully" });
    } catch (error) {
        return handleApiError(new BadRequest("Failed to like video"));
    }
}

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> }) {
    const user = await requireAuth();
    const { id } = await params;
    const liked = await hasLikedVideo(user.id, id);
    try {
        if (!id) {
            return handleApiError(new BadRequest("Video ID required"));
        }
        if (!liked) {
            return handleApiError(new BadRequest("You have not liked this video"));
        }
        removeLike(user.id, id);
        return NextResponse.json({ message: "Video unliked successfully" });
    } catch (error) {
        return handleApiError(new BadRequest("Failed to unlike video"));
    }
}
