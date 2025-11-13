import { Banknote, CreditCard, FileText } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import PaymentStatusBadge from "../badge/payment-status-badge"
import {
  Card,
  CardContent,
  CustomDialog,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogBody,
} from "@/components/ui"
import { formatDate } from "@/utils"
import { formatCurrency } from "@/utils"

export function OrderDescriptionDialog({ order, open, onOpenChange }) {
  if (!order) return null

  const {
    status,
    payment_method,
    amount,
    reference,
    clabe,
    payment_date,
    expiration_date,
    created_at,
    record,
    user,
  } = order

  const { public_id } = record ?? {}
  const { name } = user ?? {}

  return (
    <CustomDialog open={open} onOpenChange={onOpenChange}>
      <CustomDialogContent className="max-w-lg">
        <CustomDialogHeader
          icon={FileText}
          title="Detalle de la orden"
          iconBgClass="bg-green-600"
        />

        <CustomDialogBody>
          <Card>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <InfoRow label="ID del Registro">
                  <span className="font-mono">{public_id ?? "-"}</span>
                </InfoRow>
                <InfoRow label="Agente">{name ?? "-"}</InfoRow>
                <InfoRow label="Estatus">
                  <PaymentStatusBadge status={status} />
                </InfoRow>

                <InfoRow label="Método de Pago">
                  {payment_method === "cash" && (
                    <>
                      <Banknote className="h-4 w-4 text-primary" />
                      Efectivo
                    </>
                  )}
                  {payment_method === "spei" && (
                    <>
                      <CreditCard className="h-4 w-4 text-primary" />
                      SPEI
                    </>
                  )}
                </InfoRow>

                <InfoRow label="Cantidad">
                  <span className="font-semibold">{formatCurrency(amount)}</span>
                </InfoRow>

                <InfoRow label="Referencia">{reference ?? "-"}</InfoRow>
                <InfoRow label="CLABE">{clabe ?? "-"}</InfoRow>
                <InfoRow label="Fecha de Pago">
                  {formatDate(payment_date)}
                </InfoRow>
                <InfoRow label="Expira">{formatDate(expiration_date)}</InfoRow>
                <InfoRow label="Creada">{formatDate(created_at)}</InfoRow>
              </div>
            </CardContent>
          </Card>
        </CustomDialogBody>
      </CustomDialogContent>
    </CustomDialog>
  )
}

OrderDescriptionDialog.propTypes = {
  onOpenChange: PropTypes.any,
  open: PropTypes.any,
  order: PropTypes.any,
}

function InfoRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1">{children}</span>
    </div>
  )
}
