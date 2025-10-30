import { TrendingUp, CircleDollarSign, Target, LayoutDashboard } from "lucide-react";
import React from "react";
import { KPICard } from "./kpi-card";
import { SectionCardHeader } from "@/components/customs";
import { Card, CardContent } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils";

export function SummarySection({ dashboardData }) {
  const { personal_goals: goals } = dashboardData || {};

  const monthlySales = goals?.monthly_sales ?? 0;
  const toGoal = goals?.to_payoff ?? 0; // faltante para llegar a la meta
  const monthlyTarget = monthlySales + toGoal;

  const progressToGoal = monthlyTarget > 0
    ? Math.round((monthlySales / monthlyTarget) * 100)
    : 0;

  return (
    <Card>
      <SectionCardHeader
        icon={LayoutDashboard}
        title="Resumen General"
        description="Vista rápida de tus ventas y objetivos del mes"
      />

      <CardContent className="space-y-3">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <KPICard
            title="Ventas acumuladas"
            value={formatCurrency(monthlySales)}
            subtitle="Ventas cerradas en el mes en curso"
            icon={TrendingUp}
          />

          <KPICard
            title="Faltante para la meta"
            value={formatCurrency(toGoal)}
            subtitle="Restante para alcanzar el objetivo"
            icon={CircleDollarSign}
          />

          <KPICard
            title="Meta del mes"
            value={formatCurrency(monthlyTarget)}
            subtitle="Objetivo a alcanzar este mes"
            icon={Target}
          />
        </div>

        {/* Avance hacia la meta */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Avance hacia la meta</span>
            <span className="font-medium">{progressToGoal}%</span>
          </div>
          <Progress value={progressToGoal} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}