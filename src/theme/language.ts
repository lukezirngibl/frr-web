import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { SeverityLevel } from '@microsoft/applicationinsights-web'
import { captureMessage, Severity, withScope } from '@sentry/browser'
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

let TrackedMissingKeys = ['---', ':', 'dev', '']

export const useTranslate = (language: Language): ((key: string) => string) => {
  const translations = React.useContext(TranslationsContext)

  // For tracking of missing keys
  const appInsights = useAppInsightsContext()

  const translate = (key: string) => {
    let translatedText = `${key}`
    if (translations[key] && translations[key][language]) {
      translatedText = translations[key][language]
    } else if (isNaN(Number(key)) && !TrackedMissingKeys.includes(key)) {
      // TODO: Refactor out of frr-web library to remove dependency to tracking tools
      const exception = `MissingTranslationKey - ${language.toUpperCase()}: ${key}`
      console.log(exception)
      appInsights?.trackException({
        exception: new ReferenceError(exception),
        severityLevel: SeverityLevel.Warning,
      })
      withScope((scope) => {
        scope.setLevel(Severity.Warning)
        captureMessage(exception)
      })
      TrackedMissingKeys.push(key)
    }

    return translatedText
  }

  return translate
}

export const TranslationsContext = React.createContext<Translations>({})
