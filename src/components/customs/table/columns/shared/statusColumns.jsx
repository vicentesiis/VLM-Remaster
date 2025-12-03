
import {
  Check,
  X,
} from "lucide-react"
import React from "react"
import IconBadge from "../../../badge/icon-badge"
import PaymentStatusBadge from "../../../badge/payment-status-badge"
import StatusBadge from "../../../badge/status-badge"
import NullableCell from "../../cells/nullable-cell"
import { Badge } from "@/components/ui"
import { getRecordTypeConfig } from "@/constants"
import { formatDate, toTitleCase } from "@/utils"

/**
 * Creates a status column with StatusBadge component
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "status")
 * @param {string} header - The column header text (default: "Estatus")
 * @returns {Object} Column definition
 */
export const createStatusColumn = (columnHelper, accessor = "status", header = "Estatus") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => <StatusBadge status={info.getValue()} />,
    meta: {
      align: "center",
      variant: "multiSelect",
      label: header,
      options: [],
      maxWidth: "100px",
    },
  })

/**
 * Creates a payment status column with PaymentStatusBadge component
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "status")
 * @param {string} header - The column header text (default: "Estatus")
 * @returns {Object} Column definition
 */
export const createPaymentStatusColumn = (columnHelper, accessor = "status", header = "Estatus") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => <PaymentStatusBadge status={info.getValue()} />,
    meta: { align: "center" },
  })

/**
 * Creates an assignment date column with conditional badge styling for Leads
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "assignment_date")
 * @param {string} header - The column header text (default: "Fecha de asignación")
 * @param {string} title - Component title to determine special behavior (optional)
 * @returns {Object} Column definition
 */
export const createAssignmentDateColumn = (columnHelper, accessor = "assignment_date", header = "Fecha de asignación", title = "") =>
  columnHelper.accessor(accessor, {
    header,
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
 * @param {string} accessor - The data accessor key (default: "record_type")
 * @param {string} header - The column header text (default: "Tipo")
 * @returns {Object} Column definition
 */
export const createRecordTypeColumn = (columnHelper, accessor = "record_type", header = "Tipo") =>
  columnHelper.accessor(accessor, {
    header,
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
      label: header,
      options: [],
    },
  })

/**
 * Creates a contacted column with boolean check/x icons
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "contacted")
 * @param {string} header - The column header text (default: "Contacto efectivo")
 * @returns {Object} Column definition
 */
export const createContactedColumn = (columnHelper, accessor = "contacted", header = "Contacto efectivo") =>
  columnHelper.accessor(accessor, {
    header,
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

/**
 * Creates a WhatsApp contacted column with boolean check/x icons
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "contacted_wapp")
 * @param {string} header - The column header text (default: "Contactado por WhatsApp")
 * @returns {Object} Column definition
 */
export const createContactedWappColumn = (columnHelper, accessor = "contacted_wapp", header = "Contactado WhatsApp") =>
  columnHelper.accessor(accessor, {
    header,
    cell: ({ getValue }) => {
      const contactedWapp = getValue()
      const isContacted = contactedWapp === true
      
      return (
        <div
          className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${isContacted
            ? "border-green-500 bg-green-100 text-green-700"
            : "border-red-500 bg-red-100 text-red-700"
            }`}
        >
          {isContacted ? (
            <Check className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <X className="h-4 w-4" strokeWidth={2.5} />
          )}
        </div>
      )
    },
    meta: { align: "center" },
  })

