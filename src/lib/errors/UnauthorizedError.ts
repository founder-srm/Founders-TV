export class UnauthorizedError extends Error {
    constructor(msg?: string) {
        super("Unauthorized");
        this.name = "UnauthorizedError";
        this.message = msg || "Unauthorized";
    }
}