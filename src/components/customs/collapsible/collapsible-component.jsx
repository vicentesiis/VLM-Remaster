import { ChevronDown } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { PLead } from "@/components/ui/typography"

export const CollapsibleComponent = ({ title, open, children }) => (
  <Collapsible open={open}>
    <CollapsibleTrigger className="group flex w-full items-center justify-between py-3">
      <PLead className="flex items-center gap-1">{title}</PLead>
      {open ?? (
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      )}
    </CollapsibleTrigger>
    <CollapsibleContent className="flex flex-col">
      {children}
    </CollapsibleContent>
  </Collapsible>
)

CollapsibleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default CollapsibleComponent
