export class BadRequest extends Error {
    constructor(msg?: string) {
        super("Bad Request");
        this.name = "BadRequestError";
        this.message = msg || "Bad Request";
    }
}