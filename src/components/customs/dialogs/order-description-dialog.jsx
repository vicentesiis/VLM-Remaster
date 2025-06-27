import { Banknote, CreditCard, FileText } from "lucide-react"
import React from "react"
import PaymentStatusBadge from "../badge/payment-status-badge"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeaderCustom,
} from "@/components/ui/dialog"
import { formatDate } from "@/lib"
import { formatCurrency } from "@/utils"
import { Card, CardContent } from "@/components/ui"

export function OrderDescriptionDialog({ order, open, onOpenChange }) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeaderCustom
          icon={FileText}
          title={"Detalle de la orden"}
          iconBgClass={"bg-green-600"}
        />

        <Card>
          <CardContent>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID del Proveedor</span>
                <span className="font-mono">{order.provider_order_id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Estatus</span>
                <PaymentStatusBadge status={order.status} />
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Método de Pago</span>
                <span className="flex items-center gap-1">
                  {order.payment_method === "cash" && (
                    <>
                      <Banknote className="h-4 w-4 text-primary" />
                      Efectivo
                    </>
                  )}
                  {order.payment_method === "spei" && (
                    <>
                      <CreditCard className="h-4 w-4 text-primary" />
                      SPEI
                    </>
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Cantidad</span>
                <span className="font-semibold">
                  {formatCurrency(order.amount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Referencia</span>
                <span>{order.reference ?? "---"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">CLABE</span>
                <span>{order.clabe ?? "---"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de Pago</span>
                <span>{formatDate(order.payment_date)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Expira</span>
                <span>{formatDate(order.expiration_date)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Creada</span>
                <span>{formatDate(order.created_at)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagado al Usuario</span>
                <Badge variant={order.paid_to_user ? "default" : "warning"}>
                  {order.paid_to_user ? "Sí" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
