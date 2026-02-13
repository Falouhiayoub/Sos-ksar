import { db } from "@/app/lib/drizzle";
import { reports, inventory } from "@/app/db/schema";
import { createReport, updateReportStatus } from "@/app/actions/report-actions";
import { updateStock } from "@/app/actions/inventory-actions";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function TestActionsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Please <a href="/sign-in" className="underline text-blue-500">sign in</a> to test actions.</div>;
    }

    const allReports = await db.select().from(reports);
    const allInventory = await db.select().from(inventory);

    return (
        <div className="p-10 space-y-10">
            <h1 className="text-3xl font-bold">Backend Test Bench</h1>
            <div className="bg-gray-100 p-4 rounded">
                <p>User: <strong>{session.user.name}</strong></p>
                <p>Role: <strong>{session.user.role}</strong> (Must be 'citizen' to report, 'admin'/'volunteer' to update)</p>
            </div>

            {/* Reports Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Reports ({allReports.length})</h2>

                {/* Create Report Form */}
                <form action={async (formData) => {
                    "use server" // Inline server action for simplicity in test bench, wrapping the real one
                    const type = formData.get("type");
                    const priority = formData.get("priority");
                    const location = formData.get("location");
                    const description = formData.get("description");
                    await createReport({ type, priority, location, description });
                    revalidatePath("/test-actions");
                }} className="border p-4 space-y-2 max-w-md">
                    <h3 className="font-bold">Create Report</h3>
                    <select name="type" className="border p-1 w-full">
                        <option value="medical">Medical</option>
                        <option value="security">Security</option>
                        <option value="resource">Resource</option>
                        <option value="other">Other</option>
                    </select>
                    <select name="priority" className="border p-1 w-full">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <input name="location" placeholder="Location" className="border p-1 w-full" defaultValue="Test Location" />
                    <textarea name="description" placeholder="Description" className="border p-1 w-full" defaultValue="Test description for verification" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Report</button>
                </form>

                {/* List Reports */}
                <div className="grid gap-2">
                    {allReports.map(r => (
                        <div key={r.id} className="border p-2 flex justify-between items-center">
                            <div>
                                <span className={`badge ${r.priority === 'high' ? 'text-red-500' : ''}`}>[{r.priority}]</span>
                                <span className="font-bold mx-2">{r.type}</span>
                                <span>{r.status}</span>
                                <p className="text-sm text-gray-600">{r.description} @ {r.location}</p>
                            </div>

                            {/* Update Status Form */}
                            {(session.user.role === 'admin' || session.user.role === 'volunteer') && (
                                <form action={async (formData) => {
                                    "use server"
                                    await updateReportStatus({ reportId: r.id, status: "resolved" });
                                    revalidatePath("/test-actions");
                                }}>
                                    <button className="bg-green-500 text-white text-xs px-2 py-1 rounded">Mark Resolved</button>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Inventory Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Inventory ({allInventory.length})</h2>

                {/* Create Inventory Item (Direct DB for test bench if needed, or just list) */}
                {allInventory.length === 0 && <p>No inventory items. (Need to create seed or manual insert)</p>}

                <div className="grid gap-2">
                    {allInventory.map(i => (
                        <div key={i.id} className="border p-2">
                            {i.name} - Qty: {i.quantity}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
