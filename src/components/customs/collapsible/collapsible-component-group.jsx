import React from "react"
import { CollapsibleComponent } from "@/components/customs/collapsible/collapsible-component"
import { Button } from "@/components/ui/button"
import { H3Border } from "@/components/ui/typography"
import { useFilterSummary } from "@/hooks/useFilterSummary"
import { getTagLabel } from "@/utils/filters/getTagLabel"

export function CollapsibleComponentGroup({ title, children, footer }) {
  const { hasFilters, resetFilters } = useFilterSummary()

  return (
    <div >
      <div className="flex items-center justify-between">
        <H3Border>{title}</H3Border>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Limpiar filtros
          </Button>
        )}
      </div>

      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null

        const tagLabel = getTagLabel(child)

        return (
          <CollapsibleComponent
            key={index}
            title={child.props.title || `Sin nombre ${index + 1}`}
            open={child.props.alwaysOpen}
            tagLabel={tagLabel}
          >
            {child}
          </CollapsibleComponent>
        )
      })}

      {footer && <div className="flex justify-end sm:mt-4">{footer}</div>}
    </div>
  )
}

export default CollapsibleComponentGroup
