export class ForbiddenError extends Error {
    constructor(msg?: string) {
        super("Forbidden");
        this.name = "ForbiddenError";
        this.message = msg || "Forbidden";
    }
}