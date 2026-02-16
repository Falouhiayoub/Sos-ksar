import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ReportBadgeProps {
    status: "pending" | "dispatched" | "resolved" | "cancelled";
    className?: string;
}

export function ReportBadge({ status, className }: ReportBadgeProps) {
    const statusConfig = {
        pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
        dispatched: { label: "Active", className: "bg-blue-100 text-blue-800 border-blue-200" },
        resolved: { label: "Resolved", className: "bg-green-100 text-green-800 border-green-200" },
        cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-800 border-gray-200" },
    };

    const config = statusConfig[status];

    return (
        <Badge
            variant="outline"
            className={cn("font-medium", config.className, className)}
        >
            {config.label}
        </Badge>
    );
}
