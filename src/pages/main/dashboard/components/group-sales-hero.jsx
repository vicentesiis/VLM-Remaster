
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatCurrency } from "@/utils";
import { SectionCardHeader } from "@/components/customs";
import { Users } from "lucide-react";

export function GroupSalesHero({ groupMonthlySales }) {
  return (
    <Card>
      <SectionCardHeader
        icon={Users}
        title="Ventas Mensuales del Grupo"
      />
      <CardContent className="!p-4">
        <div className="text-3xl font-semibold">
          {formatCurrency(groupMonthlySales ?? 0, "USD", { fromCents: false })}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Actual del mes</p>
      </CardContent>
    </Card>
  );
}