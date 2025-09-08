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

  // Only require country field if record is not from Mexico
  if (!isFromMexico) {
    baseSchema.country = countrySchema
  }

  return z.object(baseSchema)
}

const OrderForm = forwardRef(({ onSubmit, recordData }, ref) => {
  // Check if record is from Mexico (case insensitive)
  const isFromMexico = recordData?.nationality?.toLowerCase() === 'méxico' || 
                       recordData?.nationality?.toLowerCase() === 'mexico'

  const form = useForm({
    resolver: zodResolver(createFormSchema(isFromMexico)),
    defaultValues: {
      // If record is from Mexico, default country to mexico and hide the field
      ...(isFromMexico && { country: 'mexico' }),
    },
  })

  const submitHandler = form.handleSubmit((data) => {
    onSubmit?.(data)
  })

  // Expose the submit method to parent
  useImperativeHandle(ref, () => ({
    submit: () => submitHandler(),
  }))

  // Watch the country field to conditionally show payment methods
  const selectedCountry = form.watch("country")

  // Reset payment method when country changes
  useEffect(() => {
    if (selectedCountry) {
      form.setValue("payment_method", "")
    }
  }, [selectedCountry, form])

  const fields = [
    // Only show country field if record is not from Mexico
    ...(!isFromMexico ? [countryField()] : []),
    ...(selectedCountry ? [paymentMethodField(selectedCountry)] : []),
    amountField(),
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
