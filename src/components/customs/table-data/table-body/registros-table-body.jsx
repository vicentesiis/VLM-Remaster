import PropTypes from "prop-types"
import React from "react"
import { registrosRender } from "@/components/customs/table-data/renders/registros-renders"
import GenericTableBody from "@/components/customs/table-data/table-body/generic-table-body"

function RegistrosTableBody({ data, filteredColumns }) {
  return (
    <GenericTableBody
      data={data}
      columns={filteredColumns}
      renderers={registrosRender}
      getRowKey={(item) => item.id}
    />
  )
}

RegistrosTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  filteredColumns: PropTypes.array.isRequired,
}

export default RegistrosTableBody
