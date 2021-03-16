export const keys = <A extends Record<string, unknown>, K extends keyof A>(
  x: A,
): Array<K> => Object.keys(x) as Array<K>

export type Options<T> = Array<{
  label?: string
  name?: string
  value: T
  disabled?: boolean
  translationKey?: string
}>

export const processOptions = (
  raw: Array<{ label?: string; name?: string; value: string | number }>,
  translate: (s: string) => string,
): Array<{ text: string; value: string | number }> =>
  raw.map((o) => ({
    text:
      o.label !== undefined
        ? typeof o.label === 'string'
          ? translate(o.label)
          : `${o.label}`
        : o.name || 'Unknown',
    value: o.value,
  }))
