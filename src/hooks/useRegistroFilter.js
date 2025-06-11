import { useEffect, useState, useMemo } from "react"
import { getParsedParams } from "@/utils/recordUtils"

export function useRegistroFilters(title, currentRole, isSuperAdmin) {
  const [columnFilters, setColumnFilters] = useState([])
  const [appliedFilters, setAppliedFilters] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const parsedParams = useMemo(() => {
    const baseParams = getParsedParams(
      pagination,
      appliedFilters,
      title,
      currentRole
    )
    const isMissingGroupId =
      isSuperAdmin && !appliedFilters.find((f) => f.id === "group_id")?.value
    return isMissingGroupId ? null : baseParams
  }, [pagination, appliedFilters, title, currentRole, isSuperAdmin])

  useEffect(() => {
    const cleared = columnFilters.length === 0 && appliedFilters.length > 0
    if (cleared) {
      setAppliedFilters([])
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    }
  }, [columnFilters])

  useEffect(() => {
    setColumnFilters([])
    setAppliedFilters([])
    setPagination({ pageIndex: 0, pageSize: 10 })
  }, [title])

  return {
    columnFilters,
    setColumnFilters,
    appliedFilters,
    setAppliedFilters,
    pagination,
    setPagination,
    parsedParams,
  }
}
