import React, { useState } from "react"
import { H3 } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { ClientOrderDialog } from "@/components/customs/client-order-dialog"

export function ClientOrdersTab() {
  // State to control the visibility of the dialog
  const [open, setOpen] = useState(false)

  // Function to toggle the dialog visibility
  const handleOpen = () => setOpen(!open)

  return (
    <div>
      <div className="mb-8 flex justify-between">
        <H3>Órdenes</H3>
        <Button onClick={handleOpen}>Crear Órden</Button>
      </div>

      {/* Show ClientOrderDialog when open is true */}
      <ClientOrderDialog open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default ClientOrdersTab
