import { useEffect, useState } from 'react'
import { FieldError, FieldMarks, FormFieldType, SingleFormField } from '../form/components/types'

export const computeFieldError = <FormData>({
  data,
  field,
  isValidate,
  marks,
  value,
}: {
  data: FormData
  field: SingleFormField<FormData>
  isValidate: boolean
  marks: Array<number>
  value: string | string[] | boolean | number | number[] | Date | null | File | Array<File>
}): FieldError => {
  let error = null
  const isRequired =
    'required' in field
      ? typeof field.required === 'function'
        ? field.required(data)
        : field.required
      : false

  value = typeof value === 'string' ? value.trim() : value

  if (isRequired && (value === '' || value === null || value === undefined)) {
    if (
      field.type === FormFieldType.FormattedDatePicker ||
      field.type === FormFieldType.DatePicker ||
      field.type === FormFieldType.MaskedDatePicker
    ) {
      error = 'formFields.error.invalidDate'
    } else {
      error = 'formFields.error.fieldRequired'
    }
  }

  if (isValidate && !error && !!field.validate) {
    error = field.validate(value, data)
  }

  if (
    isValidate &&
    !error &&
    value !== undefined &&
    value !== null &&
    value !== '' &&
    (field.type === FormFieldType.CurrencyInput ||
      (field.type === FormFieldType.Slider && field.isCurrency))
  ) {
    const cleanedValue = Number(`${value}`.replace(',', '.'))
    if (isNaN(cleanedValue)) {
      error = 'formFields.error.invalidAmount'
    } else {
      const min = 'min' in field ? field.min : 0
      const max = 'max' in field ? field.max : 10000000
      if ((value as number) < min) {
        error = 'formFields.error.invalidMinAmount'
      } else if ((value as number) > max) {
        error = 'formFields.error.invalidMaxAmount'
      }
    }
  }

  if (
    !error &&
    (field.type === FormFieldType.NumberInput ||
      (field.type === FormFieldType.Slider && !field.isCurrency))
  ) {
    if ('min' in field && (value as number) < field.min) {
      error = 'formFields.error.minError'
    } else if ('max' in field && (value as number) > field.max) {
      error = 'formFields.error.maxError'
    } else if (marks.length > 0 && !marks.includes(value as number)) {
      error = 'formFields.error.invalidValue'
    }
  }

  return { error, fieldId: field.lens.id() }
}

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
