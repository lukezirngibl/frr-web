import { processRepeatSection } from '../../util'
import { FormField, FormFieldRepeatGroup, FormFieldRepeatSection, FormFieldType } from '../types'
import { FilterParams } from './filter.form'

const filterRepeatGroup = <T>({
  data,
  formFields,
  translate,
}: FilterParams<T>): Array<FormFieldRepeatGroup<T>> =>
  formFields.reduce((groups: Array<FormFieldRepeatGroup<T>>, field: FormField<T>) => {
    if (Array.isArray(field)) {
      return groups
    } else if (
      field.type === FormFieldType.FormFieldRepeatGroup &&
      field.length.get(data) - field.lens.get(data).length !== 0
    ) {
      return [...groups, field]
    } else if (field.type === FormFieldType.FormSection) {
      return [...groups, ...filterRepeatGroup({ data, formFields: field.fields, translate })]
    } else if (field.type === FormFieldType.FormFieldRepeatSection) {
      const sections = processRepeatSection(field, data, translate)
      return [...groups, ...filterRepeatGroup({ data, formFields: sections, translate })]
    } else {
      return groups
    }
  }, [])

export const filterChangedRepeatFormFields = <T>({ data, formFields, translate }: FilterParams<T>) => {
  const repeatSections = formFields
    .filter(
      (field) =>
        'type' in field &&
        field.type === FormFieldType.FormFieldRepeatSection &&
        field.length.get(data) - field.lens.get(data).length !== 0,
    )
    .map((field: FormFieldRepeatSection<T>) => {
      const length = field.length.get(data) as number
      const list = field.lens.get(data) as Array<any>
      return {
        field,
        value: Array.from({
          length,
        }).map((_, index) => list[index]),
      }
    })

  const repeatGroups = filterRepeatGroup({ data, formFields, translate }).map((field) => {
    const length = field.length.get(data) as number
    const list = field.lens.get(data) as Array<any>
    return {
      field,
      value: Array.from({
        length,
      }).map((_, index) => list[index]),
    }
  })

  return [...repeatSections, ...repeatGroups]
}
