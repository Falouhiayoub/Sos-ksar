"use client";

import { Report } from "@/app/db/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateReportStatus } from "@/app/actions/report-actions";
import { toast } from "sonner";
import { MapPin, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ReportCardProps {
    report: Report;
}

export function ReportCard({ report }: ReportCardProps) {

    const handleStatusChange = async (newStatus: string) => {
        const result = await updateReportStatus({
            reportId: report.id,
            status: newStatus as "pending" | "in_progress" | "resolved"
        });

        if (result.success) {
            toast.success("Statut mis à jour");
        } else {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-500 hover:bg-red-600";
            case "medium": return "bg-orange-500 hover:bg-orange-600";
            case "low": return "bg-blue-500 hover:bg-blue-600";
            default: return "bg-slate-500";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending": return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">En attente</Badge>;
            case "in_progress": return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">En cours</Badge>;
            case "resolved": return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Résolu</Badge>;
            default: return <Badge variant="outline">Inconnu</Badge>;
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <Badge className={`${getPriorityColor(report.priority)} text-white border-none`}>
                            {report.priority === 'high' ? 'URGENT' : report.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true, locale: fr })}
                        </span>
                    </div>
                    {getStatusBadge(report.status)}
                </div>
                <CardTitle className="text-lg mt-2 flex items-center gap-2">
                    <span className="capitalize">{report.type}</span>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    {report.location}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-muted/30 p-3 rounded-md text-sm">
                    {report.description}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
                <Select defaultValue={report.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="Changer statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="in_progress">En cours</SelectItem>
                        <SelectItem value="resolved">Résolu</SelectItem>
                    </SelectContent>
                </Select>
            </CardFooter>
        </Card>
    );
}
