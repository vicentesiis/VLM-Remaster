import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { TableCell } from "@/components/ui/table"
import { P } from "@/components/ui/typography"

export const MainCell = ({ path, title, public_id }) => {
  const fullPath = `/registros${path}/${public_id}`
  return (
    <TableCell>
      <Link
        to={fullPath}
        className="select-text flex-col font-bold hover:text-blue-600"
        title={`Ver cliente ${title}`}
      >
        <P className="truncate">{title}</P>
        <P className="text-sm font-normal">{public_id}</P>
      </Link>
    </TableCell>
  )
}

MainCell.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  public_id: PropTypes.string.isRequired,
}

export default MainCell
