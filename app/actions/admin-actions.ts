"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { db } from "@/app/lib/drizzle";
import { reports, user } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteReport(reportId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return { error: "Unauthorized: Admins only" };
    }

    try {
        await db.delete(reports).where(eq(reports.id, reportId));
        revalidatePath("/command");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete report:", error);
        return { error: "Failed to delete report" };
    }
}

export async function updateUserRole(targetUserId: string, newRole: "citizen" | "volunteer" | "admin") {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return { error: "Unauthorized: Admins only" };
    }

    try {
        await db.update(user).set({ role: newRole }).where(eq(user.id, targetUserId));
        revalidatePath("/admin/users"); // Assuming we'll build this page
        return { success: true };
    } catch (error) {
        console.error("Failed to update user role:", error);
        return { error: "Failed to update user role" };
    }
}
