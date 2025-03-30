import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { TableCell } from "@/components/ui/table"
import { P } from "@/components/ui/typography"

export const MainCell = ({ path, title, id }) => {
  return (
    <TableCell className="flex flex-col">
      <Link to={`${path}/${id}`} className="font-bold hover:text-blue-600">
        <P>{title}</P>
      </Link>
      <Link to={`${path}/${id}`} className="hover:text-blue-600">
        <P>{id}</P>
      </Link>
    </TableCell>
  )
}

MainCell.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default MainCell