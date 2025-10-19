
import { createColumnHelper } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"
import NullableCell from "../../cells/nullable-cell"
import UsuarioCell from "../../cells/usuario-cell"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { Badge } from "@/components/ui/badge"
import { formatDate, toTitleCase } from "@/utils"

const columnHelper = createColumnHelper()

/**
 * Creates a main cell column with MainCell component for navigation
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "name")
 * @param {string} header - The column header text (default: "Nombre")
 * @param {Object} options - Configuration options
 * @param {string} options.nameField - Field to use for title (default: uses accessor value)
 * @param {string} options.recordPath - Path to record object (default: null)
 * @param {string} options.publicIdField - Field for public_id (default: "public_id")
 * @param {string} options.path - Navigation path (default: "/detalle")
 * @param {string} options.id - Column ID (default: null)
 * @param {string} options.align - Column alignment (default: "left")
 * @returns {Object} Column definition
 */
export const createMainCellColumn = (
  columnHelper,
  accessor = "name",
  header = "Nombre",
  options = {}
) => {
  const {
    nameField = null,
    recordPath = null,
    publicIdField = "public_id",
    path = "/detalle",
    id = null,
    align = "left"
  } = options

  return columnHelper.accessor(accessor, {
    ...(id && { id }),
    header,
    cell: ({ row, getValue }) => {
      const record = recordPath ? row.original[recordPath] : row.original
      const title = nameField ? record[nameField] : getValue()
      
      if (!record?.[publicIdField]) return <NullableCell value={null} />

      return (
        <MainCell
          public_id={record[publicIdField]}
          title={title}
          path={path}
        />
      )
    },
    meta: { align },
  })
}

/**
 * Creates a phone column for agent users
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "phone")
 * @param {string} header - The column header text (default: "Teléfono")
 * @returns {Object} Column definition
 */
export const createPhoneColumn = (columnHelper, accessor = "phone", header = "Teléfono") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => <NullableCell value={info.getValue()} />,
    meta: {
      align: "center",
    },
  })

/**
 * Creates a comments column
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "comments")
 * @param {string} header - The column header text (default: "Comentarios")
 * @returns {Object} Column definition
 */
export const createCommentsColumn = (columnHelper, accessor = "comments", header = "Comentarios") =>
  columnHelper.accessor(accessor, {
    header,
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
 * Creates a nationality column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "nationality")
 * @param {string} header - The column header text (default: "Nacionalidad")
 * @returns {Object} Column definition
 */
export const createNationalityColumn = (columnHelper, accessor = "nationality", header = "Nacionalidad") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
      variant: "select",
      label: header,
      options: [],
    },
  })

/**
 * Creates an agent column for displaying assigned agent
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "agent")
 * @param {string} header - The column header text (default: "Agente")
 * @returns {Object} Column definition
 */
export const createAgentColumn = (columnHelper, accessor = "agent", header = "Agente") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => (
      <NullableCell value={info.getValue()} className="text-center" />
    ),
    meta: {
      align: "center",
    },
  })

/**
 * Creates a generic date column with formatting
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key
 * @param {string} header - The column header text
 * @returns {Object} Column definition
 */
export const createDateColumn = (columnHelper, accessor, header) =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const date = info.getValue()
      return <NullableCell value={date ? formatDate(date) : null} className="text-center" />
    },
    meta: { align: "center" },
  })

/**
 * Creates a generic text column with nullable cell
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key
 * @param {string} header - The column header text
 * @returns {Object} Column definition
 */
export const createTextColumn = (columnHelper, accessor, header) =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => <NullableCell value={info.getValue()} className="text-center" />,
    meta: { align: "center" },
  })

/**
 * Creates an updated_at column with date formatting
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "updated_at")
 * @param {string} header - The column header text (default: "Última actualización")
 * @returns {Object} Column definition
 */
export const createUpdatedAtColumn = (columnHelper, accessor = "updated_at", header = "Última actualización") =>
  columnHelper.accessor(accessor, {
    header,
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
 * Creates a virtual group filter column for super admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "group_id")
 * @param {string} header - The column header text (default: "Grupo")
 * @returns {Object} Column definition
 */
export const createGroupFilterColumn = (columnHelper, accessor = "group_id", header = "Grupo") =>
  columnHelper.accessor(accessor, {
    header,
    cell: () => null,
    meta: {
      align: "center",
      variant: "select",
      label: header,
      options: [],
      isVirtual: true,
    },
    enableColumnFilter: true,
  })



/**
 * Creates a usuario column with UsuarioCell component
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} header - The column header text (default: "Usuario")
 * @param {string} nameAccessor - The accessor for the name field (default: "name")
 * @param {string} usernameAccessor - The accessor for the username field (default: "username")
 * @param {string} userPath - The path to the user object (default: null)
 * @returns {Object} Column definition
 */
export const createUsuarioColumn = (
  columnHelper,
  header = "Usuario",
  nameAccessor = "name",
  usernameAccessor = "username",
  userPath = null
) =>
  columnHelper.display({
    id: "usuario",
    header,
    cell: ({ row }) => {
      const user = userPath ? row.original[userPath] : row.original

      if (!user?.[usernameAccessor] && !user?.[nameAccessor]) {
        return <NullableCell value={null} />
      }

      return <UsuarioCell name={user[nameAccessor]} username={user[usernameAccessor]} />
    },
  })

/**
 * Creates a boolean status column with check/X icons
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key
 * @param {string} header - The column header text
 * @param {string} maxWidth - The maximum width (default: "40px")
 * @returns {Object} Column definition
 */
export const createBooleanStatusColumn = (columnHelper, accessor, header, maxWidth = "40px") =>
  columnHelper.accessor(accessor, {
    header,
    cell: ({ getValue }) => {
      const active = getValue()
      if (typeof active !== "boolean") return <NullableCell value={null} />
      return (
        <div
          className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${
            active
              ? "border-green-500 bg-green-100 text-green-700"
              : "border-red-500 bg-red-100 text-red-700"
          }`}
        >
          {active ? (
            <Check className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <X className="h-4 w-4" strokeWidth={2.5} />
          )}
        </div>
      )
    },
    meta: { align: "center", maxWidth },
  })

/**
 * Creates an orders count column
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor function (default: (row) => row.orders?.length)
 * @param {string} header - The column header text (default: "Número de órdenes")
 * @returns {Object} Column definition
 */
export const createOrdersCountColumn = (
  columnHelper,
  accessor = (row) => row.orders?.length,
  header = "Número de órdenes"
) =>
  columnHelper.accessor(accessor, {
    id: "orders",
    header,
    cell: (info) => {
      const totalOrders = info.getValue()
      return (
        <NullableCell
          value={totalOrders ?? null}
          className="text-center font-semibold"
        />
      )
    },
    meta: { align: "center" },
  })

/**
 * Creates an agent type column with badge display
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "agent_type")
 * @param {string} header - The column header text (default: "Tipo de Agente")
 * @returns {Object} Column definition
 */
export const createAgentTypeColumn = (columnHelper, accessor = "agent_type", header = "Tipo de Agente") =>
  columnHelper.accessor(accessor, {
    header,
    cell: ({ getValue }) => {
      const value = getValue()
      return value ? (
        <Badge variant="outline">{value.toUpperCase()}</Badge>
      ) : (
        <NullableCell value={null} />
      )
    },
    meta: { align: "center" },
  })

/**
 * Creates an ID link column with navigation
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "id")
 * @param {string} header - The column header text (default: "ID")
 * @param {string} basePath - The base path for navigation (default: "/detalle")
 * @param {string} maxWidth - The maximum width (default: "100px")
 * @param {boolean} openInNewTab - Whether to open in new tab (default: true)
 * @returns {Object} Column definition
 */
export const createIdLinkColumn = (
  columnHelper,
  accessor = "id",
  header = "ID",
  basePath = "/detalle",
  maxWidth = "100px",
  openInNewTab = true
) =>
  columnHelper.accessor(accessor, {
    header,
    meta: { align: "center", maxWidth },
    cell: (info) => {
      const id = info.getValue()
      return id ? (
        <Link
          to={`${basePath}/${id}`}
          className="truncate font-mono text-primary hover:underline"
          target={openInNewTab ? "_blank" : undefined}
        >
          {id}
        </Link>
      ) : (
        <NullableCell value={null} />
      )
    },
  })

/**
 * Creates a rate/salary column with currency and description
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "rate")
 * @param {string} header - The column header text (default: "Sueldo")
 * @param {string} currencyAccessor - The accessor for currency field (default: "currency")
 * @param {string} descriptionAccessor - The accessor for rate description (default: "rate_description")
 * @returns {Object} Column definition
 */
export const createRateColumn = (
  columnHelper,
  accessor = "rate",
  header = "Sueldo",
  currencyAccessor = "currency",
  descriptionAccessor = "rate_description"
) =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const rate = info.getValue()
      const currency = info.row.original[currencyAccessor]
      const rateDesc = info.row.original[descriptionAccessor]
      return rate ? (
        <span className="text-muted-foreground">{`$${rate} ${currency?.toUpperCase()}/${rateDesc}`}</span>
      ) : (
        <NullableCell value={null} />
      )
    },
    meta: { align: "center" },
  })

/**
 * Creates a title column with optional title case formatting
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key
 * @param {string} header - The column header text
 * @param {boolean} useTitleCase - Whether to apply title case formatting (default: false)
 * @returns {Object} Column definition
 */
export const createTitleColumn = (columnHelper, accessor, header, useTitleCase = false) =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const value = info.getValue()
      return <NullableCell value={useTitleCase ? toTitleCase(value) : value} />
    },
    meta: { align: "center" },
  })

export { columnHelper }