// @ts-ignore
import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { configureFormTheme, FormThemeContext } from '../src/theme/theme.form'
import { configureBaseStyle } from '../src/theme/configureBaseStyle'
import { ComponentThemeContext, configureComponentTheme } from '../src/theme/theme.components'
import { brand } from './theme/bob/bob.brand'

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
          <Component {...props} />
        </FormThemeContext.Provider>
      </ComponentThemeContext.Provider>
      //   </LanguageContext.Provider>
      // </TranslationsContext.Provider>
    )
  }
