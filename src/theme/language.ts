import * as React from 'react'

export enum Language {
  EN = 'en',
  DE = 'de',
  FR = 'fr',
  IT = 'it',
}

export type Translations = Record<string, { [k in Language]: string }>

let translations: Translations = {}
let language: Language = Language.EN
let context = React.createContext(Language.EN)

export const configureLanguage = (t: Translations, l?: Language) => {
  translations = t
  language = l || Language.EN
  context = React.createContext(language)
  return context
}

export const getLanguageContext = () => context
export const getLanguage = () => language
export const getTranslation = (l: Language) => (k: any) => {
  if (translations[k] && translations[k][l]) {
    return translations[k][l]
  }
  if (!isNaN(Number(k))) {
    return `${k}`
  }
  return k
}
