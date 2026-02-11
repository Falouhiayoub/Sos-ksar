
"use server";

import { getCurrentUser } from "@/app/lib/auth-utils";
import { type UserRole, user } from "@/app/db/schema";
import { db } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * DEV TOOL ONLY
 * Switches the current user's role.
 */
export const switchRole = async (newRole: UserRole) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("Unauthorized");
    }

    // In a real production app, you might want to restrict this further
    // e.g. if (process.env.NODE_ENV !== 'development' && currentUser.role !== 'admin') ...

    await db
        .update(user)
        .set({ role: newRole })
        .where(eq(user.id, currentUser.id));

    revalidatePath("/");

    return { success: true, newRole };
};
