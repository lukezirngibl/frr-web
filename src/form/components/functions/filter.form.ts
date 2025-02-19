import { Translate } from '../../../translation'
import { processRepeatGroup, processRepeatSection } from '../../util'
import {
  FormField,
  FormFieldGroup,
  FormFieldType,
  FormSection,
  FormSectionCard,
  GroupField,
  InternalFormField,
  IsVisibleFn,
  MultiInputAutosuggestField,
  MultiInputField,
  SectionField,
  SectionFields,
  SingleFormField,
  TextInputAutosuggestField,
} from '../types'

export type FilterParams<T> = {
  data: T
  formFields: Array<FormField<T>>
  formReadOnly?: boolean
  translate?: Translate
}
type Fn<T> = (i: FormField<T>) => boolean

const processFormFieldRow = <T>(
  fieldRow: Array<SingleFormField<T>>,
  fn: Fn<T>,
  isVisible: IsVisibleFn<T> = () => true,
): Array<SingleFormField<T>> =>
  fieldRow.reduce(
    (acc: Array<SingleFormField<T>>, field: SingleFormField<T>) =>
      fn({
        ...field,
        isVisible: (data, options) => {
          if (field.isVisible) {
            return field.isVisible(data, options) && isVisible(data, options)
          }
          return isVisible(data, options)
        },
      })
        ? [...acc, field]
        : acc,
    [],
  )

const processMultiInput = <T>(
  s: MultiInputField<T>,
  fn: Fn<T>,
  isVisible: IsVisibleFn<T> = () => true,
): Array<MultiInputField<T>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: processFormFieldRow(s.fields, fn, s.isVisible || isVisible),
        },
      ]
    : []

const processMultiInputAutosuggest = <T>(
  s: MultiInputAutosuggestField<T>,
  fn: Fn<T>,
  isVisible: IsVisibleFn<T> = () => true,
): Array<MultiInputAutosuggestField<T>> =>
  fn(s)
    ? [
        {
          ...s,
          fields: s.fields.reduce(
            (acc: Array<TextInputAutosuggestField<T>>, field: TextInputAutosuggestField<T>) =>
              fn({
                ...field,
                isVisible: (data, options) => isVisible(data, options),
              })
                ? [...acc, field]
                : acc,
            [],
          ),
        },
      ]
    : []

const processGroupFields = <T>(
  fields: Array<GroupField<T>>,
  fn: Fn<T>,
  isVisible: IsVisibleFn<T> = () => true,
): Array<GroupField<T>> =>
  fields.reduce((acc: Array<GroupField<T>>, f) => {
    if (Array.isArray(f)) {
      const row = processFormFieldRow(f, fn, isVisible)
      return [...acc, ...(row.length > 0 ? row : [])]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...acc, ...processMultiInput(f, fn, isVisible)]
    } else if (f.type === FormFieldType.MultiInputAutosuggest) {
      return [...acc, ...processMultiInputAutosuggest(f, fn, isVisible)]
    } else {
      return [...acc, ...(fn(f) ? [f] : [])]
    }
  }, [])

const processGroup = <T>(
  group: FormFieldGroup<T>,
  fn: Fn<T>,
  isVisible: IsVisibleFn<T> = () => true,
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
  isVisible: IsVisibleFn<T> = () => true,
): SectionFields<T> => {
  return fields.reduce((acc: Array<SectionField<T>>, f) => {
    if (Array.isArray(f)) {
      const row = processFormFieldRow(f, fn, isVisible)
      return [...acc, ...(row.length > 0 ? row : [])]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...acc, ...processMultiInput(f, fn, isVisible)]
    } else if (f.type === FormFieldType.MultiInputAutosuggest) {
      return [...acc, ...processMultiInputAutosuggest(f, fn, isVisible)]
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
  isVisible: IsVisibleFn<T> = () => true,
): Array<FormSection<T>> =>
  fn(section)
    ? [
        {
          ...section,
          fields: processFormSectionFields(section.fields, fn, data, section.isVisible || isVisible),
        },
      ]
    : []

const processFormSectionCard = <T>(
  section: FormSectionCard<T>,
  fn: Fn<T>,
  data: T,
  isVisible: IsVisibleFn<T> = () => true,
): Array<FormSectionCard<T>> =>
  fn(section)
    ? [
        {
          ...section,
          fields: processFormSectionFields(section.fields, fn, data, isVisible),
        },
      ]
    : []

const filterByFunc = <T>(
  { data, formFields, translate = (k: string) => k }: FilterParams<T>,
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
    } else if (f.type === FormFieldType.FormSectionCard) {
      return [...groups, ...processFormSectionCard(f, fn, data)]
    } else if (f.type === FormFieldType.MultiInput) {
      return [...groups, ...processMultiInput(f, fn)]
    } else if (f.type === FormFieldType.MultiInputAutosuggest) {
      return [...groups, ...processMultiInputAutosuggest(f, fn)]
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
    return params.formReadOnly && 'isVisibleReadonly' in field && field.isVisibleReadonly
      ? field.isVisibleReadonly(params.data, { formReadOnly: params.formReadOnly })
      : 'isVisible' in field && field.isVisible
        ? field.isVisible(params.data, { formReadOnly: params.formReadOnly })
        : true
  })

const FormGroupTypes = [
  FormFieldType.FormFieldRepeatGroup,
  FormFieldType.FormFieldRepeatSection,
  FormFieldType.FormFieldGroup,
  FormFieldType.MultiInput,
  FormFieldType.MultiInputAutosuggest,
]

export const filterByHidden = <T>(params: FilterParams<T>) =>
  filterByFunc<T>(params, (field) => {
    if ('type' in field && FormGroupTypes.includes(field.type)) {
      return params.formReadOnly && 'isVisibleReadonly' in field && field.isVisibleReadonly
        ? !field.isVisibleReadonly(params.data, { formReadOnly: params.formReadOnly })
        : 'isVisible' in field && field.isVisible
          ? !field.isVisible(params.data, { formReadOnly: params.formReadOnly })
          : true
    } else if ('type' in field && field.type === FormFieldType.FormSection) {
      return true
    } else {
      return params.formReadOnly && 'isVisibleReadonly' in field && field.isVisibleReadonly
        ? !field.isVisibleReadonly(params.data, { formReadOnly: params.formReadOnly })
        : 'isVisible' in field && field.isVisible
          ? !field.isVisible(params.data, { formReadOnly: params.formReadOnly })
          : false
    }
  })
