import { createColumnHelper } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import React from "react"
import StatusBadge from "../../../badge/status-badge"
import NullableCell from "../../cells/nullable-cell"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { Badge } from "@/components/ui"
import { formatDate } from "@/utils"

const columnHelper = createColumnHelper()

/**
 * Creates a name column with MainCell component for navigation
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createNameColumn = (columnHelper) =>
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: (info) => (
      <MainCell
        title={info.getValue()}
        public_id={info.row.original.public_id}
        path="/detalle"
      />
    ),
  })

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
 * Creates an updated_at column with date formatting
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createUpdatedAtColumn = (columnHelper) =>
  columnHelper.accessor("updated_at", {
    header: "Última actualización",
    cell: (info) => (
      <NullableCell value={formatDate(info.getValue())} className="text-center" />
    ),
    meta: {
      align: "center",
      variant: "dateRange",
      label: "Rango de fechas",
    },
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
        console.log(title)
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
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
      variant: "select",
      label: "Tipo",
      options: [],
    },
  })

/**
 * Creates a channel column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createChannelColumn = (columnHelper) =>
  columnHelper.accessor("channel", {
    header: "Canal",
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
      variant: "multiSelect",
      label: "Canal",
      options: [],
    },
  })

/**
 * Creates a program column
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createProgramColumn = (columnHelper) =>
  columnHelper.accessor("program", {
    header: "Programa",
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
      variant: "multiSelect",
      label: "Programa",
      options: [],
    },
  })

/**
 * Creates a phone column for agent users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createPhoneColumn = (columnHelper) =>
  columnHelper.accessor("phone", {
    header: "Teléfono",
    cell: (info) => <NullableCell value={info.getValue()} />,
    meta: {
      align: "center",
    },
  })

/**
 * Creates a comments column
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createCommentsColumn = (columnHelper) =>
  columnHelper.accessor("comments", {
    header: "Comentarios",
    cell: (info) => (
      <NullableCell
        value={info.getValue()}
        className="line-clamp-2 max-w-xs break-words"
      />
    ),
    meta: {
      align: "center",
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
          className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${
            contacted
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
 * Creates a virtual group filter column for super admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createGroupFilterColumn = (columnHelper) =>
  columnHelper.accessor("group_id", {
    header: "Grupo",
    cell: () => null,
    meta: {
      align: "center",
      variant: "select",
      label: "Grupo",
      options: [],
      isVirtual: true,
    },
    enableColumnFilter: true,
  })

/**
 * Creates an amount owed column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createAmountOwedColumn = (columnHelper) =>
  columnHelper.accessor("amount_owed", {
    header: "Por pagar",
    cell: (info) => {
      const amount = info.getValue()
      if (amount == null) return <NullableCell value={null} className="text-center" />
      
      // Format as currency
      const formattedAmount = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(amount)
      
      return <NullableCell value={formattedAmount} className="text-center" />
    },
    meta: {
      align: "center",
    },
  })

/**
 * Creates a nationality column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createNationalityColumn = (columnHelper) =>
  columnHelper.accessor("nationality", {
    header: "Nacionalidad",
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
      variant: "select",
      label: "Nacionalidad",
      options: [],
    },
  })

// Export the column helper for use in specific column files
export { columnHelper }