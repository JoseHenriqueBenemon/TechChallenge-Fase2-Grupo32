export class NotFoundError extends Error {
    constructor(entity: string) {
        super(`${entity} Not Found!`);
    }
}