export class NotFoundError extends Error {
    constructor(msg?: string) {
        super("Not Found");
        this.name = "NotFoundError";
        this.message = msg || "Not Found";
    }
}