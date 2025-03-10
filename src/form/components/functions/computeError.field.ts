import { FieldError, FormFieldType, SingleFormField } from '../types'

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
