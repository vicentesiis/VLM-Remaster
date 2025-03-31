import { PanelLeftClose, PanelRightClose } from "lucide-react"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { H3, PLead } from "@/components/ui/typography"

export function SplitPane({
  title,
  subTitle,
  LeftSideComponent,
  RightSideComponent,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  function RightSideComponentContainer() {
    return (
      <div>
        <div className="flex">
          <div className="flex sm:mb-4">
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
            <div className="gap-3 sm:flex sm:items-end">
              <H3>{title}</H3>
              <PLead>{subTitle}</PLead>
            </div>
          </div>
        </div>
        <RightSideComponent />
      </div>
    )
  }

  return (
    <div className="py-4 sm:flex sm:gap-3">
      <Collapsible
        open={!isCollapsed}
        onOpenChange={(open) => setIsCollapsed(!open)}
      >
        <CollapsibleContent className="sm:w-[250px]">
          <LeftSideComponent />
          <Separator className="my-4 sm:m-0 sm:h-0" />
        </CollapsibleContent>
      </Collapsible>
      <div className="grow">
        <RightSideComponentContainer />
      </div>
    </div>
  )
}

SplitPane.propTypes = {
  LeftSideComponent: PropTypes.elementType.isRequired,
  RightSideComponent: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
}

export default SplitPane
