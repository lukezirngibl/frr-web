import lodashRange from 'lodash.range'
import { Options } from './html'
import { Translate } from './translation'

export const keys = <A extends Record<string, unknown>, K extends keyof A>(x: A): Array<K> =>
  Object.keys(x) as Array<K>

// @ts-ignore
export const processOptions = (
  raw: Options<string | number>,
  translate: Translate,
): Array<{ text: string; value: string | number }> =>
  raw.map((option) => ({
    text:
      option.label !== undefined
        ? typeof option.label === 'string' && !option.isLabelTranslated
          ? translate(option.label)
          : `${option.label}`
        : option.name || 'Unknown',
    value: option.value,
  }))

export const range = (start: number, end: number) => {
  return lodashRange(start, end + 1)
}

// https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2
export type Path<ObjectType extends {}> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${Path<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}
