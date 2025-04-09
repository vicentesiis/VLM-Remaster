import React from "react"
import { Button } from "@/components/ui/button"
import { useFilterSummary } from "@/hooks/useFilterSummary"

export const HeaderSplitPaneActions = () => {
  // TODO: - make it more reusable!
  const { hasFilters, resetFilters } = useFilterSummary()

  return (
    <div>
      {hasFilters && (
        <Button size="sm" onClick={resetFilters}>
          Limpiar Búsqueda
        </Button>
      )}
    </div>
  )
}

export default HeaderSplitPaneActions
