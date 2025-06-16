import * as RadioGroup from "@radix-ui/react-radio-group"
import PropTypes from "prop-types"
import React from "react"
import { P } from "@/components/ui/typography"

const options = [
  {
    value: "750",
    label: "$750.00",
  },
  {
    value: "1880",
    label: "$1,880.00",
  },
  {
    value: "2580",
    label: "$2,580.00",
  },
  {
    value: "3450",
    label: "$3,450.00",
  },
  {
    value: "5890",
    label: "$5,890.00",
  },
]

const AmountRadioGroup = ({ className }) => {
  return (
    <RadioGroup.Root
      defaultValue={options[0].value}
      className={`flex h-8 flex-col sm:grid sm:grid-cols-5 ${className}`}
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className="rounded px-3 py-1 ring-[1px] ring-border data-[state=checked]:bg-primary data-[state=checked]:font-bold data-[state=checked]:text-white"
        >
          <P>{option.label}</P>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

AmountRadioGroup.propTypes = {
  className: PropTypes.string,
}

export default AmountRadioGroup
