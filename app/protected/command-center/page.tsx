import { AdminReportsTable } from "@/app/features/reports/components/admin-reports-table";

export default function CommandCenterPage() {
    return (
        <div className="min-h-screen bg-[#F5E8C7]/20 p-8 space-y-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">
                        Centre de Commande <span className="text-[#EB2411]">|</span> Signaux SOS
                    </h1>
                    <p className="text-zinc-600 text-lg">
                        Supervision en temps réel des demandes d'aide et coordination des secours.
                    </p>
                </header>

                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <AdminReportsTable />
                </section>
            </div>
        </div>
    );
}
