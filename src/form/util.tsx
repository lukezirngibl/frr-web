import React from 'react'
import { Lens as MonocleLens } from 'monocle-ts'
import { Optional } from 'monocle-ts'
import { none, some } from 'fp-ts/lib/Option'
import { range } from 'fp-ts/lib/Array'
import {
  FormFieldRepeatGroup,
  FormFieldType,
  FormFieldGroup,
  FormFieldRepeatSection,
  FormSection,
} from './components/types'
import { Translate } from '../translation'

let scrolled = false

export const getScrolled = () => scrolled
export const setScrolled = (v: boolean) => {
  scrolled = v
}

export declare class FormLens<S, A> {
  readonly get: (s: S) => A
  readonly set: (a: A) => (s: S) => S
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
  <K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2]>(path: [K1, K2, K3]): FormLens<
    S,
    S[K1][K2][K3]
  >
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
        (s) => (s === undefined ? none : some(s)),
        (s) => (a) => s,
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
  arrayLens: FormLens<any, any>,
  index: number,
  lens: FormLens<any, any>,
): any => {
  const itemLens = createItemLens(arrayLens, index)
  return {
    id: () => `${arrayLens.id()}.${index}.${lens.id()}`,
    get: (data: any) => {
      const o: any = itemLens.getOption(data)
      const val = o.fold(null, (v) => lens.get(v))
      return val
    },
    set: (v: any) => (data: any) => {
      const o: any = arrayLens.get(data)
      const i: any = (itemLens.getOption(data) as any).getOrElse({})
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
      if (Array.isArray(repeatGroup)) {
        return <></>
      } else if (repeatGroup.type === FormFieldType.MultiInput) {
        return repeatGroup
      } else if (repeatGroup.type === FormFieldType.MultiInputAutocomplete) {
        return repeatGroup
      } else {
        return {
          ...repeatGroup,
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
          index,
          translate,
        })
      : `${index + 1}`
    return {
      type: FormFieldType.FormSection,
      title,
      isVisible: fieldRepeatSection.isVisible,
      editLabel: fieldRepeatSection.editLabel,
      onEdit: fieldRepeatSection.onEdit,
      fields: fieldRepeatSection.fields.map((repeatSectionField) => {
        if (Array.isArray(repeatSectionField)) {
          return <></>
        } else if (repeatSectionField.type === FormFieldType.MultiInput) {
          return repeatSectionField
        } else if (repeatSectionField.type === FormFieldType.MultiInputAutocomplete) {
          return repeatSectionField
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
