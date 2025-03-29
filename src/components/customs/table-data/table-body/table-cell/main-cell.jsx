import React from "react"
import { TableCell } from "@/components/ui/table"
import { Link } from "react-router-dom"
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

export default MainCell
