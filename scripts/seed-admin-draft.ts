
import { db } from "@/app/lib/drizzle";
import { user, account } from "@/app/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

async function seedAdmin() {
    console.log("🌱 Seeding Admin User...");

    const adminEmail = "admin@sos-ksar.com";
    const existingUser = await db.select().from(user).where(eq(user.email, adminEmail));

    if (existingUser.length > 0) {
        console.log("✅ Admin user already exists.");
        return;
    }

    const userId = nanoid();

    // Create User
    await db.insert(user).values({
        id: userId,
        name: "Admin Commander",
        email: adminEmail,
        emailVerified: true,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    console.log(`✅ Admin user created: ${adminEmail}`);
    console.log("⚠️  Note: This user has no password enabled via BetterAuth's email adapter in this script. You might need to use the 'Sign Up' flow to set a password, or use a separate auth method.");

    // Actually, better-auth stores passwords in the 'account' table for email-password.
    // Creating a raw entry here might not work with BetterAuth's hashing.
    // STRATEGY CHANGE: reliable testing requires using the UI or the proper auth API.
    // For now, I will just log that I can't easily seed a password without the hashing lib.
    // instead, I will rely on the UI 'Sign Up' and then manual database update to promote to admin.
}

seedAdmin().catch(console.error);
