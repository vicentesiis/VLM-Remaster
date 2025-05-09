import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { TableCell } from "@/components/ui/table"
import { P } from "@/components/ui/typography"

export const MainCell = ({ path, title, public_id }) => {
  return (
    <TableCell className="w-[220px] flex flex-col">
      <Link to={`${path}/${public_id}`} className="font-bold hover:text-blue-600">
        <P className="truncate">{title}</P>
      </Link>
      <Link to={`${path}/${public_id}`} className="hover:text-blue-600">
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

{/* <TableCell className="flex flex-col min-w-64">
<Link to={`${path}/${id}`} className="font-bold hover:text-blue-600">
  <P>{title}</P>
</Link>
<Link to={`${path}/${id}`} className="hover:text-blue-600">
  <P>{id}</P>
</Link>
</TableCell> */}