import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { handleApiError } from "@/lib/errors/error-handler";
import { adminVideoSchema } from "@/validations";

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
        return NextResponse.json(
            {
                message: "Admin video creation endpoint is ready.",
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