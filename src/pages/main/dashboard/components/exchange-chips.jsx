import { DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function ExchangeChips({ rates }) {
  if (!rates?.length) {
    return (
      <div className="flex items-center justify-center py-8 text-slate-400">
        <div className="text-center">
          <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No hay tipos de cambio disponibles</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-wrap gap-3">
      {rates.map((r) => (
        <Badge 
          key={r.currency} 
          variant="secondary" 
          className="px-3 py-2 text-sm font-mono bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 text-slate-700"
        >
          <DollarSign className="h-3 w-3 mr-1" />
          1 USD = {Number(r.rate_to_usd).toLocaleString()} {r.currency.toUpperCase()}
        </Badge>
      ))}
    </div>
  );
}