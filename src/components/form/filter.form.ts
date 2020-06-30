import {
  FormField,
  FormFieldGroup,
  FormSection,
  SectionField,
  SectionFields,
  SingleFieldOrRow,
  SingleFormField,
} from './Form'
import { FormFieldType } from './types'

const processFormFieldRow = <T, E>(
  a: Array<SingleFormField<T, E>>,
  fn: (i: SingleFormField<T, E>) => boolean,
): Array<SingleFormField<T, E>> =>
  a.reduce(
    (acc: Array<SingleFormField<T, E>>, j: SingleFormField<T, E>) =>
      fn(j) ? [...acc, j] : acc,
    [],
  )

const processFormFieldGroup = <T, E>(
  g: FormFieldGroup<T, E>,
  fn: (i: SingleFormField<T, E>) => boolean,
): FormFieldGroup<T, E> => ({
  ...g,
  fields: g.fields.reduce(
    (
      filteredFields: Array<SingleFieldOrRow<T, E>>,
      e: SingleFieldOrRow<T, E>,
    ) => {
      if (Array.isArray(e)) {
        return [...filteredFields, processFormFieldRow(e, fn)]
      } else {
        return [...filteredFields, ...(fn(e) ? [e] : [])]
      }
    },
    [],
  ),
})

const processFormSectionFields = <T, E>(
  fields: SectionFields<T, E>,
  fn: (i: SingleFormField<T, E>) => boolean,
): SectionFields<T, E> =>
  fields.reduce((acc: Array<SectionField<T, E>>, f) => {
    if (Array.isArray(f)) {
      return [...acc, processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...acc, processFormFieldGroup(f, fn)]
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processFormSection = <T, E>(
  s: FormSection<T, E>,
  fn: (i: SingleFormField<T, E>) => boolean,
): FormSection<T, E> => ({
  ...s,
  fields: processFormSectionFields(s.fields, fn),
})

export const filterFormFields = <T, E>(
  formFields: Array<FormField<T, E>>,
  fn: (i: SingleFormField<T, E>) => boolean,
): Array<FormField<T, E>> =>
  formFields.reduce((groups: Array<FormField<T, E>>, f: FormField<T, E>) => {
    if (Array.isArray(f)) {
      return [...groups, processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...groups, processFormFieldGroup(f, fn)]
    } else if (f.type === FormFieldType.FormSection) {
      return [...groups, processFormSection(f, fn)]
    } else {
      return [...groups, ...(fn(f) ? [f] : [])]
    }
  }, [])
