import React from "react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/utils"

function rankStyles(i) {
    // 0=gold, 1=silver, 2=bronze
    const map = [
        {
            badge: "bg-amber-500 text-amber-50",
            ring: "ring-amber-300/60",
            tint: "bg-amber-500/10",
            icon: "text-amber-600",
        },
        {
            badge: "bg-zinc-400 text-white",
            ring: "ring-zinc-300/60",
            tint: "bg-zinc-400/10",
            icon: "text-zinc-500",
        },
        {
            badge: "bg-orange-500 text-orange-50",
            ring: "ring-orange-300/60",
            tint: "bg-orange-500/10",
            icon: "text-orange-600",
        },
    ];
    return map[i] ?? map[2];
}

/**
 * TopSellersList
 *
 * props:
 * - sellers: Array<{ name, username, total_sales }>
 * - limit?: number (default 3)
 * - currency?: string (default "USD")
 * - fromCents?: boolean (default false) -> passed to formatCurrency
 * - showAvatars?: boolean (default true)
 * - className?: string
 * - onItemClick?: (seller, index) => void
 */
export function TopSellersList({
    sellers = [],
    limit = 3,
    className,
}) {
    const items = sellers.slice(0, limit);

    if (!items.length) {
        return (
            <div className={cn("text-center py-8 text-muted-foreground", className)}>
                <p>Aún no hay top vendedores</p>
            </div>
        );
    }

    return (
        <ul className={cn("space-y-2", className)}>
            {items.map((seller, index) => {
                const styles = rankStyles(index);
                return (
                    <li
                        key={seller.username}
                        className={cn(
                            "group flex items-center justify-between rounded-xl border bg-card p-2.5",
                        )}
                    >
                        {/* Left: rank + avatar + identity */}
                        <div className="flex items-center gap-3 min-w-0">
                            {/* Rank medal */}
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full grid place-items-center font-bold ring-2",
                                    styles.badge,
                                    styles.ring
                                )}
                                title={`Lugar ${index + 1}`}
                            >
                                {index + 1}
                            </div>


                            {/* Name + username */}
                            <div className="min-w-0">
                                <p className="font-medium leading-tight">
                                    {seller.name}
                                </p>
                                <p className="text-xs text-muted-foreground leading-tight">
                                    {seller.username}
                                </p>
                            </div>
                        </div>

                        {/* Right: amount + trophy for #1 */}
                        <div className="flex gap-2">
                            <p className="font-semibold tabular-nums text-right">
                                {formatCurrency(seller.total_sales ?? 0)}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}