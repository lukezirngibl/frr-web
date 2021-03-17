import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-GB'
import fr from 'date-fns/locale/fr'
import it from 'date-fns/locale/it'
import * as React from 'react'

export enum Language {
  EN = 'en',
  DE = 'de',
  FR = 'fr',
  IT = 'it',
}

export const mapLanguageToLocaleString: { [k in Language]: string } = {
  [Language.DE]: 'de',
  [Language.EN]: 'en-GB',
  [Language.FR]: 'fr',
  [Language.IT]: 'it',
}

export const mapLanguageToLocaleFormat: { [k in Language]: string } = {
  [Language.DE]: 'DD.MM.YYYY',
  [Language.EN]: 'MM/DD/YYYY',
  [Language.FR]: 'DD.MM.YYYY',
  [Language.IT]: 'DD.MM.YYYY',
}

export const mapLanguageToLocale: { [k in Language]: Locale } = {
  [Language.DE]: de,
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.IT]: it,
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
