import PropTypes from "prop-types"
import React from "react"
import { ScrollArea } from "../ui"
import { Checkbox } from "@/components/ui/checkbox" // Import the custom Checkbox component
import { PLeadOption } from "@/components/ui/typography"
import { useCheckboxStore } from "@/store/useCheckboxStore" // Import Zustand store

export function CheckboxList({ options }) {
  const { selectedValues, setSelectedValues } = useCheckboxStore() // Use Zustand store

  const handleCheckboxChange = (name, checked) => {
    const newSelectedValues = checked
      ? [...selectedValues, name] // Add to selectedValues when checked
      : selectedValues.filter((value) => value !== name) // Remove from selectedValues when unchecked

    setSelectedValues(newSelectedValues) // Update Zustand store
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
              checked={selectedValues.includes(name)} // Bind `checked` to Zustand state
              onCheckedChange={(checked) => handleCheckboxChange(name, checked)} // Handle checkbox change
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
}

export default CheckboxList
