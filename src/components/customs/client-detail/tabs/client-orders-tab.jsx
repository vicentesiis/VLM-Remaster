import React, { useState } from "react"
import { H3 } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { ClientOrderDialog } from "@/components/customs/client-detail/client-order-dialog"

export const ClientOrdersTab = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <div>
      <div className="mb-8 flex justify-between">
        <H3>Órdenes</H3>
        <Button onClick={handleOpen}>Crear Órden</Button>
      </div>
      <ClientOrderDialog open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default ClientOrdersTab
