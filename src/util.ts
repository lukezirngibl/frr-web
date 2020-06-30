import { Translations } from './theme/language'

export const keys = <A extends Record<string, unknown>, K extends keyof A>(
  x: A,
): Array<K> => Object.keys(x) as Array<K>

export type TranslationGeneric = Translations | Omit<symbol, 'description'>
