import { zodResolver } from "@hookform/resolvers/zod"
import PropTypes from "prop-types"
import React, { forwardRef, useImperativeHandle, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { renderFormField } from "./form-field-renders"
import { Form } from "@/components/ui/form"
import { amountField, paymentMethodField, countryField } from "@/forms/fields"
import { amountSchema, paymentMethodSchema, countrySchema } from "@/forms/validators"

export const createFormSchema = (isFromMexico) => {
  const baseSchema = {
    order_amount: amountSchema,
    payment_method: paymentMethodSchema,
  }

  if (!isFromMexico) {
    baseSchema.country = countrySchema
  }

  return z.object(baseSchema)
}

const OrderForm = forwardRef(({ onSubmit, recordData }, ref) => {
  const isFromMexico = recordData?.nationality?.toLowerCase() === 'méxico' || 
                       recordData?.nationality?.toLowerCase() === 'mexico'

  const form = useForm({
    resolver: zodResolver(createFormSchema(isFromMexico)),
    defaultValues: {
      ...(isFromMexico && { country: 'méxico' }),
    },
  })

  const submitHandler = form.handleSubmit((data) => {
    onSubmit?.(data)
  })

  useImperativeHandle(ref, () => ({
    submit: () => submitHandler(),
  }))

  const selectedCountry = form.watch("country")

  useEffect(() => {
    if (selectedCountry) {
      form.setValue("payment_method", "")
    }
  }, [selectedCountry, form])

  const fields = [
    ...(!isFromMexico ? [countryField()] : []),
    ...(selectedCountry ? [paymentMethodField(selectedCountry)] : []),
    ...(isFromMexico || selectedCountry ? [amountField()] : []),
  ]

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={submitHandler}>
          <div className="space-y-4">
            {fields.map((fieldConfig) => {
              const { name, type, label, options, ...rest } = fieldConfig
              return renderFormField(type, name, label, options, rest, form)
            })}
          </div>
        </form>
      </Form>
    </FormProvider>
  )
})

OrderForm.propTypes = {
  defaultValues: PropTypes.any,
  isEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
  recordData: PropTypes.object,
}

OrderForm.displayName = "OrderForm"

export default OrderForm
