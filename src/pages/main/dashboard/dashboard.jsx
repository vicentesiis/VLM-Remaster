import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import {
  getProgramPricingColumns,
  PricingSection,
  IndividualSummarySection,
  GroupSummarySection,
  AsideDashboard
} from "./components";
import { useDashboardData } from "./hooks/useDashboardData";
import PageLayout from "@/components/customs/page-layout/page-layout";
import { WithStatusState } from "@/components/customs/status-state/with-status-state";

const Dashboard = () => {
  const { dashboardData, isFetching, isError, isFetched } = useDashboardData();

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



  return (
    <PageLayout title="Dashboard">
      <WithStatusState isLoading={isFetching} isError={isError}>
        <section className="grid gap-4 lg:gap-5 lg:grid-cols-12 p-4 sm:p-0 mb-4">
          <div className="lg:col-span-8 space-y-4 order-1">

            <IndividualSummarySection
              dashboardData={dashboardData}
            />

            <GroupSummarySection
              dashboardData={dashboardData}
            />
          </div>

          {/* RIGHT COLUMN (4 cols) */}
          <aside className="lg:col-span-4 order-2">
            <AsideDashboard dashboardData={dashboardData} />

          </aside>

        </section>
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
      </WithStatusState>
    </PageLayout>
  );
};

export default Dashboard;
