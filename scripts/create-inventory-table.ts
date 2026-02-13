import { db } from "./app/db";
import { sql } from "drizzle-orm";

async function createInventoryTable() {
    try {
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS inventory (
                id text PRIMARY KEY NOT NULL,
                item_name text NOT NULL,
                category text NOT NULL,
                stock_level text NOT NULL,
                unit text NOT NULL,
                updated_at timestamp DEFAULT now() NOT NULL
            )
        `);
        console.log("✅ Inventory table created successfully");
    } catch (error) {
        console.error("❌ Error creating inventory table:", error);
        throw error;
    }
}

createInventoryTable().catch(console.error);
