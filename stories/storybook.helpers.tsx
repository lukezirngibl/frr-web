// @ts-ignore
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { configureFormTheme, FormThemeContext } from '../src/theme/theme.form'
import { configureBaseStyle } from '../src/theme/configureBaseStyle'
import { ComponentThemeContext, configureComponentTheme } from '../src/theme/theme.components'
import { brand } from './theme/bob/bob.brand'
import { FormConfigContext } from '../src/form/form.hooks'

// -----------------------------------
// Create story with theme and styles
// -----------------------------------

export const meta = <P extends {}, T extends (props: P) => JSX.Element>(config: {
  title: string
  component: T
}) => config as ComponentMeta<T>

export const createStory =
  <P extends {}, T extends (props: P) => JSX.Element>(C: T) =>
  (props: P) => {
    const BaseStyle = configureBaseStyle({
      baseStyle: brand.baseStyle,
      brandBaseStyle: brand.baseStyle,
      isStyleConfigActive: true,
      styleConfig: brand.styleConfig,
    })

    const Component = C as any

    return (
      // <TranslationsContext.Provider value={translations}>
      //   <LanguageContext.Provider value={Language.EN}>
      <ComponentThemeContext.Provider value={configureComponentTheme(brand.componentTheme)}>
        <BaseStyle />
        <FormThemeContext.Provider value={configureFormTheme(brand.formTheme)}>
          <FormConfigContext.Provider value={{ disableDirtyValidation: false }}>
            <Component {...props} />
          </FormConfigContext.Provider>
        </FormThemeContext.Provider>
      </ComponentThemeContext.Provider>
      //   </LanguageContext.Provider>
      // </TranslationsContext.Provider>
    )
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
