import * as React from 'react'
import { CSSProperties, CSSProp } from 'styled-components'
import { keys } from '../util'

export type Theme = {
  button: {
    chromeless: CSSProperties
    primary: CSSProperties
    secondary: CSSProperties
    common: CSSProperties
    spinner: CSSProperties
  }
  form: {
    label: CSSProperties
    groupTitle: CSSProperties
    sectionTitle: CSSProperties
    wrapper: CSSProperties
  }
  dropdown: {
    wrapper: CSSProperties
  }
  codeInput: {
    wrapper: CSSProperties
    input: CSSProperties
  }
}

const defaultTheme: Theme = {
  button: {
    chromeless: {},
    primary: {},
    secondary: {},
    common: {},
    spinner: {},
  },
  codeInput: {
    wrapper: {},
    input: {},
  },
  form: {
    label: {},
    groupTitle: {},
    sectionTitle: {},
    wrapper: {},
  },
  dropdown: {
    wrapper: {},
  },
}

export type AppTheme = { [k in keyof Theme]?: Partial<Theme[k]> }

let ThemeVal = defaultTheme
let ThemeContext = React.createContext(defaultTheme)

export const configureTheme = (userTheme: AppTheme) => {
  ThemeVal = keys(defaultTheme).reduce(
    (acc1, k1) => ({
      ...acc1,
      [k1]: keys(defaultTheme[k1]).reduce(
        (acc2, k2) => ({
          ...acc2,
          [k2]: {
            ...((defaultTheme[k1][k2] as unknown) as any),
            ...(userTheme[k1] && ((userTheme[k1] as unknown) as any)[k2]
              ? ((userTheme[k1] as unknown) as any)[k2]
              : {}),
          },
        }),
        {},
      ),
    }),
    {},
  ) as Theme

  ThemeContext = React.createContext(ThemeVal)

  return ThemeContext
}

export const getThemeContext = () => ThemeContext
export const getTheme = () => ThemeVal
