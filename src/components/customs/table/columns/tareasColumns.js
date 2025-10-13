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
  createAgentColumn,
  applyRoleBasedColumns,
  injectDynamicOptions,
  createBaseColumns,
  createAmountOwedLocalColumn
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
  // Create base columns that all roles can see
  const baseColumns = createBaseColumns(columnHelper, {
    createNameColumn,
    createStatusColumn,
    createUpdatedAtColumn,
    createAssignmentDateColumn,
  }, title)

  // Create all available column definitions
  const availableColumns = {
    nameColumn: createNameColumn(columnHelper),
    statusColumn: createStatusColumn(columnHelper),
    updatedAtColumn: createUpdatedAtColumn(columnHelper),
    groupFilterColumn: createGroupFilterColumn(columnHelper),
    recordTypeColumn: createRecordTypeColumn(columnHelper),
    channelColumn: createChannelColumn(columnHelper),
    programColumn: createProgramColumn(columnHelper),
    phoneColumn: createPhoneColumn(columnHelper),
    contactedColumn: createContactedColumn(columnHelper),
    commentsColumn: createCommentsColumn(columnHelper),
    amountOwedLocalColumn: createAmountOwedLocalColumn(columnHelper),
    amountOwedColumn: createAmountOwedColumn(columnHelper),
    nationalityColumn: createNationalityColumn(columnHelper),
    agentColumn: createAgentColumn(columnHelper),
  }

  // Apply role-based column filtering
  const columns = applyRoleBasedColumns(baseColumns, role, availableColumns, 'tareas')

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