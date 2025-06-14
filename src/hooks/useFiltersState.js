import { useState, useCallback } from "react"

export function useFiltersState(initialValues) {
  const [values, setValues] = useState(initialValues)

  const onChange = Object.fromEntries(
    Object.keys(initialValues).map((key) => [
      key,
      (val) =>
        setValues((prev) => ({
          ...prev,
          [key]: val,
        })),
    ])
  )

  const reset = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return { values, onChange, reset }
}
