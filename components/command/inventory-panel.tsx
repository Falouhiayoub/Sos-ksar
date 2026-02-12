"use client";

import { startTransition } from "react";
import { Inventory } from "@/app/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateStock } from "@/app/actions/inventory-actions";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InventoryPanelProps {
    initialInventory: Inventory[];
}

export function InventoryPanel({ initialInventory }: InventoryPanelProps) {

    const handleUpdateStock = async (itemId: string, currentQuantity: number, change: number) => {
        const newQuantity = Math.max(0, currentQuantity + change);

        startTransition(async () => {
            const result = await updateStock({
                itemId,
                quantity: newQuantity
            });

            if (result.success) {
                toast.success("Stock mis à jour");
            } else {
                toast.error("Erreur mise à jour stock");
            }
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available": return "text-green-600 bg-green-50";
            case "low": return "text-orange-600 bg-orange-50";
            case "out_of_stock": return "text-red-600 bg-red-50";
            default: return "text-slate-600 bg-slate-50";
        }
    };

    return (
        <Card className="h-full flex flex-col border-none shadow-none bg-transparent">
            <ScrollArea className="h-full pr-4">
                <div className="space-y-3">
                    {initialInventory.map((item) => (
                        <div key={item.id} className="bg-background p-3 rounded-lg border shadow-sm flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-sm">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                                </div>
                                <Badge variant="secondary" className={getStatusColor(item.status)}>
                                    {item.status === 'out_of_stock' ? 'En rupture' : item.status}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-2xl font-bold tabular-nums text-primary">{item.quantity}</span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => handleUpdateStock(item.id, item.quantity, -1)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => handleUpdateStock(item.id, item.quantity, 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {initialInventory.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground bg-background p-4 rounded-lg border">
                            Aucune ressource listée.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </Card>
    );
}
