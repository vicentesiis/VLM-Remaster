import React, { useState } from "react"
import { H3, PLead } from "@/components/ui/typography"
import { Separator } from "../ui/separator"
import { Button } from "@/components/ui/button" // Assuming this is your Button component
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible" // Adjust import as per your file structure
import { PanelLeftClose, PanelRightClose } from "lucide-react"

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
          <div className="flex items-end gap-3">
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
        {/* Filters Section */}
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-[${isCollapsed ? "0px" : "240px"}_1fr]`}
        >
          {/* Filter Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Collapsible for Filters */}
            <Collapsible
              open={!isCollapsed}
              onOpenChange={(open) => setIsCollapsed(!open)}
            >
              <CollapsibleContent>
                <FilterComponent />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Main Table Section */}
          <TableContainer />
        </div>
      </div>
    </div>
  )
}

export default FilterTableLayout
