import {
  columnHelper,
  createNameColumn,
  createStatusColumn,
  createUpdatedAtColumn,
  createAssignmentDateColumn,
  createRecordTypeColumn,
  createChannelColumn,
  createProgramColumn,
  createPhoneColumn,
  createCommentsColumn,
  createContactedColumn,
  createGroupFilterColumn,
  createAmountOwedColumn,
  createNationalityColumn,
  applyRoleBasedColumns,
  injectDynamicOptions,
  createBaseColumns,
} from "./shared"
import { Roles } from "@/constants"

/**
 * Creates column configuration for Tareas component
 * @param {Object} params - Column configuration parameters
 * @param {string} params.role - User role (ADMIN, SUPER_ADMIN, AGENT)
 * @param {Array} params.groups - Available groups for filtering
 * @param {Array} params.channels - Available channels for filtering
 * @param {Array} params.programs - Available programs for filtering
 * @param {Array} params.recordStatuses - Available record statuses for filtering
 * @param {Array} params.recordTypes - Available record types for filtering
 * @param {string} params.title - Component title (defaults to "Tareas")
 * @returns {Array} Array of column definitions for Tareas component
 */
export const getTareasColumns = ({
  role,
  groups = [],
  channels = [],
  programs = [],
  recordStatuses = [],
  recordTypes = [],
  title = "Tareas",
}) => {


  // Create base columns - for ADMIN role, exclude assignment_date
  let baseColumns
  if (role === Roles.ADMIN) {
    // Custom base columns for ADMIN - exclude assignment_date
    baseColumns = [
      createNameColumn(columnHelper),
      createStatusColumn(columnHelper),
      createUpdatedAtColumn(columnHelper),
    ]
  } else {
    // Standard base columns for other roles
    baseColumns = createBaseColumns(columnHelper, {
      createNameColumn,
      createStatusColumn,
      createUpdatedAtColumn,
      createAssignmentDateColumn,
    }, title)
  }

  // Create all available column definitions
  const availableColumns = {
    groupFilterColumn: createGroupFilterColumn(columnHelper),
    recordTypeColumn: createRecordTypeColumn(columnHelper),
    channelColumn: createChannelColumn(columnHelper),
    programColumn: createProgramColumn(columnHelper),
    phoneColumn: createPhoneColumn(columnHelper),
    contactedColumn: createContactedColumn(columnHelper),
    commentsColumn: createCommentsColumn(columnHelper),
    amountOwedColumn: createAmountOwedColumn(columnHelper),
    nationalityColumn: createNationalityColumn(columnHelper),
  }

  // Apply role-based column filtering with custom logic for ADMIN
  let columns
  if (role === Roles.ADMIN) {
    // Custom column set for ADMIN - exclude contacted, add amount_owed and nationality
    columns = [
      ...baseColumns,
      availableColumns.channelColumn,
      availableColumns.programColumn,
      availableColumns.amountOwedColumn,
      availableColumns.nationalityColumn,
      availableColumns.commentsColumn,
    ]
  } else {
    // Use standard role-based filtering for other roles
    columns = applyRoleBasedColumns(baseColumns, role, availableColumns)
  }

  // Inject dynamic options into column meta properties
  const columnsWithOptions = injectDynamicOptions(columns, {
    recordStatuses,
    recordTypes,
    channels,
    programs,
    groups,
  })

  return columnsWithOptions
}