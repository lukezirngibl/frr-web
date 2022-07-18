import { useEffect, useState } from 'react'
import { FieldError, FormFieldType, SingleFormField } from '../types'

export const computeFieldError = <FormData>({
  data,
  field,
  isValidate,
  value,
}: {
  data: FormData
  field: SingleFormField<FormData>
  isValidate: boolean
  value: string | string[] | boolean | number | Date | null | File | Array<File>
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
    if (field.type === FormFieldType.FormattedDatePicker || field.type === FormFieldType.DatePicker) {
      error = 'formFields.error.invalidDate'
    } else {
      error = 'formFields.error.fieldRequired'
    }
  }

  if (isValidate && !error && !!field.validate) {
    error = field.validate(value)
  }

  if (isValidate && !error && field.type === FormFieldType.CurrencyInput && !!value) {
    const cleanedValue = Number(`${value}`.replace(',', '.'))
    if (isNaN(cleanedValue)) {
      error = 'formFields.error.invalidAmount'
    } else {
      const min = 'min' in field ? field.min : 0
      const max = 'max' in field ? field.max : 10000000
      if (value < min) {
        error = 'formFields.error.invalidMinAmount'
      } else if (value > max) {
        error = 'formFields.error.invalidMaxAmount'
      }
    }
  }

  if (!error && field.type === FormFieldType.NumberInput) {
    if ('min' in field && value < field.min) {
      error = 'formFields.error.minError'
    } else if ('max' in field && value > field.max) {
      error = 'formFields.error.maxError'
    }
  }

  return { error, fieldId: field.lens.id() }
}

export const useFormFieldError = <FormData>({
  data,
  field,
  isDirty,
  showValidation,
  disableDirtyValidation,
  value,
}: {
  data: FormData
  field: SingleFormField<FormData>
  isDirty: boolean
  showValidation: boolean
  disableDirtyValidation: boolean
  value: string | string[] | number | Date | boolean | null | File | Array<File>
}): string | null => {
  const [fieldError, setFieldError] = useState({ error: null, fieldId: null })
  useEffect(() => {
    showValidation || (isDirty && !disableDirtyValidation)
      ? setFieldError(computeFieldError({ value, field, data, isValidate: showValidation }))
      : setFieldError({ error: null, fieldId: null })
  }, [value, showValidation, isDirty])

  return fieldError.error
}

export const useFormFieldErrors = ({
  errors,
}: {
  errors: Array<FieldError>
}): { errorLabel: Array<string>; errorDataTestId?: string } => {
  const [errorLabel, setErrorLabel] = useState([])
  useEffect(() => {
    const errorLabels = new Set(errors.map((error) => error.error))
    setErrorLabel(Array.from(errorLabels))
  }, [errors])

  const errorDataTestId = errors.length > 0 ? `${errors[0].fieldId}.error` : undefined

  return { errorLabel, errorDataTestId }
}
