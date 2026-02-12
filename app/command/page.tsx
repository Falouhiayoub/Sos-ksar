import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/drizzle";
import { reports, inventory } from "@/app/db/schema";
import { LiveFeed } from "@/components/command/live-feed";
import { InventoryPanel } from "@/components/command/inventory-panel";
import { desc } from "drizzle-orm";

export default async function CommandCenterPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || (session.user.role !== "admin" && session.user.role !== "volunteer")) {
        redirect("/");
    }

    const allReports = await db.select().from(reports).orderBy(desc(reports.createdAt));
    const allInventory = await db.select().from(inventory).orderBy(inventory.name);

    return (
        <div className="min-h-screen bg-muted/30 p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Centre de Commandement</h1>
                    <p className="text-muted-foreground">Gestion des opérations en temps réel</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <span className="text-sm font-medium">Système Opérationnel</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
                {/* Main Feed - 2/3 width */}
                <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        📡 Flux SOS en direct
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{allReports.length}</span>
                    </h2>
                    <LiveFeed initialReports={allReports} userRole={session.user.role as "admin" | "volunteer"} />
                </div>

                {/* Side Panel - 1/3 width */}
                <div className="flex flex-col gap-4 h-full">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        📦 Stocks & Ressources
                    </h2>
                    <InventoryPanel initialInventory={allInventory} />
                </div>
            </div>
        </div>
    );
}
