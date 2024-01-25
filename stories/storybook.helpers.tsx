import React from 'react'
import { StorybookTemplateProvider } from './storybook.TemplateProvider'
import { brand as bobBrand } from './theme/bob/storybook.bob.brand'
import { brand as postFinanceBrand } from './theme/orca/storybook.orca.brand'

enum BRAND {
  bob = 'bob',
  postFinance = 'postFinance',
}

const Brands = {
  [BRAND.bob]: bobBrand,
  [BRAND.postFinance]: postFinanceBrand,
}

// -----------------------------------
// Create story with theme and styles
// -----------------------------------

export const createStory = <P, T extends (props: P) => JSX.Element>(C: T) => {
  const Story = (props: P) => {
    const Component = C as any
    return <Component {...props} />
  }
  return Story
}

// -----------------------------------
// Validation helpers
// -----------------------------------

// At least one digit
export const ZIP_REGEXP = /(?=.*\d)/
export const SWISSZIP_REGEXP = /^(?:[1-9]\d{3})$/ /* /^\d{4}$/ */
export const LICHTENSTEIN_ZIP_LIST = [
  '9485',
  '9486',
  '9487',
  '9488',
  '9489',
  '9490',
  '9491',
  '9492',
  '9493',
  '9494',
  '9495',
  '9496',
  '9497',
  '9498',
]

export const validateSwissZip = (value: any) => {
  return !SWISSZIP_REGEXP.test(`${value}`) || LICHTENSTEIN_ZIP_LIST.includes(value)
    ? 'formFields.error.invalidZip'
    : null
}

export const CITY_REGEXP = /^[A-Za-zÀ-ž- '`.]+$/
export const validateCity = (value: string) =>
  !CITY_REGEXP.test(`${value}`) ? 'formFields.error.invalidText' : null

export const ADDRESS_REGEXP = /^[a-zA-Z0-9\s,'-]*$/
export const validateAddress = (value: string) =>
  !ADDRESS_REGEXP.test(`${value}`) ? 'formFields.error.invalidText' : null
