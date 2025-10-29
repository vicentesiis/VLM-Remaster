
import { Badge } from "@/components/ui/badge";

export function ExchangeChips({ rates }) {
  if (!rates?.length) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {rates.map((r) => (
        <Badge key={r.currency} variant="secondary" className="uppercase">
          1 USD = {Number(r.rate_to_usd).toLocaleString()} {r.currency}
        </Badge>
      ))}
    </div>
  );
}