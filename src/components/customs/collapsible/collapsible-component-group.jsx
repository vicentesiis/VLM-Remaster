import React from "react"
import { CollapsibleComponent } from "@/components/customs/collapsible/collapsible-component"
import { Button } from "@/components/ui/button"
import { H3Border } from "@/components/ui/typography"
import { useFilterSummary } from "@/hooks/useFilterSummary"
import { getTagLabel } from "@/utils/filters/getTagLabel"

export function CollapsibleComponentGroup({ title, children, onApply }) {
  const { hasFilters, resetFilters } = useFilterSummary()

  return (
    <div className="sm:w-[250px]">
      <H3Border>{title}</H3Border>

      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null

        const tagLabel = getTagLabel(child)
        const isAlwaysOpen = child.props.title === "Buscar"

        return (
          <CollapsibleComponent
            key={index}
            title={child.props.title}
            tagLabel={tagLabel}
            isAlwaysOpen={isAlwaysOpen}
          >
            {child}
          </CollapsibleComponent>
        )
      })}

      <div className="mt-2 flex grow justify-between sm:mt-4">
        {hasFilters && (
          <Button variant="secondary" size="sm" onClick={resetFilters}>
            Limpiar
          </Button>
        )}
        <Button className="ml-auto" onClick={onApply}>
          Buscar
        </Button>
      </div>
    </div>
  )
}

export default CollapsibleComponentGroup
