import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputIcon({ className, placeholder, icon: Icon, ...props }) {
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
      />
    </div>
  )
}

export default InputIcon
