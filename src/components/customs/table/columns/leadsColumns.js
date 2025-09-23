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
  applyRoleBasedColumns,
  injectDynamicOptions,
  createBaseColumns,
} from "./shared"

/**
 * Creates column configuration for Leads component
 * @param {Object} params - Column configuration parameters
 * @param {string} params.role - User role (ADMIN, SUPER_ADMIN, AGENT)
 * @param {Array} params.groups - Available groups for filtering
 * @param {Array} params.channels - Available channels for filtering
 * @param {Array} params.programs - Available programs for filtering
 * @param {Array} params.recordStatuses - Available record statuses for filtering
 * @param {Array} params.recordTypes - Available record types for filtering
 * @param {string} params.title - Component title (defaults to "Leads")
 * @returns {Array} Array of column definitions for Leads component
 */
export const getLeadsColumns = ({
  role,
  groups = [],
  channels = [],
  programs = [],
  recordStatuses = [],
  recordTypes = [],
  title = "Leads",
}) => {
  // Create base columns that all roles can see
  // The assignment date column will automatically use leads-specific logic
  // when title is "Leads" due to the implementation in createAssignmentDateColumn
  const baseColumns = createBaseColumns(columnHelper, {
    createNameColumn,
    createStatusColumn,
    createUpdatedAtColumn,
    createAssignmentDateColumn,
  }, title)

  // Create all available column definitions
  const availableColumns = {
    groupFilterColumn: createGroupFilterColumn(columnHelper),
    recordTypeColumn: createRecordTypeColumn(columnHelper),
    channelColumn: createChannelColumn(columnHelper),
    programColumn: createProgramColumn(columnHelper),
    phoneColumn: createPhoneColumn(columnHelper),
    contactedColumn: createContactedColumn(columnHelper),
    commentsColumn: createCommentsColumn(columnHelper),
  }

  // Apply role-based column filtering
  const columns = applyRoleBasedColumns(baseColumns, role, availableColumns)

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