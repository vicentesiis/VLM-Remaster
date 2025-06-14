import PropTypes from "prop-types"
import React from "react"
import { Input } from "@/components/ui/input"

const InputWithNumericOnly = React.forwardRef(({ onKeyDown, ...rest }, ref) => {
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

    if (onKeyDown) onKeyDown(e)
  }

  return <Input {...rest} onKeyDown={handleKeyDown} ref={ref} />
})

InputWithNumericOnly.displayName = "InputWithNumericOnly"

InputWithNumericOnly.propTypes = {
  onKeyDown: PropTypes.func,
}

export default InputWithNumericOnly
