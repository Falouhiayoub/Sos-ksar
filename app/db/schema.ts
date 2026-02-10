import { pgTable, text, timestamp, uuid, integer, decimal, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const reportStatusEnum = pgEnum("report_status", ["pending", "dispatched", "resolved", "cancelled"]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high", "emergency"]);
export const userRoleEnum = pgEnum("user_role", ["citizen", "dispatcher", "responder", "admin"]);

// Auth Tables (Better Auth)
export const users = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified").notNull(),
    image: text("image"),
    role: userRoleEnum("role").default("citizen").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const sessions = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verifications = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
});

// SOS Reports
export const reports = pgTable("reports", {
    id: uuid("id").primaryKey().defaultRandom(),
    reporterId: text("reporter_id").notNull().references(() => users.id),
    description: text("description").notNull(),
    category: text("category").notNull(), // medical, fire, etc.
    status: reportStatusEnum("status").default("pending").notNull(),
    priority: priorityEnum("priority").default("medium").notNull(),
    latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
    longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Inventory
export const inventory = pgTable("inventory", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    quantity: integer("quantity").default(0).notNull(),
    unit: text("unit").notNull(), // kg, pcs, liters
    category: text("category").notNull(),
    minThreshold: integer("min_threshold").default(5),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
