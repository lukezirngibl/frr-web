import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './static/locale/en.json'
import { format as formatDate, isValid as isDateValid } from 'date-fns'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
    },

    debug: false,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss

      format: (value, format) => {
        let formattedValue = value

        if (format === 'Date') {
          formattedValue = isDateValid(value) ? formatDate(value, 'P') : ''
        } else if (format === 'Amount') {
          formattedValue = new Intl.NumberFormat('de-CH', {
            style: 'currency',
            currency: 'CHF',
            minimumIntegerDigits: 1,
          }).format(value.amount)
        }

        return formattedValue
      },
    },
  })

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
