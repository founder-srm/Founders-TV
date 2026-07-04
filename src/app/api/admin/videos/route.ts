import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { handleApiError } from "@/lib/errors/error-handler";
import { adminVideoSchema } from "@/validations";
import { video } from "@/database/schemas/video";
import { db } from "@/database/db";

export async function POST(request: Request) {
    try {
        // Ensures the request is authenticated and the user is an admin.
        const admin = await requireAdmin();

        const body = await request.json();

        const parsed = adminVideoSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: parsed.error.flatten(),
                },
                {
                    status: 400,
                }
            );
        }
        await db?.insert(video).values({
            youtubeId: parsed.data.youtubeId,
            title: parsed.data.title,
            thumbnailUrl: parsed.data.thumbnailUrl,
            description: parsed.data.description,
            collectionId: parsed.data.collectionId,
            publishedAt: parsed.data.publishedAt,
            createdById: admin.id,
        });
        
        return NextResponse.json(
            {
                message: `Admin created video ${parsed.data.title} successfully.`,
                createdBy: admin.id,
                data: parsed.data,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        return handleApiError(error);
    }
}