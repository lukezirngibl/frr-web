import React, { useEffect, useState } from 'react'
import { configureFormTheme, FormThemeContext } from '../src/theme/theme.form'
import { configureBaseStyle } from '../src/theme/configureBaseStyle'
import { ComponentThemeContext, configureComponentTheme } from '../src/theme/theme.components'
import { brand as bobBrand } from './theme/bob/bobTheme.brand'
import { brand as postFinanceBrand } from './theme/orca/orca.brand'
import { FormConfigContext } from '../src/form/components/form.hooks'
import { bobStyleConfig } from './theme/bobStyleConfig'
import { resetStyleConfig } from './theme/resetStyleConfig'
import { StorybookTemplateProvider } from './storybook.TemplateProvider'

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
    return (
      <StorybookTemplateProvider>
        <Component {...props} />
      </StorybookTemplateProvider>
    )
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
