"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types
type SOSPriority = "high" | "medium" | "normal";
type SOSType = "medical" | "food" | "rescue";
type SOSStatus = "en_attente" | "en_cours" | "resolu";

interface SOSReport {
    id: string;
    type: SOSType;
    location: string;
    status: SOSStatus;
    priority: SOSPriority;
    createdAt: string;
}

// Mock Data
const MOCK_REPORTS: SOSReport[] = [
    {
        id: "1",
        type: "medical",
        location: "Sidi Ifni, Centre",
        status: "en_attente",
        priority: "high",
        createdAt: "2024-02-10 10:30",
    },
    {
        id: "2",
        type: "food",
        location: "Douar Ait Daoud",
        status: "en_cours",
        priority: "medium",
        createdAt: "2024-02-10 11:15",
    },
    {
        id: "3",
        type: "rescue",
        location: "Gorges de Tislit",
        status: "en_attente",
        priority: "normal",
        createdAt: "2024-02-10 12:05",
    },
    {
        id: "4",
        type: "medical",
        location: "Ksar El Khorbat",
        status: "resolu",
        priority: "high",
        createdAt: "2024-02-09 15:20",
    },
];

const getPriorityBadge = (priority: SOSPriority) => {
    switch (priority) {
        case "high":
            return <Badge className="bg-[#EB2411] hover:bg-[#EB2411]/90 text-white border-none shadow-sm">Critique</Badge>;
        case "medium":
            return <Badge className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white border-none shadow-sm">Moyen</Badge>;
        case "normal":
            return <Badge className="bg-[#2F9BA6] hover:bg-[#2F9BA6]/90 text-white border-none shadow-sm">Normal</Badge>;
        default:
            return <Badge variant="outline">Inconnu</Badge>;
    }
};

const getStatusLabel = (status: SOSStatus) => {
    const labels: Record<SOSStatus, { label: string; color: string }> = {
        en_attente: { label: "En attente", color: "text-zinc-500" },
        en_cours: { label: "En cours", color: "text-blue-600" },
        resolu: { label: "Résolu", color: "text-green-600" },
    };
    return <span className={`text-xs font-medium ${labels[status].color}`}>{labels[status].label}</span>;
};

const getTypeLabel = (type: SOSType) => {
    const types: Record<SOSType, string> = {
        medical: "🚑 Médical",
        food: "🍱 Nourriture",
        rescue: "🆘 Secours",
    };
    return types[type];
};

export function AdminReportsTable() {
    return (
        <Card className="border-zinc-100 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
                <CardTitle className="text-xl font-bold text-zinc-800">Derniers Signaux SOS</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-zinc-50/30">
                            <TableRow className="border-zinc-100">
                                <TableHead className="font-semibold text-zinc-600 py-4">Type d'urgence</TableHead>
                                <TableHead className="font-semibold text-zinc-600">Localisation</TableHead>
                                <TableHead className="font-semibold text-zinc-600">Statut</TableHead>
                                <TableHead className="font-semibold text-zinc-600">Priorité</TableHead>
                                <TableHead className="font-semibold text-zinc-600 text-right pr-6">Date de création</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_REPORTS.map((report) => (
                                <TableRow key={report.id} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                                    <TableCell className="font-medium py-4 pl-6">{getTypeLabel(report.type)}</TableCell>
                                    <TableCell className="text-zinc-600">{report.location}</TableCell>
                                    <TableCell>{getStatusLabel(report.status)}</TableCell>
                                    <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                                    <TableCell className="text-right pr-6 text-zinc-400 text-sm font-mono">{report.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
