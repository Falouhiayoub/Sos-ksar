import { getUserReports } from "../server/queries";
import { ReportBadge } from "./report-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function ReportList() {
    const reports = await getUserReports();

    if (reports.length === 0) {
        return (
            <Card className="border-border">
                <CardContent className="pt-6 text-center text-muted-foreground">
                    You haven't submitted any reports yet.
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Your Reports</h2>
            <div className="grid gap-4">
                {reports.map((report) => (
                    <Card key={report.id} className="overflow-hidden border-border bg-card hover:border-primary/50 transition-colors">
                        <CardHeader className="p-4 bg-muted/30">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    {report.category}
                                </span>
                                <ReportBadge status={report.status} />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <p className="text-sm text-foreground line-clamp-2">{report.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    {report.address || "No address provided"}
                                </span>
                                <span>{new Date(report.createdAt).toLocaleDateString()} {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
