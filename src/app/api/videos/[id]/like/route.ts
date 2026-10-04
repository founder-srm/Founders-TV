import { NextResponse, NextRequest } from "next/server";
import { hasLikedVideo, addLike, removeLike } from "@/services/likes";
import { getCurrentUser } from "@/lib/auth/current-user";
import { requireAuth } from "@/lib/auth/require-auth";
import { BadRequest } from "@/lib/errors/BadRequest";
import { handleApiError } from "@/lib/errors/error-handler";

export async function POST(request: Request,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await requireAuth();
        const { id } = await params;
        if (!id) {
            return handleApiError(new BadRequest("Video ID required"));
        }
        if (await hasLikedVideo(user.id, id)) {
            // Already liked: the desired end state, so treat as success.
            return NextResponse.json({ message: "Video already liked" });
        }
        await addLike(user.id, id);
        return NextResponse.json({ message: "Video liked successfully" });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await requireAuth();
        const { id } = await params;
        if (!id) {
            return handleApiError(new BadRequest("Video ID required"));
        }
        if (!(await hasLikedVideo(user.id, id))) {
            return NextResponse.json({ message: "Video already unliked" });
        }
        await removeLike(user.id, id);
        return NextResponse.json({ message: "Video unliked successfully" });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function GET(request: Request,{ params }: { params: Promise<{ id: string }> }) {
    const user = await getCurrentUser();
    const { id } = await params;
    if (!id) {
        return handleApiError(new BadRequest("Video ID required"));
    }
    if (!user) {
        return NextResponse.json({ liked: false });
    }
    try {
        const liked = await hasLikedVideo(user.id, id);
        return NextResponse.json({ liked });
    } catch (error) {
        return handleApiError(new BadRequest("Failed to check like status"));
    }
}
