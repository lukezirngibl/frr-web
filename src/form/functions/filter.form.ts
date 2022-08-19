import { Translate } from '../translation'
import { processRepeatGroup, processRepeatSection } from '../util'
import {
  FormField,
  FormFieldGroup,
  FormFieldType,
  FormSection,
  GroupField,
  InternalFormField,
  MultiInputField,
  SectionField,
  SectionFields,
  SingleFormField,
} from '../types'

export type FilterParams<T> = {
  data: T
  formFields: Array<FormField<T>>
  translate: Translate
}
type Fn<T> = (i: FormField<T>) => boolean

const processFormFieldRow = <T>(
  fieldRow: Array<SingleFormField<T>>,
  fn: Fn<T>,
  isVisible: (d: T) => boolean = () => true,
): Array<SingleFormField<T>> =>
  fieldRow.reduce(
    (acc: Array<SingleFormField<T>>, field: SingleFormField<T>) =>
      fn({
        ...field,
        isVisible: (data: T) => {
          if (field.isVisible) {
            return field.isVisible(data) && isVisible(data)
          }
          return isVisible(data)
        },
      })
        ? [...acc, field]
        : acc,
    [],
  )

const processMultiInput = <T>(
  s: MultiInputField<T>,
  fn: Fn<T>,
  isVisible: (d: T) => boolean = () => true,
): Array<MultiInputField<T>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: processFormFieldRow(s.fields, fn, s.isVisible || isVisible),
        },
      ]
    : []

const processGroupFields = <T>(
  fields: Array<GroupField<T>>,
  fn: Fn<T>,
  isVisible: (d: T) => boolean = () => true,
): Array<GroupField<T>> =>
  fields.reduce((acc: Array<GroupField<T>>, f) => {
    if (Array.isArray(f)) {
      const row = processFormFieldRow(f, fn, isVisible)
      return [...acc, ...(row.length > 0 ? row : [])]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...acc, ...processMultiInput(f, fn, isVisible)]
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processGroup = <T>(
  group: FormFieldGroup<T>,
  fn: Fn<T>,
  isVisible: (d: T) => boolean = () => true,
): Array<FormFieldGroup<T>> =>
  fn(group)
    ? [
        {
          ...group,
          fields: processGroupFields(group.fields, fn, group.isVisible || isVisible),
        },
      ]
    : []

const processFormSectionFields = <T>(
  fields: SectionFields<T>,
  fn: Fn<T>,
  data: T,
  isVisible: (d: T) => boolean = () => true,
): SectionFields<T> => {
  return fields.reduce((acc: Array<SectionField<T>>, f) => {
    if (Array.isArray(f)) {
      const row = processFormFieldRow(f, fn, isVisible)
      return [...acc, ...(row.length > 0 ? row : [])]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...acc, ...processMultiInput(f, fn, isVisible)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...acc, ...processGroup(f, fn, isVisible)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      return [...acc, ...processFormSectionFields(groups, fn, data, isVisible)]
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])
}

const processFormSection = <T>(
  section: FormSection<T>,
  fn: Fn<T>,
  data: T,
  isVisible: (d: T) => boolean = () => true,
): Array<FormSection<T>> =>
  fn(section)
    ? [
        {
          ...section,
          fields: processFormSectionFields(section.fields, fn, data, section.isVisible || isVisible),
        },
      ]
    : []

const filterByFunc = <T>(
  { data, formFields, translate }: FilterParams<T>,
  fn: Fn<T>,
): Array<InternalFormField<T>> =>
  formFields.reduce((groups: Array<InternalFormField<T>>, f: FormField<T>) => {
    if (Array.isArray(f)) {
      const row = processFormFieldRow(f, fn)
      return [...groups, ...(row.length > 0 ? row : [])]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...groups, ...processGroup(f, fn)]
    } else if (f.type === FormFieldType.FormSection) {
      return [...groups, ...processFormSection(f, fn, data)]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...groups, ...processMultiInput(f, fn)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      return [...groups, ...filterByFunc({ data, formFields: groups, translate }, fn)]
    } else if (f.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(f, data, translate)
      return [...groups, ...filterByFunc({ data, formFields: sections, translate }, fn)]
    } else if (f.type === FormFieldType.Static) {
      return groups
    } else {
      return [...groups, ...(fn(f) ? [f] : [])]
    }
  }, [])

export const filterByVisible = <T>(params: FilterParams<T>) =>
  filterByFunc<T>(params, (field) => {
    return 'isVisible' in field && field.isVisible ? field.isVisible(params.data) : true
  })

const formGroupTypes = [
  FormFieldType.FormFieldRepeatGroup,
  FormFieldType.FormFieldRepeatSection,
  FormFieldType.FormFieldGroup,
  FormFieldType.MultiInput,
]

export const filterByHidden = <T>(params: FilterParams<T>) =>
  filterByFunc<T>(params, (field) => {
    if ('type' in field && formGroupTypes.includes(field.type)) {
      return 'isVisible' in field && field.isVisible ? !field.isVisible(params.data) : true
    } else if ('type' in field && field.type === FormFieldType.FormSection) {
      return true
    } else {
      return 'isVisible' in field && field.isVisible ? !field.isVisible(params.data) : false
    }
  })
