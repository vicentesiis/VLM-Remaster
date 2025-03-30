import PropTypes from "prop-types"
import { ChevronDown } from "lucide-react"
import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { PLead } from "@/components/ui/typography"

export const CollapsibleFilter = ({
  title,
  open,
  icon: Icon,
  showChevrown,
  children,
}) => (
  <div>
    <Collapsible open={open}>
      <CollapsibleTrigger className="group flex w-full items-center justify-between py-3">
        <PLead className="flex items-center gap-1">
          {!!Icon && <Icon className="h-5 w-5" />} {title}
        </PLead>
        {showChevrown ?? (
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col">
        {children}
      </CollapsibleContent>
    </Collapsible>
  </div>
)

CollapsibleFilter.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  icon: PropTypes.elementType,
  showChevrown: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default CollapsibleFilter
