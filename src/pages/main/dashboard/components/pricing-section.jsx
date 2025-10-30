import { TrendingUp } from "lucide-react";
import React from "react";

import { ExchangeChips } from "./exchange-chips";
import { SectionCardHeader } from "@/components/customs/section-card-header";
import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PricingSection({
  currencyFilter,
  setCurrencyFilter,
  allCurrencies,
  exchangeRates,
  programPricingTable,
  isFetching,
  isError,
  isFetched
}) {
  return (
    <Card>
      <SectionCardHeader
        icon={TrendingUp}
        title="Precios por Programa y Tipo de Cambio"
        description="Información actualizada de precios por programa y tasas de cambio"
      />
      <CardContent className="pt-4">
        {/* ===== Exchange Rates ===== */}
        <section className="border-b pb-3">
          <header className="flex items-center justify-between pb-1">
            <h3 className="text-sm  font-semibold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Tipos de cambio actuales
            </h3>
          </header>

          <div className="pt-2">
            <ExchangeChips rates={exchangeRates} />
          </div>
        </section>

        {/* ===== Pricing Table ===== */}
        <section className="py-4">
          <header className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Tabla de precios por programa
            </h3>

            <div className="flex items-center gap-2">
              <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Filtrar moneda" />
                </SelectTrigger>
                <SelectContent className="shadow-lg">
                  <SelectItem value="all" className="font-medium">
                    Todas las monedas
                  </SelectItem>
                  {allCurrencies.map((c) => (
                    <SelectItem
                      key={c}
                      value={c}
                      className="uppercase font-mono font-medium"
                    >
                      {c.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </header>

          <DataTable
            table={programPricingTable}
            isLoading={isFetching}
            isError={isError}
            hasFetched={isFetched}
            showPagination={false}
          />
        </section>
      </CardContent>
    </Card>
  );
}

