import { Users, Trophy, Award, Target } from "lucide-react";
import React from "react";
import { DashboardCard } from "./dashboard-card";
import { TopSellersList } from "./top-seller-list";
import { useGetMyPotentialSales } from "@/hooks/queries/UseReports";
import { formatCurrency } from "@/utils";

export function AsideDashboard({ dashboardData }) {
  const { top_sellers, personal_goals } = dashboardData || {};
  const { data: potencialSalesData } = useGetMyPotentialSales();

  return (
    <div className="space-y-4">
      <DashboardCard icon={Award} title="Tokens disponibles">
        <div className="text-2xl font-semibold">
          {personal_goals?.tokens ?? 0}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Recompensas del mes</p>
      </DashboardCard>

      <DashboardCard icon={Target} title="Ventas potenciales">
        <div className="text-2xl font-semibold">
          {formatCurrency(potencialSalesData?.total_amount ?? 0)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Oportunidades en curso</p>
      </DashboardCard>

      <DashboardCard icon={Users} title="Ventas desde el último corte">
        <div className="text-2xl font-semibold">
          {formatCurrency(personal_goals.to_payoff)}
        </div>
        <p className="text-xs text-muted-foreground mt-1"> Monto generado desde el último período de cierre</p>
      </DashboardCard>

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