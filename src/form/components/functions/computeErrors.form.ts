import { FieldMarks, InternalFormField, SingleFormField } from '../types'
import { computeFieldError } from './computeError.field'
import { mapFormFields } from './map.form'

const getFieldError =
  <FormData>(data: FormData) =>
  (field: SingleFormField<FormData>): { error: string | null; fieldId: string } => {
    const value = field.lens.get(data)
    const marks = 'marks' in field ? (field.marks as FieldMarks).map((mark) => mark.value) : []

    return computeFieldError({ value, data, field, isValidate: true, marks })
  }

export const computeFormErrors = <FormData>({
  data,
  formFields,
}: {
  data: FormData
  formFields: Array<InternalFormField<FormData>>
}): Array<{ error: string | null; fieldId: string }> => {
  const errors = mapFormFields(formFields, getFieldError(data)).filter(
    (fieldError) => !!fieldError.error,
  )

  return errors
}
