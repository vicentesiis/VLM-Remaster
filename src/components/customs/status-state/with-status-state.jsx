import PropTypes from "prop-types"
import React from "react"
import { StatusState } from "./status-state"

export const WithStatusState = ({ isLoading, isError, hasFetched, children }) => {
  if (isError) {
    return <StatusState type="error" />
  }

  if (isLoading) {
    return <StatusState type="loading" />
  }

  if (!hasFetched) {
    return <StatusState type="waiting" />
  }

  return children
}

WithStatusState.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
