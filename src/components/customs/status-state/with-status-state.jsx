import PropTypes from "prop-types"
import React from "react"
import { StatusState } from "./status-state"

export const WithStatusState = ({ isLoading, isError, children }) => {
  if (isLoading || isError) {
    return <StatusState type={isError ? "error" : "loading"} />
  }

  return children
}

WithStatusState.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
