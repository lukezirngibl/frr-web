import React, { ReactNode, useEffect, useState } from 'react'
import { configureFormTheme, FormThemeContext } from '../src/theme/theme.form'
import { configureBaseStyle } from '../src/theme/configureBaseStyle'
import { ComponentThemeContext, configureComponentTheme } from '../src/theme/theme.components'
import { brand as bobBrand } from './theme/bob/storybook.bob.brand'
import { brand as postFinanceBrand } from './theme/orca/storybook.orca.brand'
import { FormConfigContext } from '../src/form/components/form.hooks'
import { defaultStyleConfig } from './theme/styleConfig'
import { resetStyleConfig } from './theme/resetStyleConfig'

enum BRAND {
  bob = 'bob',
  postFinance = 'postFinance',
}

const Brands = {
  [BRAND.bob]: bobBrand,
  [BRAND.postFinance]: postFinanceBrand,
}


export const StorybookTemplateProvider = (props: { children: ReactNode }) => {
  const [brand, setBrand] = useState(BRAND.bob)
  const brandTheme = Brands[brand]

  const baseStyle = `
${resetStyleConfig}
${brandTheme.baseStyle}
`

  const [BaseStyle, setBaseStyle] = useState<any>(null)
  useEffect(() => {
    setBaseStyle(
      configureBaseStyle({
        baseStyle,
        brandBaseStyle: brandTheme.baseStyle,
        isStyleConfigActive: true,
        styleConfig: defaultStyleConfig,
      }),
    )
  }, [brand])

  return BaseStyle === null ? null : (
    <div style={{ width: '100%' }}>
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
      <ComponentThemeContext.Provider value={configureComponentTheme(brandTheme.componentTheme)}>
        <BaseStyle />
        <FormThemeContext.Provider value={configureFormTheme(brandTheme.formTheme)}>
          <FormConfigContext.Provider value={{ disableDirtyValidation: false }}>
            {props.children}
          </FormConfigContext.Provider>
        </FormThemeContext.Provider>
      </ComponentThemeContext.Provider>
    </div>
  )
}
