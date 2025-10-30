import { TrendingUp, CircleDollarSign, Target, User } from "lucide-react";
import React from "react";
import { GoalProgress } from "./goal-progress";
import { KPICard } from "./kpi-card";
import { SectionCardHeader } from "@/components/customs";
import { Card, CardContent } from "@/components/ui";
import { formatCurrency } from "@/utils";

const individualGoal = 375000;

export function IndividualSummarySection({ dashboardData }) {
  const { personal_goals: goals } = dashboardData || {};

  const monthlySales = goals?.monthly_sales ?? 0;
  const toGoal = Math.max(0, individualGoal - monthlySales); // faltante para llegar a la meta individual

  return (
    <Card>
      <SectionCardHeader
        icon={User}
        title="Resumen Individual"
        description="Vista rápida de tus ventas y objetivos personales del mes"
      />

      <CardContent className="space-y-3 pt-4">
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
            subtitle="Restante para alcanzar el objetivo individual"
            icon={CircleDollarSign}
          />

          <KPICard
            title="Meta individual"
            value={formatCurrency(individualGoal)}
            subtitle="Objetivo individual a alcanzar este mes"
            icon={Target}
          />
        </div>

        {/* Avance hacia la meta */}
        <GoalProgress
          label="Avance hacia la meta individual"
          currentValue={monthlySales}
          goalValue={individualGoal}
        />
      </CardContent>
    </Card>
  );
}