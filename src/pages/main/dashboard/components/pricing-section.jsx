
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/data-table";
import { ExchangeChips } from "./exchange-chips";

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
        <ExchangeChips rates={exchangeRates} />
        <DataTable
          table={programPricingTable}
          isLoading={isFetching}
          isError={isError}
          hasFetched={isFetched}
          showPagination={false}
        />
      </CardContent>
    </Card>
  );
}