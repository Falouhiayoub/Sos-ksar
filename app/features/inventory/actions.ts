"use server";

import { db } from "@/app/db";
import { inventory } from "@/app/db/schema";
import { sql } from "drizzle-orm";

export async function getInventoryItems() {
    try {
        // First, ensure the table exists
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

        // Fetch all inventory items
        const items = await db.select().from(inventory);
        return items;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return [];
    }
}

export async function seedInventoryData() {
    try {
        // Check if data already exists
        const existingItems = await db.select().from(inventory);

        if (existingItems.length === 0) {
            // Insert sample data
            await db.insert(inventory).values([
                {
                    id: crypto.randomUUID(),
                    itemName: "Couvertures",
                    category: "Urgence",
                    stockLevel: "45",
                    unit: "unités",
                    updatedAt: new Date(),
                },
                {
                    id: crypto.randomUUID(),
                    itemName: "Eau potable",
                    category: "Nourriture",
                    stockLevel: "120",
                    unit: "litres",
                    updatedAt: new Date(),
                },
                {
                    id: crypto.randomUUID(),
                    itemName: "Trousses médicales",
                    category: "Médical",
                    stockLevel: "12",
                    unit: "kits",
                    updatedAt: new Date(),
                },
                {
                    id: crypto.randomUUID(),
                    itemName: "Lampes torches",
                    category: "Équipement",
                    stockLevel: "28",
                    unit: "unités",
                    updatedAt: new Date(),
                },
                {
                    id: crypto.randomUUID(),
                    itemName: "Piles",
                    category: "Équipement",
                    stockLevel: "150",
                    unit: "unités",
                    updatedAt: new Date(),
                },
                {
                    id: crypto.randomUUID(),
                    itemName: "Rations alimentaires",
                    category: "Nourriture",
                    stockLevel: "80",
                    unit: "portions",
                    updatedAt: new Date(),
                },
            ]);
            console.log("✅ Inventory seeded successfully");
        }

        return { success: true };
    } catch (error) {
        console.error("Error seeding inventory:", error);
        return { success: false, error };
    }
}
