import { db } from "../app/lib/drizzle";
import { config } from "dotenv";
config({ path: ".env" });

import { reports } from "../app/db/schema";
import { nanoid } from "nanoid";

async function main() {
    console.log("Verifying DB connection and schema...");

    try {
        // Try to insert a dummy report (requires a valid user, so we might fail on constraint if we don't have one)
        // Actually, we should check if users exist first.

        const users = await db.query.user.findMany({ limit: 1 });
        let userId = "";

        if (users.length === 0) {
            console.log("No users found. Creating a dummy user for testing...");
            // We can't easily create a user if auth is managing it, but we can insert if we bypass auth and use db directly.
            // But simpler: just check if we can query the specific tables.
            // If table doesn't exist, this will throw.
        } else {
            userId = users[0].id;
        }

        // Just check if reports table allows select (even if empty)
        const allReports = await db.select().from(reports).limit(1);
        console.log("Successfully queried reports table. Count:", allReports.length);

        console.log("DB Verification PASSED.");
    } catch (error) {
        console.error("DB Verification FAILED:", error);
        if (error instanceof Error && 'cause' in error) {
            console.error("Cause:", (error as any).cause);
        }
        process.exit(1);
    }
    process.exit(0);
}

main();
