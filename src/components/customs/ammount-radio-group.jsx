import React from "react"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { P } from "@/components/ui/typography"

// Define the options
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

// Updated AmmountRadioGroup to accept className prop in JSX
const AmmountRadioGroup = ({ className }) => {
  return (
    <RadioGroup.Root
      defaultValue={options[0].value}
      className={`grid h-8 grid-cols-5 ${className}`}
    >
      {" "}
      {/* Apply className */}
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className="rounded px-3 py-1 ring-[1px] ring-border data-[state=checked]:bg-black data-[state=checked]:font-bold data-[state=checked]:text-white"
        >
          <P >{option.label}</P>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

export default AmmountRadioGroup
