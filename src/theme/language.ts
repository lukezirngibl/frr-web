import { Locale } from 'date-fns'
import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-GB'
import fr from 'date-fns/locale/fr'
import it from 'date-fns/locale/it'

// deprecated
export enum DeprecatedLanguage {
  EN = 'en',
  FR = 'fr',
  IT = 'it',
  DE = 'de',
}

export enum Language {
  EN = 'en',
  DE_CH = 'de-CH',
  FR = 'fr',
  IT = 'it',
}

export const mapLanguageToLocaleString: { [k in Language | DeprecatedLanguage]: string } = {
  [Language.DE_CH]: 'de',
  [DeprecatedLanguage.DE]: 'de',
  [Language.EN]: 'en-GB',
  [Language.FR]: 'fr',
  [Language.IT]: 'it',
}

export const mapLanguageToLocale: { [k in Language | DeprecatedLanguage]: Locale } = {
  [Language.DE_CH]: de,
  [DeprecatedLanguage.DE]: de,
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.IT]: it,
}
