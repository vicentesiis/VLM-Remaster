import React, { useState } from "react"
import { H3, PLead } from "@/components/ui/typography"
import { PanelLeftClose, PanelRightClose } from "lucide-react"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible" // Adjust import as per your file structure

export function FilterTableLayout({
  FilterComponent,
  TableComponent,
  tableTitle,
  helperTitle,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  function TableContainer() {
    return (
      <div>
        <div className="mb-4 flex items-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? (
              <PanelRightClose style={{ width: "24px", height: "24px" }} />
            ) : (
              <PanelLeftClose style={{ width: "24px", height: "24px" }} />
            )}
          </Button>
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
    <div className="container mx-auto py-4 sm:py-8 md:px-6">
      <div className="flex flex-col gap-8 md:gap-12">
        <div
          className={
            !isCollapsed
              ? `md:grid-cols-[240px"_1fr] sm:flex gap-3`
              : `sm:grid md:grid-cols-[0px_1fr]`
          }
        >
          {/* Filter Sidebar */}
          <div className="flex flex-col gap-6">
            <Collapsible
              open={!isCollapsed}
              onOpenChange={(open) => setIsCollapsed(!open)}
            >
              <CollapsibleContent>
                <FilterComponent />
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="grow">
            <TableContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterTableLayout
