import { validateColumnOptions } from "./shared/columnUtils"
import { getClientesColumns } from "./clientesColumns"
import { getLeadsColumns } from "./leadsColumns"
import { getProspectosColumns } from "./prospectosColumns"
import { getRegistrosColumns } from "./registrosColumns.jsx"
import { getTareasColumns } from "./tareasColumns"

/**
 * Maps component types to their corresponding column functions
 * This mapping will be expanded as new column files are created
 * 
 * @type {Object.<string, Function>}
 */
const COLUMN_FUNCTION_MAP = {
  registros: getRegistrosColumns,
  prospectos: getProspectosColumns,
  leads: getLeadsColumns,
  clientes: getClientesColumns,
  tareas: getTareasColumns,
}

/**
 * Maps route component names to column types
 * This provides the bridge between route configuration and column resolution
 * 
 * @type {Object.<string, string>}
 */
const COMPONENT_TO_COLUMN_TYPE_MAP = {
  registros: "registros",
  prospectos: "prospectos",
  leads: "leads", 
  misClientes: "clientes",
  clientes: "clientes",
  tareas: "tareas",
}

/**
 * Validates column configuration options
 * @param {Object} options - Column configuration options
 * @returns {Object} Validation result
 */
const validateColumnConfiguration = (options) => {
  const requiredFields = ["role"]
  
  // Quick validation for required fields
  const missing = requiredFields.filter(field => !options[field])
  
  if (missing.length > 0) {
    console.warn(
      `[Column Resolver] Missing required fields: ${missing.join(", ")}`
    )
    return { isValid: false, missing }
  }
  
  // Validate array fields efficiently
  const arrayFields = ["groups", "channels", "programs", "recordStatuses", "recordTypes"]
  const invalidArrays = []
  
  for (const field of arrayFields) {
    if (options[field] !== undefined && !Array.isArray(options[field])) {
      invalidArrays.push(field)
    }
  }
  
  if (invalidArrays.length > 0) {
    console.warn(
      `[Column Resolver] Expected arrays for fields: ${invalidArrays.join(", ")}`
    )
    return { isValid: false, missing: [], invalidArrays }
  }
  
  return { isValid: true, missing: [], invalidArrays: [] }
}

/**
 * Gets the column type for a given component name
 * @param {string} componentName - Name of the component (e.g., "misProspectos")
 * @returns {string|null} Column type or null if not found
 */
export const getColumnTypeForComponent = (componentName) => {
  return COMPONENT_TO_COLUMN_TYPE_MAP[componentName] || null
}

/**
 * Gets the appropriate column function for a given column type
 * @param {string} columnType - Type of columns needed (e.g., "prospectos")
 * @returns {Function|null} Column function or null if not found
 */
export const getColumnFunction = (columnType) => {
  return COLUMN_FUNCTION_MAP[columnType] || null
}

/**
 * Resolves columns for a specific component with fallback mechanism
 * @param {string} componentName - Name of the component
 * @param {Object} options - Column configuration options
 * @param {string} options.role - User role
 * @param {Array} [options.groups=[]] - Available groups
 * @param {Array} [options.channels=[]] - Available channels
 * @param {Array} [options.programs=[]] - Available programs
 * @param {Array} [options.recordStatuses=[]] - Available record statuses
 * @param {Array} [options.recordTypes=[]] - Available record types
 * @param {string} [options.title=""] - Component title
 * @returns {Array} Array of column definitions
 */
export const getColumnsForComponent = (componentName, options = {}) => {
  // Validate input parameters
  if (!componentName || typeof componentName !== "string") {
    console.error("[Column Resolver] Invalid component name provided")
    return getRegistrosColumns(options) // Fallback to base columns
  }
  
  // Validate column configuration
  const validation = validateColumnConfiguration(options)
  if (!validation.isValid) {
    console.error(
      `[Column Resolver] Invalid column configuration for component: ${componentName}`
    )
    // Continue with fallback but log the error
  }
  
  // Get column type for the component
  const columnType = getColumnTypeForComponent(componentName)
  
  if (!columnType) {
    console.warn(
      `[Column Resolver] No column type mapping found for component: ${componentName}. Using fallback.`
    )
    return getRegistrosColumns(options)
  }
  
  // Get column function for the column type
  const columnFunction = getColumnFunction(columnType)
  
  if (!columnFunction) {
    console.warn(
      `[Column Resolver] No column function found for type: ${columnType}. Using fallback.`
    )
    return getRegistrosColumns(options)
  }
  
  try {
    // Call the specific column function
    const columns = columnFunction(options)
    
    if (!Array.isArray(columns)) {
      console.error(
        `[Column Resolver] Column function for ${columnType} did not return an array. Using fallback.`
      )
      return getRegistrosColumns(options)
    }
    
    return columns
    
  } catch (error) {
    console.error(
      `[Column Resolver] Error executing column function for ${columnType}:`,
      error
    )
    return getRegistrosColumns(options)
  }
}

/**
 * Registers a new column function for a specific column type
 * This allows dynamic registration of new column types
 * @param {string} columnType - Type of columns (e.g., "prospectos")
 * @param {Function} columnFunction - Function that generates columns
 */
export const registerColumnFunction = (columnType, columnFunction) => {
  if (!columnType || typeof columnType !== "string") {
    console.error("[Column Resolver] Invalid column type for registration")
    return false
  }
  
  if (!columnFunction || typeof columnFunction !== "function") {
    console.error("[Column Resolver] Invalid column function for registration")
    return false
  }
  
  COLUMN_FUNCTION_MAP[columnType] = columnFunction
  return true
}

/**
 * Registers a new component to column type mapping
 * @param {string} componentName - Name of the component
 * @param {string} columnType - Type of columns to use
 */
export const registerComponentMapping = (componentName, columnType) => {
  if (!componentName || typeof componentName !== "string") {
    console.error("[Column Resolver] Invalid component name for mapping registration")
    return false
  }
  
  if (!columnType || typeof columnType !== "string") {
    console.error("[Column Resolver] Invalid column type for mapping registration")
    return false
  }
  
  COMPONENT_TO_COLUMN_TYPE_MAP[componentName] = columnType
  return true
}

/**
 * Gets all registered column types
 * @returns {Array} Array of registered column types
 */
export const getRegisteredColumnTypes = () => {
  return Object.keys(COLUMN_FUNCTION_MAP).filter(type => COLUMN_FUNCTION_MAP[type] !== null)
}

/**
 * Gets all registered component mappings
 * @returns {Object} Object containing component to column type mappings
 */
export const getRegisteredComponentMappings = () => {
  return { ...COMPONENT_TO_COLUMN_TYPE_MAP }
}

/**
 * Checks if a column type is registered and has a valid function
 * @param {string} columnType - Column type to check
 * @returns {boolean} True if registered and valid
 */
export const isColumnTypeRegistered = (columnType) => {
  return COLUMN_FUNCTION_MAP.hasOwnProperty(columnType) && 
         typeof COLUMN_FUNCTION_MAP[columnType] === "function"
}

/**
 * Checks if a component has a registered column type mapping
 * @param {string} componentName - Component name to check
 * @returns {boolean} True if mapping exists
 */
export const isComponentMappingRegistered = (componentName) => {
  return COMPONENT_TO_COLUMN_TYPE_MAP.hasOwnProperty(componentName)
}