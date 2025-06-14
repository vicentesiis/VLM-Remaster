import PropTypes from "prop-types"
import React from "react"
import { Input } from "@/components/ui/input"

const InputWithNumericOnly = ({ onKeyDown, ...rest }) => {
  const handleKeyDown = (e) => {
    const isNumber = /^[0-9]$/.test(e.key)
    const allowed = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Home",
      "End",
    ]
    if (!isNumber && !allowed.includes(e.key)) {
      e.preventDefault()
    }

    // Call original onKeyDown if provided
    if (onKeyDown) onKeyDown(e)
  }

  return <Input {...rest} onKeyDown={handleKeyDown} />
}

InputWithNumericOnly.propTypes = {
  numericOnly: PropTypes.any,
  onKeyDown: PropTypes.func,
}

export default InputWithNumericOnly
