import { FileText } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import OrderForm from "../forms/order-form"
import {
  Button,
  Card,
  CardContent,
  CustomDialog,
  CustomDialogTrigger,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogBody,
  CustomDialogFooter,
} from "@/components/ui"
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
    <CustomDialog open={open} onOpenChange={setOpen}>
      <CustomDialogTrigger asChild>
        {trigger || (
          <Button variant={"add"} size="sm">
            <FileText />
            Crear Órden
          </Button>
        )}
      </CustomDialogTrigger>
      <CustomDialogContent className="bg-gray-100 dark:bg-gray-950">
        <CustomDialogHeader
          icon={FileText}
          title={"Crear Órden"}
          iconBgClass={"bg-green-600"}
        />

        <CustomDialogBody>
          <Card>
            <CardContent>
              <OrderForm ref={formRef} onSubmit={handleSubmit} recordData={recordData} />
            </CardContent>
          </Card>
        </CustomDialogBody>

        <CustomDialogFooter
          actionLabel="Crear Órden"
          actionVariant="add"
          isLoading={isSubmitting}
          onAction={() => formRef.current?.submit()}
        />
      </CustomDialogContent>
    </CustomDialog>
  )
}

OrderDialog.propTypes = {
  recordId: PropTypes.any,
  trigger: PropTypes.any,
}

export default OrderDialog
