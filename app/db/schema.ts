import { pgTable, text, timestamp, boolean, pgEnum, integer } from "drizzle-orm/pg-core";

// 1. Enum for Roles
export const rolesEnum = pgEnum("roles", ["citizen", "volunteer", "admin"]);

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

// Type Inference
export type UserRole = "citizen" | "volunteer" | "admin";

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
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(), // Should be updated manually or via triggers
});

// 8. Inventory Table
export const inventory = pgTable("inventory", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    quantity: integer("quantity").notNull(),
    status: inventoryStatusEnum("status").default("available").notNull(),
    lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type Inventory = typeof inventory.$inferSelect;
