import React, { useState, useEffect } from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export const GenericSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
  className,
  required = false, // Optional 'required' prop to mark the field as obligatory
  error = false, // Optional 'error' prop to show validation error
}) => {
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (required && !value) {
      setIsValid(false) // Set invalid if required and no value selected
    } else {
      setIsValid(true)
    }
  }, [value, required])

  return (
    <div className="relative">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={`${className} ${error ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Show error message if invalid */}
      {error && (
        <div className="absolute top-full mt-1 text-sm text-red-500">
          Este campo es obligatorio
        </div>
      )}
    </div>
  )
}

export default GenericSelect
