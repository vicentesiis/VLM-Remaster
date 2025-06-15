import React from "react"
import { useController } from "react-hook-form"
import InputWithNumericFormat from "./input-with-numeric-format"

const InputCurrency = ({ control, name, ...props }) => {
  const {
    field: { onChange, value, ref },
  } = useController({ name, control })

  return (
    <InputWithNumericFormat
      {...props}
      ref={ref}
      value={value}
      prefix="$"
      onValueChange={(values) => {
        onChange(values.floatValue ?? "")
      }}
    />
  )
}

export default InputCurrency
