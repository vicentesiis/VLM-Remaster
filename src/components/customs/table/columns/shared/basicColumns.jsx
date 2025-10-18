
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import NullableCell from "../../cells/nullable-cell"
import { MainCell } from "@/components/customs/table/cells/main-cell"
import { formatDate } from "@/utils"

const columnHelper = createColumnHelper()

/**
 * Creates a name column with MainCell component for navigation
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "name")
 * @param {string} header - The column header text (default: "Nombre")
 * @returns {Object} Column definition
 */
export const createNameColumn = (columnHelper, accessor = "name", header = "Nombre") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => (
      <MainCell
        title={info.getValue()}
        public_id={info.row.original.public_id}
        path="/detalle"
      />
    ),
  })

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

export { columnHelper }