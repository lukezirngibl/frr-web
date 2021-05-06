import { Options } from './html'
import { Translate } from './translation'

export const keys = <A extends Record<string, unknown>, K extends keyof A>(
  x: A,
): Array<K> => Object.keys(x) as Array<K>

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
