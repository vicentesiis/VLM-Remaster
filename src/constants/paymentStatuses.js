export const PaymentStatuses = Object.freeze({
  CREATED: "created",
  PENDING: "pending_payment",
  PAID: "paid",
  CANCELLED: "cancelled",
  FAILED: "failed",
  EXPIRED: "expired",
})

export const PAYMENT_STATUSES_LABEL = {
  [PaymentStatuses.CREATED]: "Creado",
  [PaymentStatuses.PENDING]: "Pendiente de Pago",
  [PaymentStatuses.PAID]: "Pagado",
  [PaymentStatuses.CANCELLED]: "Cancelado",
  [PaymentStatuses.FAILED]: "Fallido",
  [PaymentStatuses.EXPIRED]: "Expirado",
}

export const PAYMENT_STATUS_TO_VARIANT_MAP = {
  [PaymentStatuses.CREATED]: "info",
  [PaymentStatuses.PENDING]: "warning",
  [PaymentStatuses.PAID]: "success",
  [PaymentStatuses.CANCELLED]: "destructive",
  [PaymentStatuses.FAILED]: "destructive",
  [PaymentStatuses.EXPIRED]: "secondary",
}