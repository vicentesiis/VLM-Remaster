import { useMemo } from "react"
import {
  getColumnsToHide,
  getColumnOrder,
  getColumnsToAdd,
} from "@/config/tableConfig"
import useIsSmallScreen from "@/hooks/useIsSmallScreen"

const useFilteredColumns = (tableType, apiColumns) => {
  const isSmallScreen = useIsSmallScreen()

  return useMemo(() => {
    const hidden = getColumnsToHide(tableType, isSmallScreen)
    const additional = getColumnsToAdd(tableType)

    const combinedColumns = [...new Set([...apiColumns, ...additional])]
    let visible = combinedColumns.filter((col) => !hidden.has(col))

    const order = getColumnOrder(tableType)
    if (order.length > 0) {
      visible = [
        ...order.filter((col) => visible.includes(col)),
        ...visible.filter((col) => !order.includes(col)),
      ]
    }

    return visible
  }, [tableType, apiColumns, isSmallScreen])
}

export default useFilteredColumns
