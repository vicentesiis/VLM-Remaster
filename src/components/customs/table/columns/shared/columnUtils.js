import { Roles } from "@/constants"

/**
 * Applies role-based column filtering to a set of columns
 * @param {Array} baseColumns - Base columns that all roles can see
 * @param {string} role - User role (ADMIN, SUPER_ADMIN, AGENT, LEADER)
 * @param {Object} availableColumns - Object containing all available column definitions
 * @param {string} componentType - Type of component (registros, clientes, leads, prospectos, tareas)
 * @returns {Array} Filtered columns based on role and component type
 */
export const applyRoleBasedColumns = (baseColumns, role, availableColumns, componentType = 'registros') => {
  const isAdmin = role === Roles.ADMIN
  const isSuperAdmin = role === Roles.SUPER_ADMIN
  const isAgent = role === Roles.AGENT
  const isLeader = role === Roles.LEADER

  // Get base columns without assignment_date for specific cases
  const getBaseColumnsWithoutAssignment = () => [
    availableColumns.nameColumn || baseColumns.find(col => col.accessorKey === 'name'),
    availableColumns.statusColumn || baseColumns.find(col => col.accessorKey === 'status'),
    availableColumns.updatedAtColumn || baseColumns.find(col => col.accessorKey === 'updated_at'),
  ].filter(Boolean)

  if (isSuperAdmin || isAdmin) {
    switch (componentType) {
      case 'registros':
        return [
          ...(isSuperAdmin ? [availableColumns.groupFilterColumn] : []),
          ...baseColumns,
          availableColumns.recordTypeColumn,
          availableColumns.channelColumn,
          availableColumns.programColumn,
          availableColumns.amountOwedLocalColumn,
          availableColumns.amountOwedColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      case 'clientes':
        return [
          ...(isSuperAdmin ? [availableColumns.groupFilterColumn] : []),
          ...baseColumns,
          availableColumns.recordTypeColumn,
          availableColumns.channelColumn,
          availableColumns.programColumn,
          availableColumns.amountOwedLocalColumn,
          availableColumns.amountOwedColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      case 'leads':
        // Leads keep current columns (ok as specified)
        return [
          ...(isSuperAdmin ? [availableColumns.groupFilterColumn] : []),
          ...baseColumns,
          availableColumns.recordTypeColumn,
          availableColumns.channelColumn,
          availableColumns.programColumn,
          availableColumns.contactedColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      case 'prospectos':
        return [
          ...(isSuperAdmin ? [availableColumns.groupFilterColumn] : []),
          ...baseColumns,
          availableColumns.recordTypeColumn,
          availableColumns.channelColumn,
          availableColumns.programColumn,
          availableColumns.contactedColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      case 'tareas':
        return [
          ...(isSuperAdmin ? [availableColumns.groupFilterColumn] : []),
          ...baseColumns,
          availableColumns.programColumn,
          availableColumns.amountOwedLocalColumn,
          availableColumns.amountOwedColumn,
          availableColumns.phoneColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      default:
        return [
          ...(isSuperAdmin ? [availableColumns.groupFilterColumn] : []),
          ...baseColumns,
          availableColumns.recordTypeColumn,
          availableColumns.channelColumn,
          availableColumns.programColumn,
          availableColumns.contactedColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)
    }
  } else if (isAgent || isLeader) {
    switch (componentType) {
      case 'tareas':
        // For agents/leaders: Nombre, Status, Ultima actualización, Programa, Por pagar, Telefono, Coment
        const baseWithoutAssignment = getBaseColumnsWithoutAssignment()
        return [
          ...baseWithoutAssignment,
          availableColumns.programColumn,
          availableColumns.amountOwedLocalColumn,
          availableColumns.amountOwedColumn,
          availableColumns.phoneColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      case 'clientes':
        // For agents/leaders: Nombre, Status, Ultima actualización, Programa, Por pagar, Telefono, Coment
        const clientesBaseWithoutAssignment = getBaseColumnsWithoutAssignment()
        return [
          ...clientesBaseWithoutAssignment,
          availableColumns.programColumn,
          availableColumns.amountOwedLocalColumn,
          availableColumns.amountOwedColumn,
          availableColumns.phoneColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      case 'prospectos':
        // For agents/leaders: Nombre, Status, Ultima actualización, Programa, telefóno, Contacto efectivo, Coment
        const prospectosBaseWithoutAssignment = getBaseColumnsWithoutAssignment()
        return [
          ...prospectosBaseWithoutAssignment,
          availableColumns.programColumn,
          availableColumns.phoneColumn,
          availableColumns.contactedColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)

      case 'leads': {
        // For agents/leaders: Nombre, Status, Fecha de asignación, Programa, Telefono, Contacto efectivo, Contactado por WhatsApp, Coment, WhatsApp
        const leadsBaseWithoutUpdatedAt = [
          availableColumns.nameColumn || baseColumns.find(col => col.accessorKey === 'name'),
          availableColumns.statusColumn || baseColumns.find(col => col.accessorKey === 'status'),
        ].filter(Boolean)
        return [
          ...leadsBaseWithoutUpdatedAt,
          availableColumns.assignmentDateColumn,
          availableColumns.programColumn,
          availableColumns.phoneColumn,
          availableColumns.contactedColumn,
          availableColumns.contactedWappColumn,
          availableColumns.commentsColumn,
          availableColumns.whatsAppActionColumn,
        ].filter(Boolean)
      }

      default:
        return [
          ...baseColumns,
          availableColumns.programColumn,
          availableColumns.phoneColumn,
          availableColumns.contactedColumn,
          availableColumns.commentsColumn,
        ].filter(Boolean)
    }
  } else {
    return [...baseColumns, availableColumns.commentsColumn].filter(Boolean)
  }
}

/**
 * Injects dynamic options into column meta properties
 * @param {Array} columns - Array of column definitions
 * @param {Object} options - Object containing dynamic options
 * @param {Array} options.recordStatuses - Status options for status column
 * @param {Array} options.recordTypes - Type options for record type column
 * @param {Array} options.channels - Channel options for channel column
 * @param {Array} options.programs - Program options for program column
 * @param {Array} options.groups - Group options for group filter column
 * @returns {Array} Columns with injected options
 */
export const injectDynamicOptions = (columns, options = {}) => {
  const {
    recordStatuses = [],
    recordTypes = [],
    channels = [],
    programs = [],
    groups = [],
  } = options

  return columns.map((column) => {
    // Clone the column to avoid mutating the original
    const clonedColumn = { ...column }

    if (clonedColumn.meta) {
      clonedColumn.meta = { ...clonedColumn.meta }
    }

    // Inject options based on column accessor
    if (column.accessorKey === "status" && clonedColumn.meta) {
      clonedColumn.meta.options = recordStatuses
    } else if (column.accessorKey === "record_type" && clonedColumn.meta) {
      clonedColumn.meta.options = recordTypes
    } else if (column.accessorKey === "channel" && clonedColumn.meta) {
      clonedColumn.meta.options = channels
    } else if (column.accessorKey === "program" && clonedColumn.meta) {
      clonedColumn.meta.options = programs
    } else if (column.accessorKey === "group_id" && clonedColumn.meta) {
      clonedColumn.meta.options = groups
    }

    return clonedColumn
  })
}



/**
 * Validates that required column options are provided
 * @param {Object} options - Column options to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation result with isValid boolean and missing fields array
 */
export const validateColumnOptions = (options, requiredFields = []) => {
  const missing = requiredFields.filter(field =>
    !options.hasOwnProperty(field) || options[field] === undefined
  )

  return {
    isValid: missing.length === 0,
    missing,
  }
}

/**
 * Creates base columns that are common across most registros components
 * Note: Removed caching for this function since the title parameter affects column behavior
 * and caching was causing stale title values to persist across different components
 * @param {Object} columnHelper - TanStack table column helper
 * @param {Object} commonColumns - Object containing common column creation functions
 * @param {string} title - Component title for conditional logic
 * @returns {Array} Array of base column definitions
 */
export const createBaseColumns = (columnHelper, commonColumns, title = "") => {
  // Always create fresh columns to ensure title parameter is current
  return [
    commonColumns.createNameColumn ? commonColumns.createNameColumn(columnHelper) : commonColumns.createMainCellColumn(columnHelper),
    commonColumns.createStatusColumn(columnHelper),
    commonColumns.createUpdatedAtColumn(columnHelper),
  ]
}