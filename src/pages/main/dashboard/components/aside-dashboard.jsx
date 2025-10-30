import { Users, Trophy } from "lucide-react";
import React from "react";
import { DashboardCard } from "./dashboard-card";
import { formatCurrency } from "@/utils";

export function AsideDashboard({ dashboardData }) {
  const { group_monthly_sales, top_sellers } = dashboardData || {};

  return (
    <aside className="lg:col-span-4 space-y-4 order-2">
      {/* Group Sales Card */}
      <DashboardCard icon={Users} title="Ventas Mensuales del Grupo">
        <div className="text-3xl font-semibold">
          {formatCurrency(group_monthly_sales ?? 0, "USD", { fromCents: false })}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Actual del mes</p>
      </DashboardCard>

      {/* Top Sellers Card */}
      {top_sellers?.length > 0 && (
        <DashboardCard icon={Trophy} title="Top 3 Vendedores">
          <div className="space-y-2">
            {top_sellers.slice(0, 3).map((seller, index) => (
              <div
                key={seller.username}
                className="flex items-center justify-between p-2 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{seller.name}</p>
                    <p className="text-xs text-muted-foreground">{seller.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {formatCurrency(seller.total_sales)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}
    </aside>
  );
}