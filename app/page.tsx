import { ReportForm } from "@/app/features/reports/components/report-form";
import { HeroSection } from "@/app/features/hero/components/hero-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="p-8 max-w-2xl mx-auto">
        <ReportForm />
      </main>
    </>
  );
}
