import { z } from "zod";

export const reportTypeEnum = z.enum(["medical", "security", "resource", "other"]);
export const reportStatusEnum = z.enum(["pending", "in_progress", "resolved"]);
export const reportPriorityEnum = z.enum(["low", "medium", "high", "critical"]);

export const createReportSchema = z.object({
    type: reportTypeEnum,
    priority: reportPriorityEnum,
    location: z.string().min(5, "Location must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export const updateReportStatusSchema = z.object({
    reportId: z.string(),
    status: reportStatusEnum,
});

export const inventorySchema = z.object({
    name: z.string().min(2),
    category: z.string(),
    quantity: z.number().int().nonnegative(),
    status: z.enum(["available", "low", "out_of_stock"]),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateReportStatusInput = z.infer<typeof updateReportStatusSchema>;
export type InventoryItem = z.infer<typeof inventorySchema>;
