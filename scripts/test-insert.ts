
import { db } from "../app/lib/drizzle";
import { user } from "../app/db/schema";
import { randomUUID } from "crypto";

async function testInsert() {
    console.log('Attempting to insert user...');
    try {
        const newUser = await db.insert(user).values({
            id: randomUUID(),
            name: "Test User Manual",
            email: "test-manual@example.com",
            emailVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: "citizen"
        }).returning();
        console.log('User inserted:', newUser);
    } catch (error) {
        console.error('Insert failed:', error);
    } finally {
        process.exit(0);
    }
}

testInsert();
