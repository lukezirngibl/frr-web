import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-GB'
import fr from 'date-fns/locale/fr'
import it from 'date-fns/locale/it'

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

export const mapLanguageToLocale: { [k in Language]: Locale } = {
  [Language.DE]: de,
  [Language.EN]: en,
  [Language.FR]: fr,
  [Language.IT]: it,
}
