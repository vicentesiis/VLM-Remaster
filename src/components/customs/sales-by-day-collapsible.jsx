import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { formatDate } from "@/utils"

export const SalesByDayCollapsible = ({ sales }) => {
  if (!sales?.length) return null

  // 🔥 Filter out days with zero orders
  const filteredSales = sales.filter((entry) => entry.total_day_orders > 0)

  if (!filteredSales.length) return null

  return (
    <div className="flex flex-col">
      {filteredSales.map((entry) => (
        <Collapsible key={entry.date}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between px-4 py-2 text-left font-semibold"
            >
              <span>{formatDate(entry.date)}</span>
              <span className="text-sm text-muted-foreground">
                💰 ${entry.total_day_sales.toLocaleString()} — 🧾{" "}
                {entry.total_day_orders} orden
                {entry.total_day_orders > 1 ? "es" : ""}
              </span>
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-2 px-4 py-2">
            {entry.orders.map((order) => {
              const {
                id,
                amount,
                reference,
                payment_method,
                payment_date,
                record: { name: recordName } = {},
                user: { phone, name: userName } = {},
              } = order

              return (
                <div
                  key={id}
                  className="rounded-md border p-3 text-sm shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <div className="font-semibold text-primary">
                        Ref: {reference}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Pagado: {formatDate(payment_date)}
                      </div>
                    </div>
                    <Badge variant="success">${amount}</Badge>
                  </div>

                  <div className="mt-2 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
                    <div>👤 Cliente: {recordName}</div>
                    <div>📱 Teléfono: {phone}</div>
                    <div>👨‍💼 Agente: {userName}</div>
                    <div>🧾 Método: {payment_method}</div>
                  </div>
                </div>
              )
            })}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

export default SalesByDayCollapsible
