import { Check, X } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"

export const ActiveStatusBadge = ({ isActive }) => (
  <div
    className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${
      isActive
        ? "border-green-500 bg-green-100 text-green-700"
        : "border-red-500 bg-red-100 text-red-700"
    }`}
  >
    {isActive ? (
      <Check className="h-4 w-4" strokeWidth={2.5} />
    ) : (
      <X className="h-4 w-4" strokeWidth={2.5} />
    )}
  </div>
)

ActiveStatusBadge.propTypes = {
  isActive: PropTypes.bool,
}

export default ActiveStatusBadge
