import { TrendingUp, Filter } from "lucide-react";

import React from "react";
import { ExchangeChips } from "./exchange-chips";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
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
    <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-slate-50/50">
      <CardHeader className="pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Precios y Tipo de Cambio
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">
                Información actualizada de precios y tasas de cambio
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="h-9 w-[180px] border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors">
                <SelectValue placeholder="Filtrar moneda" />
              </SelectTrigger>
              <SelectContent className="border-slate-200 shadow-lg">
                <SelectItem value="all" className="font-medium">
                  Todas las monedas
                </SelectItem>
                {allCurrencies.map((c) => (
                  <SelectItem
                    key={c}
                    value={c}
                    className="uppercase font-mono font-medium hover:bg-slate-50"
                  >
                    {c.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Tipos de Cambio Actuales
          </h3>
          <ExchangeChips rates={exchangeRates} />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Tabla de Precios
          </h3>
          <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
            <DataTable
              table={programPricingTable}
              isLoading={isFetching}
              isError={isError}
              hasFetched={isFetched}
              showPagination={false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}