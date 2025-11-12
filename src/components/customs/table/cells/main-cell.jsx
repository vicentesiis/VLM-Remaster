import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { toTitleCase } from "@/utils"

export const MainCell = ({ path, title, public_id }) => {
  const fullPath = `/registros${path}/${public_id}`

  return (
    <div className="flex flex-col gap-0.5 text-left">
      <Link
        to={fullPath}
        className="truncate font-semibold text-primary hover:underline"
        title={`Ver Registro ${title}`}
      >
        <p className="truncate leading-7">{toTitleCase(title)}</p>
      </Link>

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span className="select-text truncate font-mono">{public_id}</span>
      </div>
    </div>
  )
}

MainCell.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  public_id: PropTypes.string,
}

export default MainCell
