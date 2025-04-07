import PropTypes from "prop-types"
import React from "react"
import { ScrollArea } from "../ui"
import { Checkbox } from "@/components/ui/checkbox"
import { PLeadOption } from "@/components/ui/typography"

export function CheckboxList({ options }) {
  return (
    <ScrollArea className="h-[250px] rounded-md border">
      <div className="flex flex-col divide-y divide-border">
        {options.map(({ name, label }) => (
          <label
            key={name}
            htmlFor={`${name}-vertical`}
            className="flex cursor-pointer items-center space-x-2 px-4 py-3 transition-colors hover:bg-muted"
          >
            <Checkbox id={`${name}-vertical`} />
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
