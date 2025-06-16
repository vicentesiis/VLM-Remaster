import { FileText } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import OrderForm from "../forms/order-form"
import { Button, Card, CardContent, DialogHeaderCustom } from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateOrder } from "@/hooks/queries/useOrder"

const OrderDialog = ({ trigger, recordId }) => {
  const formRef = useRef()
  const [open, setOpen] = useState(false)

  const { mutateAsync: createOrder } = useCreateOrder({
    onError: () => toast.error("Error al crear la órden"),
  })

  const handleSubmit = async (data) => {
    data.record_id = recordId
    try {
      await createOrder(data)
      toast.success("Órden creada con éxito")
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={"add"} size="sm">
            <FileText />
            Crear Órden
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-50 dark:bg-gray-950">
        <DialogHeaderCustom
          icon={FileText}
          title={"Crear Órden"}
          iconBgClass={"bg-green-600"}
        />

        <Card>
          <CardContent>
            <OrderForm ref={formRef} onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        <Button onClick={() => formRef.current?.submit()}>Crear Órden</Button>
      </DialogContent>
    </Dialog>
  )
}

OrderDialog.propTypes = {
  recordId: PropTypes.any,
  trigger: PropTypes.any,
}

export default OrderDialog
