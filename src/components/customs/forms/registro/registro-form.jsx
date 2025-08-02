import { zodResolver } from "@hookform/resolvers/zod"
import PropTypes from "prop-types"
import React, { forwardRef, useImperativeHandle } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { RegistroSectionForm } from "./registro-section-form"
import { Form } from "@/components/ui/form"
import {
  nameField,
  emailField,
  phoneField,
  dateOfBirthField,
  nationalityField,
  stateField,
  documentField,
  documentTypeField,
  jobField,
  programField,
  channelField,
  commentsField,
  creditField,
  exitDate,
} from "@/forms/fields"
import {
  nameSchema,
  emailSchema,
  phoneSchema,
  dateOfBirthSchema,
  nationalitySchema,
  stateSchema,
  documentSchema,
  documentTypeSchema,
  jobSchema,
  programSchema,
  channelSchema,
  commentsSchema,
  creditSchema,
  exitDateTypeSchema,
} from "@/forms/validators"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { mapToOptions } from "@/utils/utils"

export const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  date_of_birth: dateOfBirthSchema,
  nationality: nationalitySchema,
  state: stateSchema,
  document: documentSchema,
  document_type: documentTypeSchema,
  exit_date: exitDateTypeSchema,
  job: jobSchema,
  program: programSchema,
  channel: channelSchema,
  comments: commentsSchema,
  credit: creditSchema,
})

const RegistroForm = forwardRef(
  ({ onSubmit, defaultValues, isEdit = false, vacantId }, ref) => {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        date_of_birth: defaultValues?.date_of_birth ?? new Date("2000-01-02"),
        nationality: "méxico",
        state: "",
        document: defaultValues?.passport || defaultValues?.curp || "",
        document_type: defaultValues?.passport
          ? "passport"
          : defaultValues?.curp
            ? "curp"
            : "",
        exit_date: "",
        job: vacantId ?? "",
        program: "",
        channel: "",
        comments: "",
        ...defaultValues,
      },
    })

    const submitHandler = form.handleSubmit((data) => {
      console.log("RegistroForm data:", data)
      onSubmit?.(data)
    })

    useImperativeHandle(ref, () => ({
      submit: () => submitHandler(),
    }))

    const { isAdmin } = useCurrentUser()
    const { nationalities, mexicoStates, programs, channels } = useCodexData()

    const nacionalidadOptions = mapToOptions(nationalities.data)
    const estadosOptions = mapToOptions(mexicoStates.data)
    const programaOptions = mapToOptions(programs.data)
    const allowedChannels = ["whatsapp", "phone"]
    const channelOptions = mapToOptions(channels.data).filter((opt) =>
      allowedChannels.includes(opt.value)
    )

    const recordDataFields = [
      nameField({ disabled: !isAdmin && isEdit }),
      emailField(),
      phoneField(),
      dateOfBirthField(),
      nationalityField(nacionalidadOptions),
      stateField(estadosOptions),
      documentField({ disabled: !isAdmin && isEdit }),
      documentTypeField(
        [
          { label: "Pasaporte", value: "passport" },
          { label: "CURP", value: "curp" },
        ],
        { disabled: !isAdmin && isEdit }
      ),
      ...(isEdit ? [exitDate()] : []),
    ]

    const programValue = form.watch("program")
    const initialProgram = defaultValues?.program

    const programHasChanged = programValue && programValue !== initialProgram

    const vacantInfoFields = [
      jobField(),
      programField(programaOptions, { disabled: !isAdmin && isEdit }),
      ...(isEdit && programHasChanged ? [creditField()] : []),
      channelField(channelOptions, { disabled: !isAdmin && isEdit }),
      commentsField(),
    ]

    return (
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
              <RegistroSectionForm
                title="Datos del Registro"
                form={form}
                fields={recordDataFields}
              />
              <RegistroSectionForm
                title="Información del Proceso"
                form={form}
                fields={vacantInfoFields}
              />
            </div>
          </form>
        </Form>
      </FormProvider>
    )
  }
)

RegistroForm.propTypes = {
  defaultValues: PropTypes.any,
  isEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
  vacantId: PropTypes.any,
}

RegistroForm.displayName = "RegistroForm"

export default RegistroForm
