import PropTypes from 'prop-types';
import React from "react"
import { Input } from "@/components/ui/input"

export function InputIcon({ placeholder, icon: Icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
        {Icon && <Icon className="mr-2.5 h-4 w-4" />}
      </div>
      <Input
        id="search"
        type="search"
        placeholder={placeholder}
        className="w-full rounded-lg bg-background pl-8"
        {...props}
      />
    </div>
  )
}

InputIcon.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
}

export default InputIcon