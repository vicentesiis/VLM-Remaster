
import { TrendingUp, Users, CircleDollarSign, Target, LayoutDashboard } from "lucide-react";
import React from "react";
import { KPICard } from "./kpi-card";
import { SectionCardHeader } from "@/components/customs";
import { Card, CardContent } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils";

export function SummarySection({ dashboardData, payoffProgress }) {
  const { context, personal_goals: goals } = dashboardData || {};

  return (
    <Card>

      <SectionCardHeader
        icon={LayoutDashboard}
        title="Resumen General"
        description="Vista rápida de tu desempeño y métricas del mes"
      />
      <CardContent className="space-y-3">
        {/* KPI row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <KPICard
            title="Ventas mensuales"
            value={formatCurrency(goals?.monthly_sales ?? 0)}
            subtitle="Tus ventas del mes"
            icon={TrendingUp}
          />
          <KPICard
            title="Por cobrar"
            value={formatCurrency(goals?.to_payoff ?? 0)}
            subtitle="Saldo restante"
            icon={CircleDollarSign}
          />
          <KPICard
            title="Tokens"
            value={String(goals?.tokens ?? 0)}
            subtitle="Puntos acumulados"
            icon={Target}
          />
          {/* <KPICard
            title="Ventas potenciales"
            value={potentialSales}
            subtitle="Mes en curso"
            icon={Users}
          /> */}
        </div>

        {/* Payoff progress (compact) */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Avance de cobranza</span>
            <span className="font-medium">{payoffProgress}%</span>
          </div>
          <Progress value={payoffProgress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}