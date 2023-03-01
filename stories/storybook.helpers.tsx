// @ts-ignore
import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { configureFormTheme, FormThemeContext } from '../src/theme/theme.form'
import { configureBaseStyle } from '../src/theme/configureBaseStyle'
import { ComponentThemeContext, configureComponentTheme } from '../src/theme/theme.components'
import { brand as bobBrand } from './theme/bob/bobTheme.brand'
import { brand as postFinanceBrand } from './theme/orca/orca.brand'
import { FormConfigContext } from '../src/form/components/form.hooks'
import { bobStyleConfig } from './theme/bobStyleConfig'
import { resetStyleConfig } from './theme/resetStyleConfig'

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

export const meta = <P extends {}, T extends (props: P) => JSX.Element>(config: {
  title: string
  component: T
}) => config as unknown as Meta<T>

export const createStory =
  <P extends {}, T extends (props: P) => JSX.Element>(C: T) =>
  (props: P) => {
    const [brand, setBrand] = useState(BRAND.bob)
    const Component = C as any

    const brandTheme = Brands[brand]

    const BaseStyle = configureBaseStyle({
      baseStyle: `
${resetStyleConfig}
${brandTheme.baseStyle}
`,
      brandBaseStyle: brandTheme.baseStyle,
      isStyleConfigActive: true,
      styleConfig: bobStyleConfig,
    })

    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            padding: '8px 16px',
            marginBottom: 64,
            background: '#f2f2f2',
          }}
        >
          <label htmlFor="brand" style={{ color: '#b2b2b2' }}>
            Choose brand style:
          </label>
          <select
            name="brand"
            id="brand"
            onChange={(event) => setBrand(event.target.value as BRAND)}
            style={{
              fontWeight: 700,
              width: 200,
              marginLeft: 16,
              padding: '4px 16px',
              border: '1px solid #e2e2e2',
              borderRadius: 4,
            }}
            value={brand}
          >
            <option value={BRAND.bob} label="Bob"></option>
            <option value={BRAND.postFinance} label="PostFinance"></option>
          </select>
        </div>
        <ComponentThemeContext.Provider value={configureComponentTheme(brandTheme.appTheme)}>
          <BaseStyle />
          <FormThemeContext.Provider value={configureFormTheme(brandTheme.formTheme)}>
            <FormConfigContext.Provider value={{ disableDirtyValidation: false }}>
              <Component {...props} />
            </FormConfigContext.Provider>
          </FormThemeContext.Provider>
        </ComponentThemeContext.Provider>
      </div>
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
