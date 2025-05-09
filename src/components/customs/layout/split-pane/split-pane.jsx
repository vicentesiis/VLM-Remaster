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
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between sm:items-start">
          <div className="mb-2 flex items-center gap-0 sm:mb-4">
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
            <div className="sm:flex sm:items-end sm:gap-3">
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
        <CollapsibleContent>
          {LeftSideComponent}
          <Separator className="my-4 sm:m-0 sm:h-0" />
        </CollapsibleContent>
      </Collapsible>
      <RightSideComponentContainer />
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
