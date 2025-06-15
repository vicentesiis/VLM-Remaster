import PropTypes from "prop-types"
import React from "react"
import { NumericFormat } from "react-number-format"
import { Input } from "@/components/ui/input"

const InputWithNumericFormat = React.forwardRef(
  ({ onValueChange, ...rest }, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        customInput={Input}
        thousandSeparator=","
        allowNegative={false}
        allowLeadingZeros={false}
        isNumericString
        onValueChange={onValueChange}
        {...rest}
      />
    )
  }
)

InputWithNumericFormat.displayName = "InputWithNumericFormat"

InputWithNumericFormat.propTypes = {
  onValueChange: PropTypes.func,
}

export default InputWithNumericFormat
