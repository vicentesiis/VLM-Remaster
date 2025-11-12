import PropTypes from "prop-types"
import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui"

export const TooltipWrapper = ({ children, content, side = "top", delay = 100 }) => (
  <TooltipProvider delayDuration={delay}>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

TooltipWrapper.propTypes = {
  children: PropTypes.node,
  content: PropTypes.string,
  side: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  delay: PropTypes.number,
}

export default TooltipWrapper
