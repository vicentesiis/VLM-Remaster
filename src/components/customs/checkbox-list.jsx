import PropTypes from "prop-types"
import React from "react"
import { ScrollArea } from "../ui"
import { Checkbox } from "@/components/ui/checkbox"
import { PLeadOption } from "@/components/ui/typography"

export function CheckboxList({ options, selectedValues, onCheckedChange }) {
  const handleCheckboxChange = (name, checked) => {
    const newSelectedValues = checked
      ? [...selectedValues, name]
      : selectedValues.filter((value) => value !== name)

    onCheckedChange(newSelectedValues)
  }

  return (
    <ScrollArea className="h-[250px] rounded-md border">
      <div className="flex flex-col divide-y divide-border">
        {options.map(({ name, label }) => (
          <label
            key={name}
            htmlFor={`${name}-vertical`}
            className="flex cursor-pointer items-center space-x-2 px-4 py-3 transition-colors hover:bg-muted"
          >
            <Checkbox
              id={`${name}-vertical`}
              checked={selectedValues.includes(name)}
              onCheckedChange={(checked) => handleCheckboxChange(name, checked)}
            />
            <PLeadOption className="leading-none">{label}</PLeadOption>
          </label>
        ))}
      </div>
    </ScrollArea>
  )
}

CheckboxList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValues: PropTypes.array.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
}

export default CheckboxList
