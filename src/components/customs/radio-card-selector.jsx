import * as RadioGroup from "@radix-ui/react-radio-group"
import { CircleCheck } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"

const RadioCardSelector = ({ value, onChange, options }) => {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onChange}
      className="flex w-full gap-3"
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className="relative flex-1 rounded-lg px-4 py-3 text-start text-muted-foreground ring-[1px] ring-border focus:outline-none data-[state=checked]:text-primary data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
        >
          {option.icon && <option.icon className="mb-3" />}
          <span className="font-medium tracking-tight">{option.label}</span>
          <RadioGroup.Indicator className="absolute right-2 top-2">
            <CircleCheck className="fill-primary text-primary-foreground" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

RadioCardSelector.propTypes = {
  onChange: PropTypes.any,
  options: PropTypes.any,
  value: PropTypes.any,
}

export default RadioCardSelector
