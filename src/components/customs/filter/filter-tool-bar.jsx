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
        Generar Reporte
      </Button>
    </div>
  )
}

FilterToolbar.propTypes = {
  context: PropTypes.object,
  filterConfig: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.object,
  onSearch: PropTypes.func,
  values: PropTypes.object,
}

export default FilterToolbar
