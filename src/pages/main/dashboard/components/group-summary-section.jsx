import { TrendingUp, CircleDollarSign, Target, Users } from "lucide-react";
import React from "react";
import { GoalProgress } from "./goal-progress";
import { KPICard } from "./kpi-card";
import { SectionCardHeader } from "@/components/customs";
import { Card, CardContent } from "@/components/ui";
import { formatCurrency } from "@/utils";

const groupGoal = 1600000;

export function GroupSummarySection({ dashboardData }) {
  const { group_monthly_sales } = dashboardData || {};

  const groupMonthlySales = group_monthly_sales ?? 0;
  const toGoal = Math.max(0, groupGoal - groupMonthlySales);

  return (
    <Card>
      <SectionCardHeader
        icon={Users}
        title="Resumen por Grupo"
        description="Vista rápida de las ventas y objetivos del grupo del mes"
      />

      <CardContent className="space-y-3 pt-4">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <KPICard
            title="Ventas acumuladas"
            value={formatCurrency(groupMonthlySales)}
            subtitle="Ventas cerradas del grupo en el mes"
            icon={TrendingUp}
          />

          <KPICard
            title="Faltante para la meta"
            value={formatCurrency(toGoal)}
            subtitle="Restante para alcanzar el objetivo grupal"
            icon={CircleDollarSign}
          />

          <KPICard
            title="Meta grupal"
            value={formatCurrency(groupGoal)}
            subtitle="Objetivo grupal a alcanzar este mes"
            icon={Target}
          />
        </div>

        {/* Avance hacia la meta */}
        <GoalProgress
          label="Avance hacia la meta grupal"
          currentValue={groupMonthlySales}
          goalValue={groupGoal}
        />
      </CardContent>
    </Card>
  );
}