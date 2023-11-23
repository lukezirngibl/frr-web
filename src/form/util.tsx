import React from 'react'
import { Lens as MonocleLens, Optional } from 'monocle-ts'
import {
  FormFieldRepeatGroup,
  FormFieldType,
  FormFieldGroup,
  FormFieldRepeatSection,
  FormSection,
} from './components/types'
import { Translate } from '../translation'
import { range } from '../util'

let scrolled = false

export const getScrolled = () => scrolled
export const setScrolled = (v: boolean) => {
  scrolled = v
}

// TODO: Get rid of monocle-ts and use own implementation
export declare class FormLens<S, A> extends MonocleLens<S, A> {
  readonly id: () => string
}

export interface LensFromPath<S> {
  <
    K1 extends keyof S,
    K2 extends keyof S[K1],
    K3 extends keyof S[K1][K2],
    K4 extends keyof S[K1][K2][K3],
    K5 extends keyof S[K1][K2][K3][K4],
  >(
    path: [K1, K2, K3, K4, K5],
  ): FormLens<S, S[K1][K2][K3][K4][K5]>
  <
    K1 extends keyof S,
    K2 extends keyof S[K1],
    K3 extends keyof S[K1][K2],
    K4 extends keyof S[K1][K2][K3],
  >(
    path: [K1, K2, K3, K4],
  ): FormLens<S, S[K1][K2][K3][K4]>
  <K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2]>(
    path: [K1, K2, K3],
  ): FormLens<S, S[K1][K2][K3]>
  <K1 extends keyof S, K2 extends keyof S[K1]>(path: [K1, K2]): FormLens<S, S[K1][K2]>
  <K1 extends keyof S>(path: [K1]): FormLens<S, S[K1]>
}

export const makeFormLens = <T extends {}>(): LensFromPath<T> => {
  return ((path: any) => {
    let lens = MonocleLens.fromPath<T>()(path)
    ;(lens as any).id = () => path.join('.')
    return lens
  }) as any
}

// -------- TOTAL HACK ---------
// -----------------------------
export const createItemLens = (arrayLens: any, index: number) =>
  arrayLens
    .compose(MonocleLens.fromPath<any>()([index]))
    .asOptional()
    .compose(
      new Optional<any, any>(
        (s) => (s === undefined ? null : s),
        (s) => (_) => s,
      ),
    )

export const updateArrayAtIndex = <T extends {}>(array: Array<T>, index: number, item: T): Array<T> => {
  let filled = array
  if (index > array.length - 1) {
    filled = [...array, ...range(array.length, index).map((i) => ({}))] as Array<T>
  }
  return [...filled.slice(0, index), item, ...filled.slice(index + 1)]
}

export const createFakeFormLens = (
  arrayLens: FormLens<unknown, unknown>,
  index: number,
  lens: FormLens<unknown, unknown>,
): unknown => {
  const itemLens = createItemLens(arrayLens, index)
  return {
    id: () => `${arrayLens.id()}.${index}.${lens.id()}`,
    get: (data: any) => {
      const o = itemLens.getOption(data)
      const val = o ? lens.get(o) : null
      return val
    },
    set: (v: any) => (data: any) => {
      const o: any = arrayLens.get(data)
      const i: any = itemLens.getOption(data) ?? {}
      const newArray = updateArrayAtIndex(o, index, lens.set(v)({ ...(i || {}) }))
      return arrayLens.set(newArray)(data)
    },
  }
}

export const processRepeatGroup = <FormData extends {}>(
  fieldRepeatGroup: FormFieldRepeatGroup<FormData>,
  data: FormData,
) => {
  const length = fieldRepeatGroup.length.get(data)
  return Array.from({
    length,
  }).map((_, index) => ({
    type: FormFieldType.FormFieldGroup,
    fields: fieldRepeatGroup.fields.map((repeatGroup) => {
      if (Array.isArray(repeatGroup)) return <></>

      if (repeatGroup.type === FormFieldType.FormFieldGroup) {
        return {
          ...repeatGroup,
          fields: repeatGroup.fields.map((field) => {
            if (Array.isArray(field)) return <></>
            return field
          }),
        }
      }

      const label = repeatGroup.label
        ? { ...repeatGroup.label, labelData: { index: `${index}` } }
        : undefined

      if (repeatGroup.type === FormFieldType.MultiInput) {
        return { ...repeatGroup, label }
      } else if (repeatGroup.type === FormFieldType.MultiInputAutosuggest) {
        return { ...repeatGroup, label }
      } else if (repeatGroup.type === FormFieldType.AutocompleteAddress) {
        return { ...repeatGroup, label }
      } else {
        return {
          ...repeatGroup,
          label,
          lens: createFakeFormLens(fieldRepeatGroup.lens, index, repeatGroup.lens),
        }
      }
    }),
  })) as Array<FormFieldGroup<FormData>>
}

export const processRepeatSection = <FormData extends {}>(
  fieldRepeatSection: FormFieldRepeatSection<FormData>,
  data: FormData,
  translate: Translate,
) => {
  const length = fieldRepeatSection.length.get(data)

  return Array.from({
    length,
  }).map((_, index) => {
    const title = fieldRepeatSection.title
      ? fieldRepeatSection.title({
          data,
          index,
          translate,
        })
      : `${index + 1}`

    const TitleCenterComponent = fieldRepeatSection.titleCenterComponent?.({
      data,
      index,
      onRemoveItem: (index, onChangeMulti) => {
        const list = fieldRepeatSection.lens.get(data)
        const newList =
          index < list.length - 1
            ? [...list.slice(0, index), ...list.slice(index + 1)]
            : list.slice(0, index)

        let formState = fieldRepeatSection.lens.set(newList)(data)
        formState = fieldRepeatSection.length.set(newList.length)(data)

        onChangeMulti([
          { lens: fieldRepeatSection.lens, value: newList },
          {
            lens: fieldRepeatSection.length,
            value: newList.length,
          },
        ])
      },
    })

    return {
      type: FormFieldType.FormSection,
      title,
      TitleCenterComponent,
      isVisible: fieldRepeatSection.isVisible,
      editLabel: fieldRepeatSection.editLabel,
      onEdit: fieldRepeatSection.onEdit,
      fields: fieldRepeatSection.fields.map((repeatSectionField) => {
        if (Array.isArray(repeatSectionField)) {
          return <></>
        } else if (repeatSectionField.type === FormFieldType.MultiInput) {
          return {
            ...repeatSectionField,
            fields: repeatSectionField.fields.map((field) => ({
              ...field,
              lens: createFakeFormLens(fieldRepeatSection.lens, index, field.lens),
              validate: field.validate
                ? (params: { value: any; data: FormData }) =>
                    field.validate(params.value, params.data, index)
                : undefined,
            })),
          }
        } else if (
          repeatSectionField.type === FormFieldType.MultiInputAutosuggest ||
          repeatSectionField.type === FormFieldType.AutocompleteAddress
        ) {
          return {
            ...repeatSectionField,
            fields: repeatSectionField.fields.map((field) => ({
              ...field,
              lens: createFakeFormLens(fieldRepeatSection.lens, index, field.lens),
              validate: field.validate
                ? (params: { value: any; data: FormData }) =>
                    field.validate(params.value, params.data, index)
                : undefined,
            })),
          }
        } else if (repeatSectionField.type === FormFieldType.FormFieldGroup) {
          return {
            ...repeatSectionField,
            fields: repeatSectionField.fields.map((field) => {
              if (Array.isArray(field)) return <></>
              if ('lens' in field) {
                return {
                  ...field,
                  lens: createFakeFormLens(fieldRepeatSection.lens, index, field.lens),
                }
              } else {
                return field
              }
            }),
          }
        } else {
          return {
            ...repeatSectionField,
            lens: createFakeFormLens(fieldRepeatSection.lens, index, repeatSectionField.lens),
          }
        }
      }),
    }
  }) as Array<FormSection<FormData>>
}
