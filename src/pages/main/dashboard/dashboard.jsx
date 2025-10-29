import React, { useMemo, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { getProgramPricingColumns } from "./components/program-pricing-columns";
import { useDashboardData } from "./hooks/useDashboardData";
import PageLayout from "@/components/customs/page-layout/page-layout";
import { WithStatusState } from "@/components/customs/status-state/with-status-state";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, CircleDollarSign, Target } from "lucide-react";

// -----------------------------
// Small UI helpers (JSX version)
// -----------------------------

function formatMoney(n, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n ?? 0);
  } catch {
    return new Intl.NumberFormat("en-US").format(n ?? 0);
  }
}

function KPICard({ title, value, subtitle, icon: Icon }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
        {Icon ? <Icon className="h-4 w-4" /> : null}
      </CardHeader>
      <CardContent>
        <div className="text-xl lg:text-2xl font-semibold leading-none">{value}</div>
        {subtitle ? (
          <p className="mt-1 text-[11px] text-muted-foreground">{subtitle}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ExchangeChips({ rates }) {
  if (!rates?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {rates.map((r) => (
        <Badge key={r.currency} variant="secondary" className="uppercase">
          1 USD = {Number(r.rate_to_usd).toLocaleString()} {r.currency}
        </Badge>
      ))}
    </div>
  );
}

const Dashboard = () => {
  const { dashboardData, isFetching, isError, isFetched } = useDashboardData();

  const [currencyFilter, setCurrencyFilter] = useState("all");
  const allCurrencies = useMemo(
    () => Array.from(new Set(dashboardData?.program_pricing?.map((p) => p.currency) ?? [])),
    [dashboardData?.program_pricing]
  );

  // --- Filter pricing by currency so desktop stays compact (no scroll) ---
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
    <PageLayout title={"Dashboard"}>
      <WithStatusState isLoading={isFetching} isError={isError}>
        {/*
          Desktop (≥lg):
          ┌───────────────────────────────────────────────────────────┐
          │ Left (8 cols):  Summary + 4 KPIs + Pricing + Controls   │
          │ Right (4 cols): Group KPI (hero) + Top Sellers + Rates  │
          └───────────────────────────────────────────────────────────┘
          Mobile: stacked.
        */}
        <section className="grid gap-4 lg:gap-5 lg:grid-cols-12">
          {/* LEFT (8) */}
          <div className="lg:col-span-8 space-y-4 order-1">
            {/* 🔝 Merged: Precios + Tipos de cambio */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-base">Precios y Tipo de Cambio</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                      <SelectTrigger className="h-8 w-[170px]">
                        <SelectValue placeholder="Filtrar moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las monedas</SelectItem>
                        {allCurrencies.map((c) => (
                          <SelectItem key={c} value={c} className="uppercase">
                            {c.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Exchange chips shown inline above pricing for quick reference */}
                <ExchangeChips rates={dashboardData?.exchange_rates} />
                <DataTable
                  table={programPricingTable}
                  isLoading={isFetching}
                  isError={isError}
                  hasFetched={isFetched}
                  showPagination={false}
                />
              </CardContent>
            </Card>

            {/* Resumen (moved below the merged pricing/rates) */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">Resumen</CardTitle>
                    {dashboardData?.context ? (
                      <p className="text-xs text-muted-foreground mt-1">
                        Usuario: <span className="font-medium">{dashboardData.context.user}</span> • Grupo: <span className="font-medium">{dashboardData.context.group}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* KPI row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <KPICard
                    title="Ventas mensuales"
                    value={formatMoney(goals?.monthly_sales ?? 0, "USD")}
                    subtitle="Tus ventas del mes"
                    icon={TrendingUp}
                  />
                  <KPICard
                    title="Por cobrar"
                    value={formatMoney(goals?.to_payoff ?? 0, "USD")}
                    subtitle="Saldo restante"
                    icon={CircleDollarSign}
                  />
                  <KPICard
                    title="Tokens"
                    value={String(goals?.tokens ?? 0)}
                    subtitle="Puntos acumulados"
                    icon={Target}
                  />
                  <KPICard
                    title="Ventas del grupo"
                    value={formatMoney(dashboardData?.group_monthly_sales ?? 0, "USD")}
                    subtitle="Mes en curso"
                    icon={Users}
                  />
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
          </div>

          {/* RIGHT (4) */}
          <aside className="lg:col-span-4 space-y-4 order-2">
            {/* Group monthly sales as a hero KPI (top-right on desktop) */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ventas Mensuales del Grupo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{formatMoney(dashboardData?.group_monthly_sales ?? 0, "USD")}</div>
                <p className="text-xs text-muted-foreground mt-1">Actual del mes</p>
              </CardContent>
            </Card>

            {/* Top Sellers */}
            {dashboardData?.top_sellers?.length ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Mejores Vendedores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData.top_sellers.map((seller, index) => (
                    <div key={seller.username} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{seller.name}</p>
                          <p className="text-xs text-muted-foreground">@{seller.username}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatMoney(seller.total_sales, "USD")}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {/* Removed standalone Exchange Rates card to avoid duplication; now merged above */}
          </aside>
        </section>
      </WithStatusState>
    </PageLayout>
  );
};

export default Dashboard;
