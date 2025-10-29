import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import {
  getProgramPricingColumns,
  PricingSection,
  SummarySection,
  GroupSalesHero,
  TopSellersCard
} from "./components";
import { useDashboardData } from "./hooks/useDashboardData";
import PageLayout from "@/components/customs/page-layout/page-layout";
import { WithStatusState } from "@/components/customs/status-state/with-status-state";
import { useGetMyPotentialSales } from "@/hooks/queries/UseReports";

const Dashboard = () => {
  const { dashboardData, isFetching, isError, isFetched } = useDashboardData();
  const { data: potencialSalesData } = useGetMyPotentialSales()

  const [currencyFilter, setCurrencyFilter] = useState("all");

  const allCurrencies = useMemo(
    () => Array.from(new Set(dashboardData?.program_pricing?.map((p) => p.currency) ?? [])),
    [dashboardData?.program_pricing]
  );

  const filteredPricing = useMemo(() => {
    const src = dashboardData?.program_pricing ?? [];
    if (currencyFilter === "all") return src;
    return src.filter((p) => p.currency === currencyFilter);
  }, [currencyFilter, dashboardData?.program_pricing]);

  const programPricingColumns = useMemo(() => getProgramPricingColumns(), []);

  const programPricingTable = useReactTable({
    data: filteredPricing,
    columns: programPricingColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const goals = dashboardData?.personal_goals;
  const payoffProgress = goals
    ? Math.max(0, Math.min(100, Math.round(((goals.monthly_sales - goals.to_payoff) / Math.max(1, goals.monthly_sales)) * 100)))
    : 0;

  return (
    <PageLayout title="Dashboard">
      <WithStatusState isLoading={isFetching} isError={isError}>
        <section className="grid gap-4 lg:gap-5 lg:grid-cols-12">
          {/* LEFT COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-4 order-1">

            <SummarySection
              dashboardData={dashboardData}
              payoffProgress={payoffProgress}
              potentialSales={potencialSalesData?.total_amount ?? 0}
            />
            <PricingSection
              currencyFilter={currencyFilter}
              setCurrencyFilter={setCurrencyFilter}
              allCurrencies={allCurrencies}
              exchangeRates={dashboardData?.exchange_rates}
              programPricingTable={programPricingTable}
              isFetching={isFetching}
              isError={isError}
              isFetched={isFetched}
            />
          </div>

          {/* RIGHT COLUMN (4 cols) */}
          <aside className="lg:col-span-4 space-y-4 order-2">
            <GroupSalesHero groupMonthlySales={dashboardData?.group_monthly_sales} />
            <TopSellersCard topSellers={dashboardData?.top_sellers} />
          </aside>
        </section>
      </WithStatusState>
    </PageLayout>
  );
};

export default Dashboard;
