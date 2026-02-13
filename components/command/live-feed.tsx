"use client";

import { Report } from "@/app/db/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportCard } from "./report-card";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LiveFeedProps {
    initialReports: Report[];
    userRole?: "citizen" | "volunteer" | "admin";
    userId?: string;
}

export function LiveFeed({ initialReports, userRole = "citizen", userId }: LiveFeedProps) {
    const [filter, setFilter] = useState("all");

    const filteredReports = initialReports.filter(report => {
        if (filter === "all") return true;
        if (filter === "pending") return report.status === "pending";
        if (filter === "in_progress") return report.status === "in_progress";
        if (filter === "resolved") return report.status === "resolved";
        return true;
    });

    return (
        <div className="flex flex-col h-full bg-background border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
                <Tabs defaultValue="all" onValueChange={setFilter}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">Tous</TabsTrigger>
                        <TabsTrigger value="pending">En attente</TabsTrigger>
                        <TabsTrigger value="in_progress">En cours</TabsTrigger>
                        <TabsTrigger value="resolved">Résolus</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {filteredReports.map((report) => (
                        <ReportCard key={report.id} report={report} userRole={userRole} userId={userId} />
                    ))}
                    {filteredReports.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            Aucun signalement dans cette catégorie.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
