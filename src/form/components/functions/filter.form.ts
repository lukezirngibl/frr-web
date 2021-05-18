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
  FormFieldRepeatSection,
  FormFieldRepeatGroup,
} from '../types'
import { processRepeatGroup, processRepeatSection } from '../../util'

type Fn<T> = (i: FormField<T>) => boolean

const processFormFieldRow = <T>(
  a: Array<SingleFormField<T>>,
  fn: Fn<T>,
  isVisible: (d: T) => boolean = () => true,
): Array<SingleFormField<T>> => {
  console.log('FORM ROW', a)
  return a.reduce(
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
}

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

const filterByFunc =
  <T>(data: T, fn: Fn<T>) =>
  (formFields: Array<FormField<T>>): Array<InternalFormField<T>> =>
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
  return filterByFunc(data, (field) => {
    return 'isVisible' in field ? field.isVisible(data) : true
  })
}

const formGroupTypes = [
  FormFieldType.FormFieldRepeatGroup,
  FormFieldType.FormFieldRepeatSection,
  FormFieldType.FormFieldGroup,
  FormFieldType.FormSection,
  FormFieldType.MultiInput,
]

export const filterByHidden = <T>(data: T) => {
  return filterByFunc(data, (field) => {
    let defaultValue = false

    if ('type' in field && formGroupTypes.includes(field.type)) {
      defaultValue = true
    }
    console.log('FILTER FIELD', field)
    return 'isVisible' in field ? !field.isVisible(data) : defaultValue
  })
}

export const filterChangedRepeatFormFields = <T>(
  data: T,
  formFields: Array<FormField<T>>,
): Array<{ field: FormFieldRepeatSection<T> | FormFieldRepeatGroup<T>; value: Array<any> }> =>
  formFields
    .filter(
      (field) =>
        'type' in field &&
        (field.type === FormFieldType.FormFieldRepeatSection ||
          field.type === FormFieldType.FormFieldRepeatGroup) &&
        field.length.get(data) - field.lens.get(data).length !== 0,
    )
    .map((field: FormFieldRepeatSection<T> | FormFieldRepeatGroup<T>) => {
      const length = field.length.get(data) as number
      const list = field.lens.get(data) as Array<any>

      return {
        field,
        value: Array.from({
          length,
        }).map((_, index) => list[index]),
      }
    })
