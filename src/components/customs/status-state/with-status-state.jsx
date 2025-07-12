import PropTypes from "prop-types"
import React from "react"
import { StatusState } from "./status-state"

export const WithStatusState = ({
  isLoading,
  isIdle,
  isError,
  isEmpty,
  children,
}) => {
  if (isLoading) return <StatusState type="loading" />
  if (isIdle) return <StatusState type="idle" />
  if (isError) return <StatusState type="error" />
  if (isEmpty) return <StatusState type="empty" />

  return children
}

WithStatusState.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isIdle: PropTypes.bool,
  isEmpty: PropTypes.bool,
  children: PropTypes.any,
}
