
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatCurrency } from "@/utils";

export function GroupSalesHero({ groupMonthlySales }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Ventas Mensuales del Grupo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">
          {formatCurrency(groupMonthlySales ?? 0, "USD", { fromCents: false })}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Actual del mes</p>
      </CardContent>
    </Card>
  );
}