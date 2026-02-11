
import { headers } from "next/headers";
import { auth } from "./auth";
import type { UserRole } from "@/app/db/schema";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    return session.user;
};

export const assertRole = async (requiredRole: UserRole) => {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    if (user.role !== requiredRole) {
        throw new Error("Forbidden");
    }

    return user;
};
