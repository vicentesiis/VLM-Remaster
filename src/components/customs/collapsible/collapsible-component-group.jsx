import React from "react"
import { CollapsibleComponent } from "@/components/customs/collapsible/collapsible-component"
import { H3Border } from "@/components/ui/typography"

export function CollapsibleComponentGroup({ title, children, footer }) {
  return (
    <div className="">
      <H3Border>{title}</H3Border>

      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null

        return (
          <CollapsibleComponent
            key={index}
            title={child.props.title || `Sin nombre ${index + 1}`}
            open={child.props.alwaysOpen}
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
