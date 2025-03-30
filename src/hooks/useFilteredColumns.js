import { useState, useEffect, useMemo } from "react"
import { columnsConfig } from "@/config/columnsConfig" // Import the column configuration
import useIsSmallScreen from "@/hooks/useIsSmallScreen" // Import the useIsSmallScreen hook

// Custom hook to get filtered columns based on tableType and screen size
const useFilteredColumns = (tableType, allColumns) => {
  // Get screen size status from useIsSmallScreen hook
  const isSmallScreen = useIsSmallScreen()

  // Memoize the tableConfig based on tableType to prevent unnecessary recalculations
  const tableConfig = useMemo(() => {
    return columnsConfig[tableType] || { columns: [], columnsMobile: [] }
  }, [tableType])

  // State for filtered columns
  const [filteredColumns, setFilteredColumns] = useState([])

  useEffect(() => {
    const hiddenColumns = tableConfig.columns || []
    const hiddenColumnsMobile = tableConfig.columnsMobile || []

    // Filter columns based on screen size
    const filtered = allColumns.filter((column) => {
      if (isSmallScreen) {
        return !hiddenColumnsMobile.includes(column) // Filter for small screen
      }
      return !hiddenColumns.includes(column) // Filter for regular screen
    })

    // Only update state if the filtered columns are different
    setFilteredColumns((prevFilteredColumns) => {
      const filteredColumnsChanged = !filtered.every(
        (col, index) => prevFilteredColumns[index] === col
      )
      if (filteredColumnsChanged) {
        return filtered
      }
      return prevFilteredColumns
    })
  }, [tableType, allColumns, isSmallScreen, tableConfig]) // Re-run when dependencies change

  return filteredColumns
}

export default useFilteredColumns
