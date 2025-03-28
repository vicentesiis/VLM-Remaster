import React from "react"

export function Filter({ children }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Filters Section */}
      <h1 className="text-2xl font-bold tracking-tight">Filtros</h1>

      {/* Render Children with Spacing */}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

export default Filter
