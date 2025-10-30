import { Users, Trophy, Award, Target } from "lucide-react";
import React from "react";
import { DashboardCard } from "./dashboard-card";
import { TopSellersList } from "./top-seller-list";
import { useGetMyPotentialSales } from "@/hooks/queries/UseReports";
import { formatCurrency } from "@/utils";

export function AsideDashboard({ dashboardData }) {
  const { group_monthly_sales, top_sellers, personal_goals } = dashboardData || {};
  const { data: potencialSalesData } = useGetMyPotentialSales();

  return (
    <div className="space-y-4">
      <DashboardCard icon={Award} title="Tokens">
        <div className="text-2xl font-semibold">
          {personal_goals?.tokens ?? 0}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Recompensas del mes</p>
      </DashboardCard>

      {/* Ventas potenciales */}
      <DashboardCard icon={Target} title="Ventas potenciales">
        <div className="text-2xl font-semibold">
          {formatCurrency(potencialSalesData?.total_amount ?? 0, "USD", { fromCents: false })}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Oportunidades en curso</p>
      </DashboardCard>

      {/* Ventas del grupo */}
      <DashboardCard icon={Users} title="Ventas del grupo">
        <div className="text-2xl font-semibold">
          {formatCurrency(group_monthly_sales ?? 0, "USD", { fromCents: false })}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Total del equipo en el mes</p>
      </DashboardCard>

      {/* Top sellers */}
      {
        top_sellers?.length > 0 && (
          <DashboardCard icon={Trophy} title="Top 3 vendedores del mes">
            <TopSellersList
              sellers={top_sellers}
              limit={3}
            />
          </DashboardCard>
        )
      }
    </div>

  );
}