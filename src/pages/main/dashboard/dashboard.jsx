import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import React from "react";
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

  // Transform pricing data to group by program type (a, b, c)
  const transformedPricing = useMemo(() => {
    const pricing = dashboardData?.program_pricing ?? [];
    const programMap = new Map();

    pricing.forEach((item) => {
      // Extract program letter (a, b, or c)
      const match = item.program_name.match(/program_([abc])/);
      if (!match) return;

      const programLetter = match[1];

      if (!programMap.has(programLetter)) {
        programMap.set(programLetter, {
          program: `Programa ${programLetter.toUpperCase()}`,
          usd: item.price,
        });
      }

      // Add currency-specific price
      const program = programMap.get(programLetter);
      program[item.currency.toLowerCase()] = item.price_local;
    });

    return Array.from(programMap.values());
  }, [dashboardData?.program_pricing]);

  const allCurrencies = useMemo(
    () => Array.from(new Set(dashboardData?.program_pricing?.map((p) => p.currency) ?? [])),
    [dashboardData?.program_pricing]
  );

  const programPricingColumns = useMemo(() => getProgramPricingColumns(allCurrencies), [allCurrencies]);

  const programPricingTable = useReactTable({
    data: transformedPricing,
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
