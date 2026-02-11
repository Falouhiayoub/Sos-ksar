
import { describe, it, expect, vi, beforeEach } from "vitest";

// We need to mock the MODULES that auth.ts imports, because auth.ts itself
// is executing code at the top level (betterAuth({...})). 
// If that execution fails (e.g. missing DB connection in test), the import fails.

vi.mock("better-auth", () => ({
    betterAuth: vi.fn(() => ({
        api: {
            getSession: vi.fn(),
        },
    })),
}));

vi.mock("better-auth/adapters/drizzle", () => ({
    drizzleAdapter: vi.fn(),
}));

vi.mock("./drizzle", () => ({
    db: {},
}));

vi.mock("@/app/db/schema", () => ({}));

// Now we can import the real auth-utils, which imports the real auth.ts
// But auth.ts should now survive because its dependencies are mocked.
import { assertRole } from "./auth-utils";
import { auth } from "./auth";
import * as headers from "next/headers";

vi.mock("next/headers", () => ({
    headers: vi.fn(),
}));

describe("auth-utils", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // We need to access the mocked auth object. 
    // Since auth.ts exports `const auth = betterAuth(...)`, 
    // and we mocked betterAuth to return an object with api.getSession,
    // `auth` imported here should be that object.

    describe("assertRole", () => {
        it("should throw Unauthorized if no user is logged in", async () => {
            (auth.api.getSession as any).mockResolvedValue(null);
            await expect(assertRole("admin")).rejects.toThrow("Unauthorized");
        });

        it("should throw Forbidden if user role does not match", async () => {
            (auth.api.getSession as any).mockResolvedValue({
                user: { id: "1", role: "citizen" },
                session: {},
            });
            await expect(assertRole("admin")).rejects.toThrow("Forbidden");
        });

        it("should return the user if roles match", async () => {
            const mockUser = { id: "1", role: "admin" };
            (auth.api.getSession as any).mockResolvedValue({
                user: mockUser,
                session: {},
            });
            const result = await assertRole("admin");
            expect(result).toEqual(mockUser);
        });
    });
});
