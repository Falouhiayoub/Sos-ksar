import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

// 1. Enums
export const rolesEnum = pgEnum("roles", ["citizen", "volunteer", "admin"]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high", "emergency"]);
export const reportStatusEnum = pgEnum("report_status", ["pending", "dispatched", "resolved", "cancelled"]);

// 2. User Table with Role
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    role: rolesEnum("role").default("citizen").notNull(),
});

// 2b. Reports Table
export const reports = pgTable("reports", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    reporterId: text("reporter_id").notNull().references(() => user.id),
    description: text("description").notNull(),
    category: text("category").notNull(),
    status: reportStatusEnum("status").default("pending").notNull(),
    priority: priorityEnum("priority").default("medium").notNull(),
    latitude: text("latitude").notNull(),
    longitude: text("longitude").notNull(),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
    createdAt: text("createdAt"),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// 5. Verification Table (Better Auth - Email/Magic Link)
export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
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
