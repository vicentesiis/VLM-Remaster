import { zodResolver } from "@hookform/resolvers/zod"
import PropTypes from "prop-types"
import React, { forwardRef, useImperativeHandle, useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { renderFormField } from "./form-field-renders"
import { Form } from "@/components/ui/form"
import { amountField, paymentMethodField, countryField } from "@/forms/fields"
import { amountSchemaByCountry, paymentMethodSchema, countrySchema } from "@/forms/validators"

export const createFormSchema = (isFromMexico, selectedCountry = null) => {
  // Determine which country to use for validation
  const country = isFromMexico ? 'méxico' : selectedCountry
  
  const baseSchema = {
    order_amount_local: country ? amountSchemaByCountry[country] || amountSchemaByCountry.méxico : amountSchemaByCountry.méxico,
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

  const [currentCountry, setCurrentCountry] = useState(isFromMexico ? 'méxico' : null)

  const form = useForm({
    resolver: zodResolver(createFormSchema(isFromMexico, currentCountry)),
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
    if (selectedCountry && selectedCountry !== currentCountry) {
      setCurrentCountry(selectedCountry)
      
      // Clear payment method and amount when country changes
      form.setValue("payment_method", "")
      form.setValue("order_amount_local", "")
      
      // Create new resolver with updated country schema
      const newSchema = createFormSchema(isFromMexico, selectedCountry)
      
      // Reset the form with new resolver
      form.reset({
        country: selectedCountry,
        payment_method: "",
        order_amount_local: ""
      }, {
        resolver: zodResolver(newSchema)
      })
    }
  }, [selectedCountry, currentCountry, form, isFromMexico])

  const displayCountry = isFromMexico ? 'méxico' : currentCountry

  const fields = [
    ...(!isFromMexico ? [countryField()] : []),
    ...(currentCountry ? [paymentMethodField(currentCountry)] : []),
    ...(isFromMexico || currentCountry ? [amountField(displayCountry)] : []),
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
