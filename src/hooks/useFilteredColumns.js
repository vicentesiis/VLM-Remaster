import { useMemo } from "react"
import {
  getColumnsToShow,
  getColumnOrder,
  getColumnsToAdd,
} from "@/config/tableConfig"
import useIsSmallScreen from "@/hooks/useIsSmallScreen"

const useFilteredColumns = (tableType) => {
  const isSmallScreen = useIsSmallScreen()

  return useMemo(() => {
    const baseColumns = getColumnsToShow(tableType, isSmallScreen)
    const additional = getColumnsToAdd(tableType)

    const combinedColumns = [...new Set([...baseColumns, ...additional])]

    const order = getColumnOrder(tableType)
    if (order.length > 0) {
      return [
        ...order.filter((col) => combinedColumns.includes(col)),
        ...combinedColumns.filter((col) => !order.includes(col)),
      ]
    }

    return combinedColumns
  }, [tableType, isSmallScreen])
}

export default useFilteredColumns
