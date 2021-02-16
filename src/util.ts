import { COUNTRIES_EN } from './assets/countries-en'
import { COUNTRIES_FR } from './assets/countries-fr'
import { COUNTRIES_IT } from './assets/countries-it'
import { COUNTRIES_DE } from './assets/countries-de'

export enum Language {
  EN = 'en',
  DE = 'de',
  FR = 'fr',
  IT = 'it',
}

export const keys = <A extends Record<string, unknown>, K extends keyof A>(
  x: A,
): Array<K> => Object.keys(x) as Array<K>

export const getCountryOptions: Record<
  Language,
  Array<{ name: string; value: string }>
> = {
  [Language.EN]: COUNTRIES_EN.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
  [Language.IT]: COUNTRIES_IT.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
  [Language.FR]: COUNTRIES_FR.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
  [Language.DE]: COUNTRIES_DE.map(c => ({
    name: c.name,
    value: c['alpha3'].toUpperCase(),
  })),
}

export type Options<T> = Array<{
  label?: string
  name?: string
  value: T
  disabled?: boolean
}>

export const processOptions = (
  raw: Array<{ label?: string; name?: string; value: string | number }>,
  translate: (s: string) => string,
) =>
  raw.map(o => ({
    text:
      o.label !== undefined
        ? typeof o.label === 'string'
          ? translate(o.label)
          : `${o.label}`
        : o.name || 'Unknown',
    value: o.value,
  }))
