import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-GB'
import fr from 'date-fns/locale/fr'
import it from 'date-fns/locale/it'

export enum Language {
  EN = 'en',
  DE_CH = 'de-CH',
  FR = 'fr',
  IT = 'it',
  DE = 'de', // deprecated
}

export const mapLanguageToLocaleString: { [k in Language]: string } = {
  [Language.DE_CH]: 'de',
  [Language.DE]: 'de',
  [Language.EN]: 'en-GB',
  [Language.FR]: 'fr',
  [Language.IT]: 'it',
}

export const mapLanguageToLocale: { [k in Language]: Locale } = {
  [Language.DE_CH]: de,
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.IT]: it,
  [Language.DE]: de,
}
