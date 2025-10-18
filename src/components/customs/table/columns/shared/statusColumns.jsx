import { createColumnHelper } from "@tanstack/react-table"
import {
  Check,
  X,
  UserCheck,
  Target,
  Contact
} from "lucide-react"
import React from "react"
import IconBadge from "../../../badge/icon-badge"
import PaymentStatusBadge from "../../../badge/payment-status-badge"
import StatusBadge from "../../../badge/status-badge"
import NullableCell from "../../cells/nullable-cell"
import { Badge } from "@/components/ui"
import { formatDate, toTitleCase } from "@/utils"

const columnHelper = createColumnHelper()

// Helper function to get record type config
const getRecordTypeConfig = (recordType) => {
  const typeLower = recordType?.toLowerCase()

  switch (typeLower) {
    case 'lead':
      return { icon: Contact, variant: 'warning' }
    case 'prospect':
      return { icon: Target, variant: 'success' }
    default:
      return { icon: UserCheck, variant: 'outline' }
  }
}

/**
 * Creates a status column with StatusBadge component
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createStatusColumn = (columnHelper) =>
  columnHelper.accessor("status", {
    header: "Estatus",
    cell: (info) => <StatusBadge status={info.getValue()} />,
    meta: {
      align: "center",
      variant: "multiSelect",
      label: "Estatus",
      options: [],
      maxWidth: "100px",
    },
  })

/**
 * Creates a payment status column with PaymentStatusBadge component
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createPaymentStatusColumn = (columnHelper) =>
  columnHelper.accessor("status", {
    header: "Estatus",
    cell: (info) => <PaymentStatusBadge status={info.getValue()} />,
    meta: { align: "center" },
  })

/**
 * Creates an assignment date column with conditional badge styling for Leads
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} title - Component title to determine special behavior
 * @returns {Object} Column definition
 */
export const createAssignmentDateColumn = (columnHelper, title = "") =>
  columnHelper.accessor("assignment_date", {
    header: "Fecha de asignación",
    cell: (info) => {
      const assignmentDate = info.getValue()

      if (!assignmentDate) {
        return <NullableCell className="text-center" />
      }

      const date = new Date(assignmentDate)
      const now = new Date()
      const hoursDiff =
        Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)

      let variant = "neutral"
      let label = formatDate(assignmentDate)

      if (title === "Leads") {
        if (hoursDiff <= 12) {
          variant = "success"
        } else if (hoursDiff <= 24) {
          variant = "warning"
        } else {
          variant = "error"
        }

        return (
          <Badge variant={variant} className="w-full justify-center">
            {label}
          </Badge>
        )
      }
      return <NullableCell value={label} className="text-center" />
    },
    meta: {
      align: "center",
    },
  })

/**
 * Creates a record type column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createRecordTypeColumn = (columnHelper) =>
  columnHelper.accessor("record_type", {
    header: "Tipo",
    cell: (info) => {
      const recordType = info.getValue()
      if (!recordType) return <NullableCell value={null} className="text-center" />

      const { icon: Icon, variant } = getRecordTypeConfig(recordType)

      return (
        <div className="flex justify-center">
          <IconBadge
            title={toTitleCase(recordType)}
            icon={Icon}
            variant={variant}
          />
        </div>
      )
    },
    meta: {
      align: "center",
      variant: "select",
      label: "Tipo",
      options: [],
    },
  })

/**
 * Creates a contacted column with boolean check/x icons
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createContactedColumn = (columnHelper) =>
  columnHelper.accessor("contacted", {
    header: "Contacto efectivo",
    cell: ({ getValue }) => {
      const contacted = getValue()
      if (typeof contacted !== "boolean") return <NullableCell value={null} />
      return (
        <div
          className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${contacted
            ? "border-green-500 bg-green-100 text-green-700"
            : "border-red-500 bg-red-100 text-red-700"
            }`}
        >
          {contacted ? (
            <Check className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <X className="h-4 w-4" strokeWidth={2.5} />
          )}
        </div>
      )
    },
    meta: { align: "center" },
  })

export { columnHelper }