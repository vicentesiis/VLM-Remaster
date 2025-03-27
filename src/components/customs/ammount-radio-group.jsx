import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

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
];

// Updated AmmountRadioGroup to accept className prop in JSX
const AmmountRadioGroup = ({ className }) => {
  return (
    <RadioGroup.Root
      defaultValue={options[0].value}
      className={`grid grid-cols-5 h-8 ${className}`}> {/* Apply className */}
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-black">
          <span className="font-semibold tracking-tight">{option.label}</span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};

export default AmmountRadioGroup;