import { FileText } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import OrderForm from "../forms/order-form"
import {
  Button,
  Card,
  CardContent,
  DialogFooterCustom,
  DialogHeaderCustom,
} from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateOrder } from "@/hooks/queries/useOrder"
import { useGetRecordById } from "@/hooks/queries/useRecord"

const OrderDialog = ({ trigger, recordId }) => {
  const formRef = useRef()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: recordData } = useGetRecordById(recordId, {
    enabled: !!recordId,
  })

  const { mutateAsync: createOrder } = useCreateOrder({
    onError: () => toast.error("Error al crear la órden"),
  })

  const handleSubmit = async (formData) => {
    const data = {
      ...formData,
      record_id: recordId,
      order_amount_local: Number(formData.order_amount_local) * 100,
    }
    setIsSubmitting(true)
    try {
      await createOrder(data)
      toast.success("Órden creada con éxito")
      setOpen(false)
    } catch (error) {
      console.log("error", error)
    } finally {
      setIsSubmitting(false)
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
      <DialogContent className="bg-gray-100 dark:bg-gray-950">
        <DialogHeaderCustom
          icon={FileText}
          title={"Crear Órden"}
          iconBgClass={"bg-green-600"}
        />

        <Card>
          <CardContent>
            <OrderForm ref={formRef} onSubmit={handleSubmit} recordData={recordData} />
          </CardContent>
        </Card>

        <DialogFooterCustom
          actionLabel="Crear Órden"
          actionVariant="add"
          isLoading={isSubmitting}
          onAction={() => formRef.current?.submit()}
        />
      </DialogContent>
    </Dialog>
  )
}

OrderDialog.propTypes = {
  recordId: PropTypes.any,
  trigger: PropTypes.any,
}

export default OrderDialog
