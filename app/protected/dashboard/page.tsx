import { ReportForm } from "@/app/features/reports/components/report-form";
import { ReportList } from "@/app/features/reports/components/report-list";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main className="p-6 max-w-7xl mx-auto space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Signaler une urgence
          </h1>
          <p className="text-muted-foreground">
            Remplissez le formulaire ci-dessous pour signaler une situation d'urgence.
          </p>
          <ReportForm />
        </div>

        <div className="lg:col-span-7">
          <Suspense fallback={<div className="animate-pulse space-y-4">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-40 w-full bg-muted rounded" />
            <div className="h-40 w-full bg-muted rounded" />
          </div>}>
            <ReportList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
