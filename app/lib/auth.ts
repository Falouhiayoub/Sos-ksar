
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle";
import * as schema from "@/app/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "citizen",
                input: false, // Don't allow user to set their own role during signup
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
});
