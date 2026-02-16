import { getInventoryItems } from "../actions";
import { Package, AlertTriangle } from "lucide-react";

export async function InventoryWidget() {
    const items = await getInventoryItems();

    // Helper function to determine if stock is low
    const isLowStock = (stockLevel: string) => {
        const numericStock = parseInt(stockLevel);
        return !isNaN(numericStock) && numericStock < 20;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#EB2411]/10 rounded-lg">
                        <Package className="w-5 h-5 text-[#EB2411]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-zinc-900">Inventaire</h2>
                        <p className="text-sm text-zinc-600">Niveaux de stock en temps réel</p>
                    </div>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="p-8 text-center">
                    <Package className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                    <p className="text-zinc-500 text-sm">Aucun article en stock</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {items.map((item) => {
                        const lowStock = isLowStock(item.stockLevel);

                        return (
                            <div
                                key={item.id}
                                className={`
                                    relative p-4 rounded-lg border-2 transition-all duration-300
                                    hover:shadow-md hover:-translate-y-0.5
                                    ${lowStock
                                        ? 'border-amber-300 bg-amber-50/50'
                                        : 'border-zinc-200 bg-zinc-50/50'
                                    }
                                `}
                            >
                                {lowStock && (
                                    <div className="absolute -top-2 -right-2 p-1.5 bg-amber-500 rounded-full shadow-lg">
                                        <AlertTriangle className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-zinc-900 text-sm mb-1">
                                            {item.itemName}
                                        </h3>
                                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-200 text-zinc-700">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-zinc-200">
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-2xl font-bold ${lowStock ? 'text-amber-600' : 'text-[#EB2411]'}`}>
                                            {item.stockLevel}
                                        </span>
                                        <span className="text-sm text-zinc-600">{item.unit}</span>
                                    </div>
                                    {lowStock && (
                                        <p className="text-xs text-amber-700 font-medium mt-1">
                                            Stock faible
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
