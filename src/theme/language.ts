import * as React from 'react'

export enum Language {
  EN = 'en',
  DE = 'de',
  FR = 'fr',
  IT = 'it',
}

export type Translations = Record<string, { [k in Language]: string }>

export const useLanguage = (): Language => {
  const language = React.useContext(LanguageContext)
  return language
}

export const LanguageContext = React.createContext<Language>(Language.EN)

export const useTranslate = (language: Language): ((key: string) => string) => {
  const translations = React.useContext(TranslationsContext)

  const translate = (key: string) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language]
    }
    return `${key}`
  }

  return translate
}

export const TranslationsContext = React.createContext<Translations>({})
