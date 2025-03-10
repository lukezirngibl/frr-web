import { useEffect, useState } from 'react'
import { computeFieldError } from '../form/components/functions/computeError.field'
import { FieldError, FieldMarks, SingleFormField } from '../form/components/types'

export const useFormFieldError = <FormData>({
  data,
  field,
  isDirty,
  showValidation,
  value,
}: {
  data: FormData
  field: SingleFormField<FormData>
  isDirty: boolean
  showValidation: boolean
  value: string | string[] | number | number[] | Date | boolean | null | File | Array<File>
}): string | null => {
  const [fieldError, setFieldError] = useState({ error: null, fieldId: null })
  const [marks] = useState('marks' in field ? (field.marks as FieldMarks).map((mark) => mark.value) : [])

  useEffect(() => {
    showValidation || isDirty
      ? setFieldError(computeFieldError({ value, field, data, isValidate: showValidation, marks }))
      : setFieldError({ error: null, fieldId: null })
  }, [value, showValidation, isDirty])

  return fieldError.error
}

const defineOnError = (error: FieldError) => (errors: Array<FieldError>) => {
  const errorIndex = errors.findIndex((err) => err.fieldId === error.fieldId)
  const newErrors = [...errors]
  if (errorIndex === -1 && !!error.error) {
    newErrors.push(error)
  } else if (errorIndex > -1) {
    newErrors[errorIndex] = error
  }
  return newErrors.filter((error) => !!error.error)
}

export const useFormFieldErrors = (): {
  errorLabel: Array<string>
  errorDataTestId?: string
  onError: (error: FieldError) => void
} => {
  const [errors, setErrors] = useState([])
  const [errorLabel, setErrorLabel] = useState([])

  // Define onError action handler
  const onError = (error: { error: string | null; fieldId: string }) => setErrors(defineOnError(error))

  // Determine error label
  useEffect(() => {
    const errorLabels = new Set(errors.filter((error) => !!error.error).map((error) => error.error))
    setErrorLabel(Array.from(errorLabels))
  }, [errors])

  const errorDataTestId = errors.length > 0 ? `${errors[0].fieldId}.error` : undefined

  return { errorLabel, errorDataTestId, onError }
}
