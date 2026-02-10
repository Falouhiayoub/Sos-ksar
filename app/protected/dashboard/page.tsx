import { ReportForm } from "@/app/features/reports/components/report-form";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Signaler une urgence
      </h1>

      <ReportForm />
    </main>
  );
}
