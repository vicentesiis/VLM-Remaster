import { useMemo } from "react"
import useIsSmallScreen from "@/hooks/useIsSmallScreen"
import { columnsToHide } from "@/utils/columnsSettings"

const useFilteredColumns = (tableType, allColumns) => {
  const isSmallScreen = useIsSmallScreen()

  return useMemo(() => {
    const config = columnsToHide[tableType] || {
      columns: [],
      columnsMobile: [],
    }
    const hidden = new Set(
      isSmallScreen ? config.columnsMobile : config.columns
    )
    return allColumns.filter((column) => !hidden.has(column))
  }, [tableType, allColumns, isSmallScreen])
}

export default useFilteredColumns
