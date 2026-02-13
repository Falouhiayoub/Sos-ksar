import "dotenv/config";
import { db } from "../app/lib/drizzle";
import { user } from "../app/db/schema";
import { eq } from "drizzle-orm";
import { authClient } from "../app/lib/auth-client"; // This won't work in node script without polyfills, using direct DB check instead assuming manual signup

async function checkUserRole() {
    // This script assumes you have just signed up a user via the browser
    // It will check the most recently created user

    try {
        const users = await db.select().from(user).orderBy(user.createdAt);
        const lastUser = users[users.length - 1];

        if (!lastUser) {
            console.log("No users found.");
            return;
        }

        console.log(`Checking role for user: ${lastUser.email}`);
        console.log(`Role: ${lastUser.role}`);

        if (lastUser.role === 'citizen') {
            console.log("SUCCESS: User has correct default role 'citizen'.");
        } else {
            console.error(`FAILURE: User has role '${lastUser.role}', expected 'citizen'.`);
            process.exit(1);
        }
    } catch (error) {
        console.error("Error checking user role:", error);
        process.exit(1);
    }
}

checkUserRole();
