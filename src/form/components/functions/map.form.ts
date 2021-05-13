import {
  FormFieldType,
  FormFieldGroup,
  InternalSectionFields,
  SingleFormField,
  InternalFormField,
} from '../types'

type Fn<T, V> = (i: SingleFormField<T>) => V

const processFormFieldRow = <T, V>(
  a: Array<SingleFormField<T>>,
  func: Fn<T, V>,
): Array<V> => a.map((j) => func(j))

const processFormFieldGroup = <T, V>(
  group: FormFieldGroup<T>,
  func: Fn<T, V>,
): Array<V> =>
  group.fields.reduce((values, field) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [] as Array<V>)

const processFormSectionFields = <T, V>(
  fields: InternalSectionFields<T>,
  func: Fn<T, V>,
): Array<V> =>
  fields.reduce((values, field) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.FormFieldGroup) {
      newValues = processFormFieldGroup(field, func)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else if (field.type === FormFieldType.TextInputDescription) {
      newValues = []
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [] as Array<V>)

export const mapFormFields = <T, V>(
  formFields: Array<InternalFormField<T>>,
  func: Fn<T, V>,
): Array<V> =>
  formFields.reduce((values: Array<V>, field: InternalFormField<T>) => {
    let newValues = []
    if (Array.isArray(field)) {
      newValues = processFormFieldRow(field, func)
    } else if (field.type === FormFieldType.FormFieldGroup) {
      newValues = processFormFieldGroup(field, func)
    } else if (field.type === FormFieldType.FormSection) {
      newValues = processFormSectionFields(field.fields as any, func)
    } else if (field.type === FormFieldType.MultiInput) {
      newValues = processFormFieldRow(field.fields, func)
    } else if (field.type === FormFieldType.TextInputDescription) {
      newValues = []
    } else {
      newValues = [func(field)]
    }

    return [...values, ...newValues]
  }, [])
