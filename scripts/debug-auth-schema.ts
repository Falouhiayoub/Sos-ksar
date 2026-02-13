import { db } from "../app/lib/drizzle";
import { user } from "../app/db/schema";
import { nanoid } from "nanoid";

async function debugInsert() {
    console.log("Attempting direct Drizzle insert...");
    try {
        const newUser = await db.insert(user).values({
            id: nanoid(),
            name: "Debug User",
            email: `debug_${Date.now()}@example.com`,
            emailVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: "citizen"
        }).returning();

        console.log("SUCCESS: User inserted:", newUser);
    } catch (error: any) {
        console.error("FAILURE: Insert failed.");
        console.error("Error Message:", error.message);
        console.error("Error Code:", error.code);
        if (error.detail) console.error("Error Detail:", error.detail);
        if (error.hint) console.error("Error Hint:", error.hint);
    }
}

debugInsert();
