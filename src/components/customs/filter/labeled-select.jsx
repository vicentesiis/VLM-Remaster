import PropTypes from "prop-types"
import React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LabeledSelect = ({
  placeholder,
  labelName,
  options = [],
  onValueChange,
  value,
  className,
}) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{labelName}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

LabeledSelect.propTypes = {
  className: PropTypes.string,
  labelName: PropTypes.any,
  onValueChange: PropTypes.any,
  options: PropTypes.array,
  placeholder: PropTypes.any,
  value: PropTypes.any,
}

export default LabeledSelect
