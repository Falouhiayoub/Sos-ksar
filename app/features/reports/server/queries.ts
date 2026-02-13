import { db } from "@/app/db";
import { reports } from "@/app/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserReports() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return [];
    }

    return await db.query.reports.findMany({
        where: eq(reports.reporterId, session.user.id),
        orderBy: [desc(reports.createdAt)],
    });
}
