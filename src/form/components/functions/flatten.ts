import {
  FormFieldType,
  FormField,
  FormFieldGroup,
  FormSection,
  SectionFields,
  SingleFormField,
  FormSectionCard,
} from '../types'
import { processRepeatGroup, processRepeatSection } from '../../util'
import { fr } from 'date-fns/locale'

const processFormFieldGroup = <T>(g: FormFieldGroup<T>): Array<SingleFormField<T>> => {
  let acc: Array<SingleFormField<T>> = []
  for (let f of g.fields) {
    if (Array.isArray(f)) {
      acc = [...acc, ...f]
    } else if (f.type === FormFieldType.MultiInput) {
      acc = [...acc, ...f.fields]
    } else if (f.type === FormFieldType.MultiInputAutosuggest) {
      acc = [...acc, ...f.fields]
    } else if (f.type === FormFieldType.AutocompleteAddress) {
      acc = [...acc, ...f.firstRow.fields, ...(f.secondRow?.fields ?? [])]
    } else if (f.type === FormFieldType.Static) {
      acc = acc
    } else {
      acc = [...acc, f]
    }
  }

  return acc
}

const processFormSectionFields = <T>(fields: SectionFields<T>, data: T): Array<SingleFormField<T>> => {
  let acc: Array<SingleFormField<T>> = []
  for (let f of fields) {
    if (Array.isArray(f)) {
      acc = [...acc, ...f]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      acc = [...acc, ...processFormFieldGroup(f)]
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      acc = [...acc, ...groups.reduce((acc, g) => [...acc, ...processFormFieldGroup(g)], [])]
    } else if (f.type === FormFieldType.MultiInput) {
      acc = [...acc, ...f.fields]
    } else if (f.type === FormFieldType.MultiInputAutosuggest) {
      acc = [...acc, ...f.fields]
    } else if (f.type === FormFieldType.AutocompleteAddress) {
      acc = [...acc, ...f.firstRow.fields, ...(f.secondRow?.fields ?? [])]
    } else if (f.type === FormFieldType.Static) {
      acc = acc
    } else {
      acc = [...acc, f]
    }
  }
  return acc
}

const processFormSection = <T>(s: FormSection<T>, data: T): Array<SingleFormField<T>> =>
  processFormSectionFields(s.fields, data)
const processFormSectionCard = <T>(s: FormSectionCard<T>, data: T): Array<SingleFormField<T>> =>
  processFormSectionFields(s.fields, data)

export const flatten = <T>(formFields: Array<FormField<T>>, data: T): Array<SingleFormField<T>> => {
  let array: Array<SingleFormField<T>> = []
  for (let f of formFields) {
    if (Array.isArray(f)) {
      array = [...array, ...f]
    } else if (f.type === FormFieldType.FormFieldGroup) {
      array = [...array, ...processFormFieldGroup(f)]
    } else if (f.type === FormFieldType.FormSection) {
      array = [...array, ...processFormSection(f, data)]
    } else if (f.type === FormFieldType.FormSectionCard) {
      array = [...array, ...processFormSectionCard(f, data)]
    } else if (f.type === FormFieldType.MultiInput) {
      array = [...array, ...f.fields]
    } else if (f.type === FormFieldType.MultiInputAutosuggest) {
      array = [...array, ...f.fields]
    } else if (f.type === FormFieldType.AutocompleteAddress) {
      array = [...array, ...f.firstRow.fields, ...(f.secondRow?.fields ?? [])]
    } else if (f.type === FormFieldType.Static) {
      array = array
    } else if (f.type === FormFieldType.FormFieldRepeatGroup) {
      const groups = processRepeatGroup(f, data)
      array = [...array, ...groups.reduce((acc, g) => [...acc, ...processFormFieldGroup(g)], [])]
    } else if (f.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(f, data, (v) => v)
      array = [...array, ...sections.reduce((acc, s) => [...acc, ...processFormSection(s, data)], [])]
    } else {
      array = [...array, f]
    }
  }
  return array
}
