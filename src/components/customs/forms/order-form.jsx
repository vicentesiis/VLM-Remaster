import { zodResolver } from "@hookform/resolvers/zod"
import PropTypes from "prop-types"
import React, { forwardRef, useImperativeHandle } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { renderFormField } from "./form-field-renders"
import { Form } from "@/components/ui/form"
import { amountField, paymentMethodField } from "@/forms/fields"
import { amountSchema, paymentMethodSchema } from "@/forms/validators"

export const formSchema = z.object({
  order_amount: amountSchema,
  payment_method: paymentMethodSchema,
})

const OrderForm = forwardRef(({ onSubmit }, ref) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const submitHandler = form.handleSubmit((data) => {
    onSubmit?.(data)
  })

  // Expose the submit method to parent
  useImperativeHandle(ref, () => ({
    submit: () => submitHandler(),
  }))

  const fields = [paymentMethodField(), amountField()]

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
}

OrderForm.displayName = "OrderForm"

export default OrderForm
