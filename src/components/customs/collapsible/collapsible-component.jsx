import { ChevronDown, X } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { PLead } from "@/components/ui/typography"
import { useCheckboxStore, useDateRangeStore } from "@/store/filterInputsStore"

export const CollapsibleComponent = ({ title, open, tagLabel, children }) => {
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
    <Collapsible open={open}>
      <CollapsibleTrigger className="group flex w-full items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <PLead className="flex items-center gap-1">{title}</PLead>

          {tagLabel && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClearTag()
              }}
              className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground transition hover:bg-muted/70"
            >
              {tagLabel}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

CollapsibleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  tagLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default CollapsibleComponent
