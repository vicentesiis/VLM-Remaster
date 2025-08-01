import { UserPenIcon, UserPlusIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import RegistroForm from "../forms/registro/registro-form"
import { Button, DialogFooterCustom, DialogHeaderCustom } from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateRecord, useUpdateRecord } from "@/hooks/queries/useRecord"

const RegistroDialog = ({ trigger, mode = "add", recordToEdit, vacantId }) => {
  const formRef = useRef()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const isEdit = mode === "edit"
  const icon = isEdit ? UserPenIcon : UserPlusIcon
  const title = isEdit ? "Editar Registro" : "Nuevo Registro"
  const buttonText = isEdit ? "Actualizar Registro" : "Agregar Registro"
  const buttonVariant = isEdit ? "edit" : "add"
  const iconBgClass = isEdit ? "bg-orange-600" : "bg-green-600"

  const { mutateAsync: createRecord } = useCreateRecord()
  const { mutateAsync: updateRecord } = useUpdateRecord()

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      credit: data.credit ? data.credit * 100 : undefined,
      passport: data.document_type === "passport" ? data.document : "",
      curp: data.document_type === "curp" ? data.document : "",
    }

    delete payload.document
    delete payload.document_type

    try {
      setIsSubmitting(true)
      const response = isEdit
        ? await updateRecord({ ...payload, id: recordToEdit.id })
        : await createRecord(payload)

      const publicId = response.data.public_id

      toast.success(
        `${isEdit ? "Registro actualizado" : "Registro creado"} con éxito`
      )

      setOpen(false)

      if (!isEdit) {
        navigate(`/registros/detalle/${publicId}`)
      }
    } catch (err) {
      console.error("Error:", err)

      const message =
        err?.response?.data?.detail || "Ocurrió un error inesperado."

      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={buttonVariant} size="sm">
            {React.createElement(icon)}
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-auto bg-gray-100 dark:bg-zinc-800 sm:max-w-7xl 2xl:max-h-[calc(100vh-150px)]">
        <DialogHeaderCustom
          icon={icon}
          title={title}
          iconBgClass={iconBgClass}
        />

        <RegistroForm
          ref={formRef}
          onSubmit={handleSubmit}
          defaultValues={recordToEdit}
          isEdit={isEdit}
          vacantId={vacantId}
        />

        <DialogFooterCustom
          actionLabel={buttonText}
          actionVariant={buttonVariant}
          isLoading={isSubmitting}
          onAction={() => formRef.current?.submit()}
        />
      </DialogContent>
    </Dialog>
  )
}

RegistroDialog.propTypes = {
  mode: PropTypes.string,
  recordToEdit: PropTypes.any,
  trigger: PropTypes.any,
  vacantId: PropTypes.any,
}

export default RegistroDialog
