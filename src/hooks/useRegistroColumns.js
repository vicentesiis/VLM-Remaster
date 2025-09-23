import { useMemo } from "react"
import { getColumnsForComponent } from "@/components/customs/table/columns/columnResolver"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { componentPropsMap } from "@/routes/route-props"

/**
 * Hook for getting columns for registros-type components
 * Updated to work with the new column resolver system while maintaining backward compatibility
 * 
 * @param {string} role - User role (ADMIN, SUPER_ADMIN, AGENT)
 * @param {string} title - Component title (used for component type resolution)
 * @param {boolean} isSuperAdmin - Whether user is super admin (deprecated, use role instead)
 * @param {Array} groups - Available groups for filter options
 * @param {Array} channels - Available channels for filter options  
 * @param {Array} programs - Available programs for filter options
 * @param {Object} options - Additional options
 * @param {string} [options.componentType] - Explicit component type override
 * @param {Array} [options.recordStatuses] - Available record statuses
 * @param {Array} [options.recordTypes] - Available record types
 * @returns {Array} Array of column definitions
 */
export function useRegistroColumns(
  role,
  title,
  isSuperAdmin,
  groups = [],
  channels = [],
  programs = [],
  options = {}
) {
  // Determine component type for column resolution
  const componentType = useMemo(() => {
    // If componentType is explicitly provided in options, use it
    if (options.componentType) {
      return options.componentType
    }
    
    // Try to find component type from route configuration based on title
    const routeEntry = Object.entries(componentPropsMap).find(
      ([, props]) => props.title === title
    )
    
    if (routeEntry) {
      const [routeKey, props] = routeEntry
      return props.columnType || routeKey
    }
    
    // Fallback: derive from title
    const titleToComponentMap = {
      "Registros": "registros",
      "Prospectos": "prospectos", 
      "Leads": "leads",
      "Clientes": "clientes",
      "Tareas": "tareas"
    }
    
    return titleToComponentMap[title] || "registros"
  }, [title, options.componentType])

  return useMemo(() => {
    // Prepare column options for the new system
    const columnOptions = {
      role,
      groups: groups || [],
      channels: channels || [],
      programs: programs || [],
      recordStatuses: options.recordStatuses || [],
      recordTypes: options.recordTypes || [],
      title,
    }

    try {
      // Use the new column resolver system
      const columns = getColumnsForComponent(componentType, columnOptions)
      
      if (!Array.isArray(columns) || columns.length === 0) {
        console.warn(`[useRegistroColumns] No columns returned for component type: ${componentType}. Using fallback.`)
        return getRegistrosColumns(columnOptions)
      }
      
      return columns
      
    } catch (error) {
      console.error(`[useRegistroColumns] Error resolving columns for component type: ${componentType}`, error)
      // Fallback to original registros columns
      return getRegistrosColumns(columnOptions)
    }
  }, [
    componentType,
    role,
    groups,
    channels,
    programs,
    options.recordStatuses,
    options.recordTypes,
    title
  ])
}
