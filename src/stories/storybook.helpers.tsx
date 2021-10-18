import React from 'react'
// @ts-ignore
import { ComponentMeta } from '@storybook/react'

import { AppThemeContext } from '../theme/theme'
import { appTheme } from './storybook.theme'

export const meta = <P extends {}, T extends (props: P) => JSX.Element>(config: {
  title: string
  component: T
}) => config as ComponentMeta<T>

export const createStory =
  <P extends {}, T extends (props: P) => JSX.Element>(C: T) =>
  (props: P) =>
  () => {
    const Component = C as any
    return (
      //   <TranslationsContext.Provider value={translations}>
      //     <LanguageContext.Provider value={Language.EN}>
      <AppThemeContext.Provider value={appTheme}>
        <Component {...props} />
      </AppThemeContext.Provider>
      //     </LanguageContext.Provider>
      //   </TranslationsContext.Provider>
    )
  }
