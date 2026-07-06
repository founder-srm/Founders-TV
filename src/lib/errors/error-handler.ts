import { NextResponse } from "next/server";
import { UnauthorizedError } from "./UnauthorizedError";
import { ForbiddenError } from "./ForbiddenError";
import { NotFoundError } from "./NotFoundError";
import { BadRequest } from "./BadRequest";

export function handleApiError(error : unknown) {
    if (error instanceof UnauthorizedError) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    else if (error instanceof ForbiddenError) {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }
    else if (error instanceof NotFoundError) {
        return NextResponse.json(
            { error: "Not Found" },
            { status: 404 }
        );
    }
    else if (error instanceof BadRequest) {
        return NextResponse.json(
            { error: "Bad Request" },
            { status: 400 }
        );
    }
    else {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}