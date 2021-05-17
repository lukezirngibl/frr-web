import {
  FormFieldType,
  FormField,
  FormSection,
  SectionField,
  SectionFields,
  SingleFormField,
  GroupField,
  MultiInputField,
  FormFieldGroup,
  InternalFormField,
} from '../types'
import { processRepeatGroup, processRepeatSection } from '../../util'

type Fn<T> = (i: FormField<T>) => boolean

const processFormFieldRow = <T>(
  a: Array<SingleFormField<T>>,
  fn: Fn<T>,
  isVisible: (d: T) => boolean = () => true,
): Array<SingleFormField<T>> =>
  a.reduce(
    (acc: Array<SingleFormField<T>>, j: SingleFormField<T>) =>
      fn({
        ...j,
        isVisible: (data: T) => {
          if (j.isVisible) {
            return j.isVisible(data) && isVisible(data)
          }
          return isVisible(data)
        },
      })
        ? [...acc, j]
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
      return [...acc, processFormFieldRow(f, fn, isVisible)]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...acc, ...processMultiInput(f, fn, isVisible)]
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processGroup = <T>(
  s: FormFieldGroup<T>,
  fn: Fn<T>,
  isVisible: (d: T) => boolean = () => true,
): Array<FormFieldGroup<T>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: processGroupFields(s.fields, fn, s.isVisible || isVisible),
        },
      ]
    : []

const processFormSectionFields = <T>(
  fields: SectionFields<T>,
  fn: Fn<T>,
  data: T,
  isVisible: (d: T) => boolean = () => true,
): SectionFields<T> =>
  fields.reduce((acc: Array<SectionField<T>>, f) => {
    if (Array.isArray(f)) {
      return [...acc, processFormFieldRow(f, fn, isVisible)]
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

const processFormSection = <T>(
  s: FormSection<T>,
  fn: Fn<T>,
  data: T,
  isVisible: (d: T) => boolean = () => true,
): Array<FormSection<T>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: processFormSectionFields(
            s.fields,
            fn,
            data,
            s.isVisible || isVisible,
          ),
        },
      ]
    : []

const filterByFunc = <T>(data: T, fn: Fn<T>) => (
  formFields: Array<FormField<T>>,
): Array<InternalFormField<T>> =>
  formFields.reduce((groups: Array<InternalFormField<T>>, f: FormField<T>) => {
    if (Array.isArray(f)) {
      return [...groups, processFormFieldRow(f, fn)]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      return [...groups, ...processGroup(f, fn)]
    } else if (f.type === FormFieldType.FormSection) {
      return [...groups, ...processFormSection(f, fn, data)]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...groups, ...processMultiInput(f, fn)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      return [...groups, ...filterByFunc(data, fn)(groups)]
    } else if (f.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(f, data, () => '')
      return [...groups, ...filterByFunc(data, fn)(sections)]
    } else if (f.type === FormFieldType.Static) {
      return groups
    } else {
      return [...groups, ...(fn(f) ? [f] : [])]
    }
  }, [])

export const filterByVisible = <T>(data: T) => {
  return filterByFunc(data, (i) => {
    return 'isVisible' in i ? i.isVisible(data) : true
  })
}

export const filterByHidden = <T>(data: T) => {
  return filterByFunc(data, (i) => {
    // console.log(i, 'isVisible' in i ? !i.isVisible(data) : false)

    return 'isVisible' in i ? !i.isVisible(data) : true
  })
}
