import PropTypes from "prop-types"
import React from "react"

const UsuarioCell = ({ name, username }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs text-muted-foreground">{username}</span>
    </div>
  )
}

UsuarioCell.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
}

export default UsuarioCell
