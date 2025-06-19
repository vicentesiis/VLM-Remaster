import { SearchIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import LabeledSelect from "./labeled-select"
import { Button } from "@/components/ui/button"

const FilterToolbar = ({
  filterConfig = [],
  values,
  onChange,
  onSearch,
  context = {},
}) => {
  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
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
      <Button onClick={onSearch}>
        <SearchIcon />
        Buscar
      </Button>
    </div>
  )
}

FilterToolbar.propTypes = {
  context: PropTypes.any,
  filterConfig: PropTypes.any,
  onChange: PropTypes.any,
  onSearch: PropTypes.any,
  values: PropTypes.any,
}

export default FilterToolbar
