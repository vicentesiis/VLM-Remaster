/**
 * Shared column utilities and components
 * 
 * This module exports all the shared column creation functions and utilities
 * used across different registros component types. It provides a centralized
 * location for common column definitions and utility functions.
 */

// Export all common column creation functions
export {
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
  columnHelper,
  createAmountOwedLocalColumn
} from './commonColumns.jsx'

// Export all column utility functions
export {
  applyRoleBasedColumns,
  injectDynamicOptions,
  validateColumnOptions,
  createBaseColumns,
} from './columnUtils'