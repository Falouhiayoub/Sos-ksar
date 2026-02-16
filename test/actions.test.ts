import { describe, it, expect, vi, beforeEach } from "vitest";
import { createReport, updateReportStatus } from "@/app/actions/report-actions";
import { updateStock } from "@/app/actions/inventory-actions"; // Fixed import path
import { db } from "@/app/lib/drizzle";
import { reports, inventory } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/app/lib/auth";

// Mock Next Headers
vi.mock("next/headers", () => ({
    headers: vi.fn(),
}));

// Mock Next Cache
vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

// Mock Auth
vi.mock("@/app/lib/auth", () => ({
    auth: {
        api: {
            getSession: vi.fn(),
        },
    },
}));

// Mock DB
vi.mock("@/app/lib/drizzle", () => ({
    db: {
        insert: vi.fn(() => ({ values: vi.fn() })),
        update: vi.fn(() => ({ set: vi.fn(() => ({ where: vi.fn() })) })), // Chainable
    },
}));

// Mock Validation Schemas to avoid complex Zod mocking if possible, 
// strictly we don't mock schemas, we test them indirectly.

// Mock Validation Schemas to avoid complex Zod mocking if possible, 
// strictly we don't mock schemas, we test them indirectly.

// We need to type the mock
const mockedAuth = auth as unknown as { api: { getSession: any } };

describe("Server Actions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Report Actions", () => {
        it("should create a report when authenticated", async () => {
            // Setup Auth Mock
            mockedAuth.api.getSession.mockResolvedValue({
                user: { id: "user-123", role: "citizen" },
            });

            // Setup DB Mock
            // We need to return an object that allows .values() to be called.
            // But db.insert(table).values(...) is the chain.
            // db.insert returns { values: fn }
            const valuesMock = vi.fn().mockResolvedValue({ rowCount: 1 });
            (db.insert as any).mockReturnValue({ values: valuesMock });

            const result = await createReport({
                type: "medical",
                priority: "high",
                location: "Main St",
                description: "Medical emergency here",
            });

            expect(result).toEqual({ success: true });
            expect(db.insert).toHaveBeenCalledWith(reports);
            expect(valuesMock).toHaveBeenCalledWith(expect.objectContaining({
                type: "medical",
                priority: "high",
                userId: "user-123",
            }));
        });

        it("should fail to update status if not authorized", async () => {
            mockedAuth.api.getSession.mockResolvedValue({
                user: { id: "user-123", role: "citizen" },
            });

            await expect(updateReportStatus({
                reportId: "rep-1",
                status: "resolved",
            })).rejects.toThrow("Unauthorized: Only admins and volunteers can update status");
        });
    });

    describe("Inventory Actions", () => {
        it("should update stock if admin", async () => {
            mockedAuth.api.getSession.mockResolvedValue({
                user: { id: "admin-1", role: "admin" },
            });

            const whereMock = vi.fn().mockResolvedValue({});
            const setMock = vi.fn().mockReturnValue({ where: whereMock });
            (db.update as any).mockReturnValue({ set: setMock });

            const result = await updateStock({
                itemId: "item-1",
                quantity: 50,
            });

            expect(result).toEqual({ success: true });
            expect(setMock).toHaveBeenCalledWith(expect.objectContaining({ quantity: 50 }));
        });
    });
});
