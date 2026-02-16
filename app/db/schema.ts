import { pgTable, text, timestamp, boolean, pgEnum, integer } from "drizzle-orm/pg-core";

// 1. Enums
export const rolesEnum = pgEnum("roles", ["citizen", "volunteer", "admin"]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high", "emergency"]);
// 2. User Table with Role
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    role: rolesEnum("role").default("citizen").notNull(),
});

// 3. Session Table (Better Auth)
export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
});

// 4. Account Table (Better Auth - OAuth)
export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

// 5. Verification Table (Better Auth - Email/Magic Link)
export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
});

// 6. Enums for Reports & Inventory
export const reportTypeEnum = pgEnum("report_type", ["medical", "security", "resource", "other"]);
export const reportStatusEnum = pgEnum("report_status", ["pending", "in_progress", "resolved"]);
export const reportPriorityEnum = pgEnum("report_priority", ["low", "medium", "high", "critical"]);
export const inventoryStatusEnum = pgEnum("inventory_status", ["available", "low", "out_of_stock"]);

// 7. Reports Table
export const reports = pgTable("reports", {
    id: text("id").primaryKey(),
    type: reportTypeEnum("type").notNull(),
    status: reportStatusEnum("status").default("pending").notNull(),
    priority: reportPriorityEnum("priority").default("medium").notNull(),
    location: text("location").notNull(),
    description: text("description").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
    assignedTo: text("assignedTo")
        .references(() => user.id), // Volunteer ID
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(), // Should be updated manually or via triggers
});

// 6. Inventory Table
export const inventory = pgTable("inventory", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    itemName: text("item_name").notNull(),
    category: text("category").notNull(),
    stockLevel: text("stock_level").notNull(), // Using text to allow for units like "10 kg", "5 units" etc or just numbers
    unit: text("unit").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type Inference
export type UserRole = "citizen" | "volunteer" | "admin";
export type InventoryItem = typeof inventory.$inferSelect;
