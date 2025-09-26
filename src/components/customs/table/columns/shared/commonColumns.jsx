import { createColumnHelper } from "@tanstack/react-table"
import {
  Check,
  X,
  DollarSignIcon,
  UserCheck,
  Target,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Music,
  Mail,
  Phone,
  Globe,
  MoreHorizontal,
  Briefcase,
  Contact
} from "lucide-react"
import React from "react"
import IconBadge from "../../../badge/icon-badge"
import StatusBadge from "../../../badge/status-badge"
import NullableCell from "../../cells/nullable-cell"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { Badge } from "@/components/ui"
import { formatCurrency, formatDate, toTitleCase } from "@/utils"
import OxxoPayIcon from "@/assets/oxxo-pay.svg?react"
import PayCashIcon from "@/assets/pay-cash.svg?react"
import SPEIIcon from "@/assets/spei_icon.svg?react"

const columnHelper = createColumnHelper()

// Helper function to get channel icon and color
const getChannelConfig = (channel) => {
  const channelLower = channel?.toLowerCase()

  switch (channelLower) {
    case 'facebook':
      return { icon: Facebook, variant: 'facebook' }
    case 'instagram':
      return { icon: Instagram, variant: 'instagram' }
    case 'whatsapp':
      return { icon: MessageCircle, variant: 'whatsapp' }
    case 'telegram':
      return { icon: Send, variant: 'telegram' }
    case 'tiktok':
      return { icon: Music, variant: 'tiktok' }
    case 'email':
      return { icon: Mail, variant: 'email' }
    case 'phone':
      return { icon: Phone, variant: 'phone' }
    case 'web':
      return { icon: Globe, variant: 'web' }
    case 'other':
      return { icon: MoreHorizontal, variant: 'other' }
    default:
      return { icon: Globe, variant: 'outline' }
  }
}

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
 * Creates a channel column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createChannelColumn = (columnHelper) =>
  columnHelper.accessor("channel", {
    header: "Canal",
    cell: (info) => {
      const channel = info.getValue()
      if (!channel) return <NullableCell value={null} className="text-center" />

      const { icon: Icon, variant } = getChannelConfig(channel)

      return (
        <div className="flex justify-center">
          <IconBadge
            title={toTitleCase(channel)}
            icon={Icon}
            variant={variant}
          />
        </div>
      )
    },
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
    cell: (info) => {
      const program = info.getValue()
      if (!program) return <NullableCell value={null} className="text-center" />

      return (
        <div className="flex justify-center">
          <Badge variant="outline">
            {toTitleCase(program)}
          </Badge>
        </div>
      )
    },
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

      const formattedAmount = formatCurrency(amount)

      return (
        <div className="flex justify-center">
          <Badge
            variant={amount > 0 ? "destructive" : "outline"}
          >
            {formattedAmount}
          </Badge>
        </div>
      )
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

/**
 * Creates an agent column for displaying assigned agent
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createAgentColumn = (columnHelper) =>
  columnHelper.accessor("agent", {
    header: "Agente",
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
    },
  })

/**
 * Creates a payment method column with standardized icons
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createPaymentMethodColumn = (columnHelper) =>
  columnHelper.accessor("payment_method", {
    header: "Método de Pago",
    cell: ({ getValue }) => {
      const value = getValue()
      if (value === "cash") {
        return (
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <OxxoPayIcon className="w-20 h-10" />
          </div>
        )
      }
      if (value === "spei") {
        return (
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <SPEIIcon className="size-10" />
          </div>
        )
      }
      if (value === "bank") {
        return (
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <PayCashIcon className="w-20 h-10" />
          </div>
        )
      }
      return <NullableCell value={null} />
    },
    meta: { align: "center" },
  })

// Export the column helper for use in specific column files
export { columnHelper }