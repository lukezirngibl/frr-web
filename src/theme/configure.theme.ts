import { CSSProperties as sc_CSSProperties } from 'styled-components'

export type CSSProperties = sc_CSSProperties &
  Partial<{
    ':active': CSSProperties
    ':after': CSSProperties
    ':before': CSSProperties
    ':disabled': CSSProperties
    ':first-child': CSSProperties
    ':focus': CSSProperties
    ':focus:before': CSSProperties
    ':hover': CSSProperties
    ':last-child': CSSProperties
    ':readonly': CSSProperties
    ':placeholder': CSSProperties
    '@media-mobile': CSSProperties
    '@animation': string
    '@icon': CSSProperties
  }>

export enum MediaQuery {
  Mobile = '(max-width: 768px)',
  Small = '(max-width: 840px)',
}

type GenericThemeConfig = Record<string, Record<string, any>>

export const createThemeConfigure =
  <Theme extends GenericThemeConfig, R>(defaultTheme: Theme) =>
  (userTheme: Theme) =>
    Object.keys(defaultTheme).reduce(
      (components, componentKey) => ({
        ...components,
        [componentKey]: Object.keys(defaultTheme[componentKey]).reduce((componentStyles, styleKey) => {
          const isCSSStyles = typeof defaultTheme[componentKey][styleKey] === 'string'

          const userThemeVal = userTheme[componentKey]?.[styleKey] || (isCSSStyles && '') || {}

          return {
            ...componentStyles,
            [styleKey]: isCSSStyles
              ? userThemeVal
              : {
                  ...defaultTheme[componentKey][styleKey],
                  ...userThemeVal,
                },
          }
        }, {}),
      }),
      {},
    ) as R
