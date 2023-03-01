import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './static/locale/en.json'
import React, { useState } from 'react'
import { format as formatDate, isValid as isDateValid } from 'date-fns'
import { configureBaseStyle } from '../src/theme/configureBaseStyle'
import { resetStyleConfig } from '../stories/theme/resetStyleConfig'
import { brand as bobBrand } from '../stories/theme/bob/storybook.bob.brand'
import { brand as postFinanceBrand } from '../stories/theme/orca/storybook.orca.brand'
import { bobBplStyleConfig, defaultStyleConfig } from '../stories/theme/styleConfig'
import { ComponentThemeContext, configureComponentTheme } from '../src/theme/theme.components'
import { configureFormTheme, FormThemeContext } from '../src/theme/theme.form'
import { FormConfigContext } from '../src/form/components/form.hooks'

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

const Brand = {
  BOB_BPL: 'bob pay later (BPL)',
  BOB: 'bob (default)',
  POST_FINANCE: 'postFinance',
}

const Brands = {
  [Brand.BOB_BPL]: bobBrand,
  [Brand.BOB]: bobBrand,
  [Brand.POST_FINANCE]: postFinanceBrand,
}

export default {
  decorators: [
    (Component) => {
      const [brand, setBrand] = useState(Brand.BOB_BPL)

      const brandTheme = Brands[brand]

      const BaseStyle = configureBaseStyle({
        baseStyle: `
${resetStyleConfig}
${brandTheme.baseStyle}
`,
        brandBaseStyle: brandTheme.baseStyle,
        isStyleConfigActive: true,
        styleConfig: brand === Brand.BOB_BPL ? bobBplStyleConfig : defaultStyleConfig,
      })

      return (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
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
              onChange={(event) => setBrand(event.target.value)}
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
              <option value={Brand.BOB_BPL} label="Bob pay later (BPL)"></option>
              <option value={Brand.BOB} label="Bob default"></option>
              <option value={Brand.POST_FINANCE} label="PostFinance"></option>
            </select>
          </div>
          <ComponentThemeContext.Provider value={configureComponentTheme(brandTheme.componentTheme)}>
            <BaseStyle />
            <FormThemeContext.Provider value={configureFormTheme(brandTheme.formTheme)}>
              <FormConfigContext.Provider value={{ disableDirtyValidation: false }}>
                <Component />
              </FormConfigContext.Provider>
            </FormThemeContext.Provider>
          </ComponentThemeContext.Provider>
        </div>
      )
    },
  ],
}
