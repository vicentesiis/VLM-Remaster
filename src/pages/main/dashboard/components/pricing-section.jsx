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
        title="Precios y Tipo de Cambio"
        description="Información actualizada de precios y tasas de cambio"
      />
      <CardContent>
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Tipos de Cambio Actuales
          </h3>
          <ExchangeChips rates={exchangeRates} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-between">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Tabla de Precios
            </h3>
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Filtrar moneda" />
              </SelectTrigger>
              <SelectContent className=" shadow-lg">
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
          <DataTable
            table={programPricingTable}
            isLoading={isFetching}
            isError={isError}
            hasFetched={isFetched}
            showPagination={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}