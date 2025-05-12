import { useMemo } from "react"
import useIsSmallScreen from "@/hooks/useIsSmallScreen"
import { columnsToHide, columnsOrder } from "@/utils/columnsSettings"

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

    let visibleColumns = allColumns.filter((column) => !hidden.has(column))

    // Order them according to columnsOrder
    const order = columnsOrder[tableType]
    if (order) {
      visibleColumns = [
        ...order.filter((col) => visibleColumns.includes(col)),
        ...visibleColumns.filter((col) => !order.includes(col)), // add leftovers at the end
      ]
    }

    return visibleColumns
  }, [tableType, allColumns, isSmallScreen])
}

export default useFilteredColumns
