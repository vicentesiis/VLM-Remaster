import { Checkbox } from "@/components/ui/checkbox"
import { LabelStyle } from "@/components/ui/typography"

export function CheckboxList({ options }) {
  return (
    <div className="mt-2 flex flex-col items-start gap-4">
      {options.map(({ name, label }) => (
        <div key={name} className="flex items-center gap-3">
          <Checkbox id={`${name}-vertical`} />
          <LabelStyle
            htmlFor={`${name}-vertical`} // Ensures the label is clickable
            className="flex items-center gap-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </LabelStyle>
        </div>
      ))}
    </div>
  )
}

export default CheckboxList
