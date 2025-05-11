import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { TableCell } from "@/components/ui/table"
import { P } from "@/components/ui/typography"

export const MainCell = ({ path, title, public_id }) => {
  const fullPath = `${path}/${public_id}`
  return (
    <TableCell className="flex w-[220px] flex-col">
      <Link to={fullPath} className="font-bold hover:text-blue-600">
        <P className="truncate">{title}</P>
      </Link>
      <Link to={fullPath} className="hover:text-blue-600">
        <P>{public_id}</P>
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
