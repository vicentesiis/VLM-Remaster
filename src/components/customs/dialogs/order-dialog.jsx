import { ListOrderedIcon, PlusCircleIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import OrderForm from "../forms/order-form"
import { Button, Card, CardContent, DialogHeaderCustom } from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

const OrderDialog = ({ trigger }) => {
  const formRef = useRef()
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    console.log("handleSubmit")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={"add"} size="sm">
            <ListOrderedIcon />
            Crear Órden
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-50 dark:bg-gray-950">
        <DialogHeaderCustom
          icon={PlusCircleIcon}
          title={"Crear Órden"}
          iconBgClass={"bg-green-600"}
        />

        <Card>
          <CardContent>
            <OrderForm ref={formRef} onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        <Button>Crear Orden</Button>
      </DialogContent>
    </Dialog>
  )
}

OrderDialog.propTypes = {
  mode: PropTypes.string,
  recordToEdit: PropTypes.any,
  trigger: PropTypes.any,
}

export default OrderDialog
