"use server";

import { db } from "@/app/lib/drizzle";
import { inventory } from "@/app/db/schema";
import { auth } from "@/app/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const updateStockSchema = z.object({
    itemId: z.string(),
    quantity: z.number().int(), // Can be negative to decrease stock
});

export async function updateStock(data: unknown) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        // Maybe volunteers can update stock too? For now, stick to admin or volunteer.
        // Let's say volunteers can too.
        if (session?.user.role !== "volunteer") {
            return { error: "Unauthorized" };
        }
    }

    const parsed = updateStockSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.format() };
    }

    const { itemId, quantity } = parsed.data;

    try {
        // We need to fetch the current Item to calculate new quantity or just set it?
        // Use case: "Add 5 bandages" vs "Set to 50".
        // Let's assume the UI sends the NEW TOTAL or the CHANGE? 
        // Plan says "updateStock(id, quantity)". I'll assume it sets the absolute quantity for simplicity, 
        // or I can do an increment. Setting absolute is safer if the UI handles the math.

        await db.update(inventory)
            .set({ quantity, lastUpdated: new Date() })
            .where(eq(inventory.id, itemId));

        revalidatePath("/command");
        return { success: true };
    } catch (error) {
        console.error("Failed to update stock:", error);
        return { error: "Failed to update stock" };
    }
}
