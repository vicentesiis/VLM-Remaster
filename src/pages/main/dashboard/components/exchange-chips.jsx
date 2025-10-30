import React from "react";
import { DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";

export function ExchangeChips({ rates }) {
  if (!rates?.length) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="text-center text-muted-foreground">
          <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium">No hay tipos de cambio disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {rates.map((r) => (
        <Badge
          key={r.currency}
          variant="outline"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg font-medium tracking-tight",
            "bg-gradient-to-br from-muted/50 to-background border border-border/60",
            "shadow-sm hover:shadow-md transition-all duration-150 hover:-translate-y-[1px]",
            "text-sm"
          )}
        >
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            <span className="font-mono text-foreground">
              1 USD =  {Number(r.rate_to_usd).toLocaleString()} {r.currency.toUpperCase()}
            </span>
          </span>
        </Badge>
      ))}
    </div>
  );
}