import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { P } from "@/components/ui/typography"

export const MainCell = ({ path, title, public_id }) => {
  const fullPath = `/registros${path}/${public_id}`

  return (
    <div className="flex flex-col gap-0.5 text-left">
      <Link
        to={fullPath}
        className="truncate font-semibold text-primary hover:underline"
        title={`Ver Registro ${title}`}
      >
        <P className="truncate">{title}</P>
      </Link>

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span className="select-text truncate font-mono">{public_id}</span>
      </div>
    </div>
  )
}

MainCell.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  public_id: PropTypes.string.isRequired,
}

export default MainCell
