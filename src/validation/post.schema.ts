import z from "zod";

export const postParamsSchema = z.object({
    id: z.coerce.number().min(1, "Id is required")
});

export const postQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
});