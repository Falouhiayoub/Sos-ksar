import { sql } from "drizzle-orm";
import { db } from "../app/lib/drizzle";

async function resetAuth() {
    console.log("Dropping auth tables...");
    try {
        await db.execute(sql`DROP TABLE IF EXISTS "account" CASCADE;`);
        await db.execute(sql`DROP TABLE IF EXISTS "session" CASCADE;`);
        await db.execute(sql`DROP TABLE IF EXISTS "verification" CASCADE;`);
        await db.execute(sql`DROP TABLE IF EXISTS "user" CASCADE;`); // User last or cascade
        await db.execute(sql`DROP TYPE IF EXISTS "roles";`);
        console.log("SUCCESS: Authentication tables dropped.");
    } catch (error) {
        console.error("FAILURE: Drop failed.", error);
    }
}

resetAuth();
