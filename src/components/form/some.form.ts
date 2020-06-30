import {
  FormField,
  FormFieldGroup,
  SectionFields,
  SingleFormField,
} from './Form'
import { FormFieldType } from './types'

type Fn<T, E> = (i: SingleFormField<T, E>) => boolean

const processFormFieldRow = <T, E>(
  a: Array<SingleFormField<T, E>>,
  fn: Fn<T, E>,
): boolean => a.some(j => fn(j))

const processFormFieldGroup = <T, E>(
  g: FormFieldGroup<T, E>,
  fn: Fn<T, E>,
): boolean =>
  g.fields.some(f => {
    if (Array.isArray(f)) {
      return processFormFieldRow(f, fn)
    } else {
      return fn(f)
    }
  })

const processFormSectionFields = <T, E>(
  fields: SectionFields<T, E>,
  fn: Fn<T, E>,
): boolean =>
  fields.some(f => {
    if (Array.isArray(f)) {
      return processFormFieldRow(f, fn)
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return processFormFieldGroup(f, fn)
    } else {
      return fn(f)
    }
  })

export const someFormFields = <T, E>(
  formFields: Array<FormField<T, E>>,
  fn: Fn<T, E>,
): boolean =>
  formFields.some((f: FormField<T, E>) => {
    if (Array.isArray(f)) {
      return processFormFieldRow(f, fn)
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return processFormFieldGroup(f, fn)
    } else if (f.type === FormFieldType.FormSection) {
      return processFormSectionFields(f.fields, fn)
    } else {
      return fn(f)
    }
  })
