"use server";

import { db } from "@/app/lib/drizzle";
import { reports } from "@/app/db/schema";
import { auth } from "@/app/lib/auth"; // Import auth for session check
import { createReportSchema, updateReportStatusSchema } from "@/app/lib/schemas";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export async function createReport(data: unknown) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    const parsed = createReportSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.format() };
    }

    const { type, priority, location, description } = parsed.data;

    try {
        await db.insert(reports).values({
            id: nanoid(),
            type,
            priority,
            location,
            description,
            userId: session.user.id,
        });

        revalidatePath("/dashboard");
        revalidatePath("/command");
        return { success: true };
    } catch (error) {
        console.error("Failed to create report:", error);
        return { error: "Failed to create report" };
    }
}

export async function updateReportStatus(data: unknown) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || (session.user.role !== "admin" && session.user.role !== "volunteer")) {
        throw new Error("Unauthorized: Only admins and volunteers can update status");
    }

    const parsed = updateReportStatusSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.format() };
    }

    const { reportId, status } = parsed.data;

    try {
        await db.update(reports)
            .set({ status })
            .where(eq(reports.id, reportId));

        revalidatePath("/command");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { error: "Failed to update status" };
    }
}

export async function assignVolunteer(reportId: string, volunteerId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || (session.user.role !== "admin" && session.user.role !== "volunteer")) {
        return { error: "Unauthorized" };
    }

    // Volunteers can only assign themselves.
    if (session.user.role === "volunteer" && volunteerId !== session.user.id) {
        // @ts-ignore
        return { error: "Volunteers can only assign themselves." };
    }

    try {
        await db.update(reports)
            .set({ assignedTo: volunteerId })
            .where(eq(reports.id, reportId));

        revalidatePath("/command");
        return { success: true };
    } catch (error) {
        console.error("Failed to assign volunteer:", error);
        return { error: "Failed to assign volunteer" };
    }
}
