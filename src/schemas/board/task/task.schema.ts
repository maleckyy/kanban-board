import z from "zod";

export const updateTaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.string(),
    endDate: z.string().nullable()
});