import { Coins, TrendingUp, DollarSign, Trophy } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { DashboardCard } from "./dashboard-card";
import { TopSellersList } from "./top-seller-list";
import { useGetMyPotentialSales } from "@/hooks/queries/UseReports";
import { formatCurrency } from "@/utils";

export function AsideDashboard({ dashboardData, isAdmin }) {
  const { top_sellers, personal_goals } = dashboardData || {};
  const { data: potentialSalesData } = useGetMyPotentialSales();

  return (
    <div className="space-y-4">
      {!isAdmin && (
        <>
          <DashboardCard icon={Coins} title="Tokens disponibles">
            <div className="text-2xl font-semibold">
              {personal_goals?.tokens ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recompensas del mes
            </p>
          </DashboardCard>

          <DashboardCard icon={TrendingUp} title="Ventas potenciales">
            <div className="text-2xl font-semibold">
              {formatCurrency(potentialSalesData?.total_amount ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Oportunidades en curso
            </p>
          </DashboardCard>

          <DashboardCard icon={DollarSign} title="Ventas desde el último corte">
            <div className="text-2xl font-semibold">
              {formatCurrency(personal_goals?.to_payoff ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Monto generado desde el último período de cierre
            </p>
          </DashboardCard>
        </>
      )}

      <DashboardCard icon={Trophy} title="Top 3 vendedores del mes">
        <TopSellersList sellers={top_sellers} limit={3} />
      </DashboardCard>
    </div>
  );
}

AsideDashboard.propTypes = {
  dashboardData: PropTypes.any,
  isAdmin: PropTypes.bool,
};