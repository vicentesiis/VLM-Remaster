import * as RadioGroup from "@radix-ui/react-radio-group"
import { CircleCheck } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { useHoverEffects } from "@/hooks/use-hover-effects"
import { cn } from "@/lib/utils"

const RadioCardSelector = ({ value, onChange, options, hoverVariant = "medium" }) => {
  const hoverEffects = useHoverEffects(hoverVariant, true, true)
  
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onChange}
      className="flex w-full gap-3"
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className={cn(
            "relative flex-1 rounded-lg px-2 py-2 text-start text-muted-foreground ring-[1px] ring-border focus:outline-none data-[state=checked]:text-primary data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
            hoverEffects.container
          )}
        >
          {option.icon && (
            <option.icon className={cn(`mb-3 ${option.size || "h-7 w-7"}`, hoverEffects.icon)} />
          )}
          <span className="font-medium tracking-tight">{option.label}</span>
          <RadioGroup.Indicator className="absolute right-2 top-2">
            <CircleCheck className="fill-primary text-primary-foreground" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

RadioCardSelector.propTypes = {
  onChange: PropTypes.any,
  options: PropTypes.any,
  value: PropTypes.any,
  hoverVariant: PropTypes.oneOf(["none", "subtle", "medium", "strong", "glow"]),
}

export default RadioCardSelector
