import { ChevronDown, X } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { PLead, ListStyle } from "@/components/ui/typography"
import { useCheckboxStore, useDateRangeStore } from "@/store/filterInputsStore"

export const CollapsibleComponent = ({
  title,
  tagLabel,
  children,
  isAlwaysOpen,
}) => {
  const { setSelectedValues } = useCheckboxStore()
  const { setDateRange } = useDateRangeStore()

  const handleClearTag = () => {
    if (title === "Estatus") {
      setSelectedValues([])
    }

    if (title === "Rango de Fechas") {
      setDateRange({ from: undefined, to: undefined })
    }
  }

  return (
    <Collapsible defaultOpen={isAlwaysOpen} disabled={isAlwaysOpen}>
      <CollapsibleTrigger className="group flex w-full items-center justify-between py-3">
        <div className="flex w-full justify-between pr-4">
          <PLead>{title}</PLead>

          {tagLabel && (
            <Badge
              onClick={(e) => {
                e.stopPropagation()
                handleClearTag()
              }}
              className="flex cursor-pointer items-center rounded-full"
            >
              <ListStyle className={"text-[12px]"}>{tagLabel}</ListStyle>
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>

        {!isAlwaysOpen && (
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

CollapsibleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  tagLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  isAlwaysOpen: PropTypes.bool.isRequired,
}

export default CollapsibleComponent
