import { SearchIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { toast } from "sonner"
import LabeledSelect from "./labeled-select"
import { Button } from "@/components/ui/button"

const FilterToolbar = ({
  filterConfig = [],
  values,
  onChange,
  onSearch,
  context = {},
  isLoading = false,
}) => {
  const handleValidatedSearch = () => {
    const isMissing = (value) =>
      value === undefined || value === null || value === ""

    const missing = filterConfig
      .filter((config) => config?.required && isMissing(values[config.key]))
      .map((config) => config.label)

    if (missing.length > 0) {
      toast.error(
        `Por favor selecciona ${missing.join(" y ")} antes de buscar.`
      )
      return
    }

    onSearch()
  }

  return (
    <div className="flex items-end gap-2 sm:flex-col lg:flex-row">
      {filterConfig.map((config) => {
        if (!config) return null
        const options = config.getOptions
          ? config.getOptions(context)
          : config.options

        return (
          <LabeledSelect
            key={config.key}
            labelName={config.label}
            placeholder={config.placeholder}
            options={options}
            value={values[config.key]}
            onValueChange={onChange[config.key]}
          />
        )
      })}
      <Button isLoading={isLoading} onClick={handleValidatedSearch}>
        <SearchIcon />
        Buscar
      </Button>
    </div>
  )
}

FilterToolbar.propTypes = {
  context: PropTypes.object,
  filterConfig: PropTypes.array,
  isLoading: PropTypes.bool,
  onChange: PropTypes.any,
  onSearch: PropTypes.any,
  values: PropTypes.any,
}

export default FilterToolbar
