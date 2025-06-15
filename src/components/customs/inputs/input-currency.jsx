import PropTypes from "prop-types"
import React from "react"
import { useController } from "react-hook-form"
import { NumericFormat } from "react-number-format"
import { Input } from "@/components/ui/input"

const InputCurrency = React.forwardRef(
  ({ control, name, maxLength, ...props }, ref) => {
    const {
      field: { onChange, value },
    } = useController({ name, control })

    return (
      <NumericFormat
        getInputRef={ref}
        customInput={Input}
        thousandSeparator=","
        allowNegative={false}
        allowLeadingZeros={false}
        prefix="$"
        maxLength={maxLength}
        value={value}
        onValueChange={(values) => {
          let cleanValue = values.value.replace(/^0+(?=\d)/, "")
          const floatVal = cleanValue ? parseFloat(cleanValue) : ""
          onChange(floatVal)
        }}
        {...props}
      />
    )
  }
)

InputCurrency.displayName = "InputCurrency"

InputCurrency.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
}

export default InputCurrency
