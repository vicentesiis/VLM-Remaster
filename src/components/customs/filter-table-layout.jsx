import { PanelLeftClose, PanelRightClose } from "lucide-react"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { H3, PLead } from "@/components/ui/typography"

export function FilterTableLayout({
  FilterComponent,
  TableComponent,
  tableTitle,
  helperTitle,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  function MainComponentContainer() {
    return (
      <div>
        <div className="flex">
          {FilterComponent ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelRightClose style={{ width: "24px", height: "24px" }} />
              ) : (
                <PanelLeftClose style={{ width: "24px", height: "24px" }} />
              )}
            </Button>
          ) : (
            <p>No filter component provided</p> // This is the fallback when FilterComponent is null
          )}
          <div className="gap-3 sm:flex sm:items-end">
            <H3>{tableTitle}</H3>
            <PLead>{helperTitle}</PLead>
          </div>
        </div>
        <TableComponent />
      </div>
    )
  }

  return (
    <div className="py-4 sm:flex sm:py-8 md:px-6">
      <Collapsible
        open={!isCollapsed}
        onOpenChange={(open) => setIsCollapsed(!open)}
      >
        <CollapsibleContent>
          <FilterComponent />
        </CollapsibleContent>
      </Collapsible>
      <div className="grow">
        <MainComponentContainer />
      </div>
    </div>
  )
}

FilterTableLayout.propTypes = {
  FilterComponent: PropTypes.elementType.isRequired,
  TableComponent: PropTypes.elementType.isRequired,
  tableTitle: PropTypes.string.isRequired,
  helperTitle: PropTypes.string.isRequired,
}

export default FilterTableLayout
