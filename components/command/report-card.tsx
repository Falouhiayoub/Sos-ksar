"use client";

import { Report } from "@/app/db/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateReportStatus, assignVolunteer } from "@/app/actions/report-actions";
import { toast } from "sonner";
import { MapPin, Clock, UserCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ReportCardProps {
    report: Report;
    userRole?: "citizen" | "volunteer" | "admin";
    userId?: string;
}

export function ReportCard({ report, userRole = "citizen", userId }: ReportCardProps) {
    const canUpdateStatus = userRole === "admin" || userRole === "volunteer";

    const handleStatusChange = async (newStatus: string) => {
        const result = await updateReportStatus({
            reportId: report.id,
            status: newStatus as "pending" | "in_progress" | "resolved"
        });

        if (result.success) {
            toast.success("Statut mis à jour");
        } else {
            // @ts-ignore
            toast.error(result.error?.status?._errors?.[0] || "Erreur lors de la mise à jour");
        }
    };

    const handleAssign = async () => {
        if (!userId) return;
        const result = await assignVolunteer(report.id, userId);
        if (result.success) {
            toast.success("Vous avez pris en charge ce signalement");
        } else {
            toast.error(result.error || "Erreur lors de l'assignation");
        }
    };

    const handleDelete = async () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce signalement ?")) {
            const { deleteReport } = await import("@/app/actions/admin-actions");
            const result = await deleteReport(report.id);
            if (result.success) {
                toast.success("Signalement supprimé");
            } else {
                toast.error(result.error || "Erreur lors de la suppression");
            }
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

            {canUpdateStatus && (
                <CardFooter className="flex flex-col gap-2 pt-2 items-end border-t mt-4 pt-4">
                    <div className="flex gap-2 w-full justify-end items-center">
                        {report.assignedTo ? (
                            <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 gap-1">
                                <UserCheck className="w-3 h-3" />
                                Pris en charge
                            </Badge>
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 transition-colors"
                                onClick={handleAssign}
                            >
                                Prendre en charge
                            </Button>
                        )}

                        <Select defaultValue={report.status} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-[130px] h-8 text-xs">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="in_progress">En cours</SelectItem>
                                <SelectItem value="resolved">Résolu</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {userRole === "admin" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 w-full"
                            onClick={handleDelete}
                        >
                            Supprimer ce signalement
                        </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
