import { Language } from './theme/language'

export const Translations = {
  ' ': {
    [Language.EN]: ' ',
    [Language.DE]: ' ',
    [Language.IT]: ' ',
    [Language.FR]: ' ',
  },
  maxError: {
    [Language.EN]: 'Value exceeds maximum.',
    [Language.DE]: 'Der Wert überschreitet Maximum',
    [Language.IT]: 'Il valore supera il massimo',
    [Language.FR]: 'La valeur dépasse le maximum',
  },
  minError: {
    [Language.EN]: 'Value is below minimum.',
    [Language.DE]: 'Der Wert liegt unter dem Minimum',
    [Language.IT]: 'Il valore è inferiore al minimo',
    [Language.FR]: 'La valeur est inférieure au minimum',
  },
  day: {
    [Language.EN]: 'Day',
    [Language.DE]: 'Tag',
    [Language.IT]: 'Giorno',
    [Language.FR]: 'Journée',
  },
  month: {
    [Language.EN]: 'Month',
    [Language.DE]: 'Monat',
    [Language.IT]: 'Mese',
    [Language.FR]: 'Mois',
  },
  year: {
    [Language.EN]: 'Year',
    [Language.DE]: 'Jahr',
    [Language.IT]: 'Anno',
    [Language.FR]: 'Année',
  },
  January: {
    [Language.EN]: 'January',
    [Language.DE]: 'Januar',
    [Language.IT]: 'Gennaio',
    [Language.FR]: 'Janvier',
  },
  February: {
    [Language.EN]: 'February',
    [Language.DE]: 'Februar',
    [Language.IT]: 'Febbraio',
    [Language.FR]: 'Février',
  },
  March: {
    [Language.EN]: 'March',
    [Language.DE]: 'März',
    [Language.IT]: 'Marzo',
    [Language.FR]: 'Mars',
  },
  April: {
    [Language.EN]: 'April',
    [Language.DE]: 'April',
    [Language.IT]: 'Aprile',
    [Language.FR]: 'Avril',
  },
  May: {
    [Language.EN]: 'May',
    [Language.DE]: 'Mai',
    [Language.IT]: 'Maggio',
    [Language.FR]: 'Mai',
  },
  June: {
    [Language.EN]: 'June',
    [Language.DE]: 'Juni',
    [Language.IT]: 'Giugno',
    [Language.FR]: 'Juin',
  },
  July: {
    [Language.EN]: 'July',
    [Language.DE]: 'Juli',
    [Language.IT]: 'Luglio',
    [Language.FR]: 'Juillet',
  },
  August: {
    [Language.EN]: 'August',
    [Language.DE]: 'August',
    [Language.IT]: 'Agosto',
    [Language.FR]: 'Août',
  },
  September: {
    [Language.EN]: 'September',
    [Language.DE]: 'September',
    [Language.IT]: 'Settembre',
    [Language.FR]: 'Septembre',
  },
  October: {
    [Language.EN]: 'October',
    [Language.DE]: 'Oktober',
    [Language.IT]: 'Ottobre',
    [Language.FR]: 'Octobre',
  },
  November: {
    [Language.EN]: 'November',
    [Language.DE]: 'November',
    [Language.IT]: 'Novembre',
    [Language.FR]: 'Novembre',
  },
  December: {
    [Language.EN]: 'December',
    [Language.DE]: 'Dezember',
    [Language.IT]: 'Dicembre',
    [Language.FR]: 'Décembre',
  },
  yes: {
    [Language.EN]: 'Yes',
    [Language.DE]: 'Ja',
    [Language.IT]: 'Sì',
    [Language.FR]: 'Oui',
  },
  no: {
    [Language.EN]: 'No',
    [Language.DE]: 'Nein',
    [Language.IT]: 'Non',
    [Language.FR]: 'Non',
  },
} as const

export type CommonTM = typeof Translations
