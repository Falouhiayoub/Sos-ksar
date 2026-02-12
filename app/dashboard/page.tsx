import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/drizzle";
import { reports } from "@/app/db/schema";
import { desc, eq } from "drizzle-orm";
import { CreateReportDialog } from "@/components/dashboard/create-report-dialog";
import { LiveFeed } from "@/components/command/live-feed";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    // Citizens only see their own reports.
    // Volunteers/Admins might see this dashboard too, but `LiveFeed` here is framed as "My Reports".
    // If we want a separate view for Vol/Admin, we can direct them to /command.
    // For now, let's just show user's own reports here.

    const userReports = await db.select()
        .from(reports)
        .where(eq(reports.userId, session.user.id))
        .orderBy(desc(reports.createdAt));

    return (
        <div className="min-h-screen bg-muted/30 p-6 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Mon Espace Citoyen</h1>
                    <p className="text-muted-foreground">Suivez vos signalements et alertez les secours.</p>
                </div>
                <CreateReportDialog />
            </header>

            <div className="grid gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Mes Signalements Récents</h2>
                </div>

                {/* Reusing LiveFeed but passed only user's reports */}
                <div className="h-[600px]">
                    <LiveFeed initialReports={userReports} userRole={session.user.role as "citizen" | "volunteer" | "admin"} />
                </div>
            </div>
        </div>
    );
}
