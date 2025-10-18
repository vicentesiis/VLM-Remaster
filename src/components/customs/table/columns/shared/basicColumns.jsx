import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import NullableCell from "../../cells/nullable-cell"
import { MainCell } from "@/components/customs/table/cells/main-cell"
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

export { columnHelper }