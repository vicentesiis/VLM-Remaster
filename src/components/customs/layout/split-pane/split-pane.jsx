import {
  PanelLeftClose,
  PanelRightClose,
  PanelBottomClose,
  PanelTopClose,
} from "lucide-react"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { HeaderSplitPaneActions } from "@/components/customs/layout/split-pane/header-split-pane-actions"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { H3, PLead } from "@/components/ui/typography"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen"

export function SplitPane({
  title,
  subTitle,
  LeftSideComponent,
  RightSideComponent,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isSmallScreen = useIsSmallScreen()

  function RightSideComponentContainer() {
    return (
      <div>
        <div className="flex justify-between items-center sm:items-start">
          <div className="flex gap-0 items-center mb-2 sm:mb-4">
            <Button
              variant="ghost"
              size="smCustom"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                isSmallScreen ? (
                  <PanelBottomClose style={{ width: "24px", height: "24px" }} />
                ) : (
                  <PanelRightClose style={{ width: "24px", height: "24px" }} />
                )
              ) : isSmallScreen ? (
                <PanelTopClose style={{ width: "24px", height: "24px" }} />
              ) : (
                <PanelLeftClose style={{ width: "24px", height: "24px" }} />
              )}
            </Button>
            <div className="sm:gap-3 sm:flex sm:items-end">
              <H3>{title}</H3>
              <PLead>{subTitle}</PLead>
            </div>
          </div>
          <HeaderSplitPaneActions />
        </div>
        {RightSideComponent}
      </div>
    )
  }

  return (
    <div className="pt-4 sm:flex sm:gap-3">
      <Collapsible
        open={!isCollapsed}
        onOpenChange={(open) => setIsCollapsed(!open)}
      >
        <CollapsibleContent className="sm:w-[250px]">
          {LeftSideComponent}
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
