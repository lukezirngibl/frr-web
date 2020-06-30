import { Language } from './theme/language'

export const Translations = {
  ' ': {
    [Language.EN]: ' ',
    [Language.DE]: ' ',
    [Language.IT]: ' ',
    [Language.FR]: ' ',
  },
  '': {
    [Language.EN]: '',
    [Language.DE]: '',
    [Language.IT]: ' ',
    [Language.FR]: ' ',
  },
  day: {
    [Language.EN]: 'Day',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  month: {
    [Language.EN]: 'Month',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  year: {
    [Language.EN]: 'Year',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  January: {
    [Language.EN]: 'January',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  February: {
    [Language.EN]: 'February',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  March: {
    [Language.EN]: 'March',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  April: {
    [Language.EN]: 'April',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  May: {
    [Language.EN]: 'May',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  June: {
    [Language.EN]: 'June',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  July: {
    [Language.EN]: 'July',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  August: {
    [Language.EN]: 'August',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  September: {
    [Language.EN]: 'September',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  October: {
    [Language.EN]: 'October',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  November: {
    [Language.EN]: 'November',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
  December: {
    [Language.EN]: 'December',
    [Language.DE]: '',
    [Language.IT]: '',
    [Language.FR]: '',
  },
} as const

export type CommonTM = typeof Translations
