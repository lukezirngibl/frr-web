import * as React from 'react'
import { CSSProperties, CSSProp } from 'styled-components'
import { keys } from '../util'

export type AppTheme = {
  textInput: {
    wrapper: CSSProperties
    input: CSSProperties
    disabledInput: CSSProperties
    disabledWrapper: CSSProperties
    readOnlyWrapper: CSSProperties
    readOnlyInput: CSSProperties
    hook: CSSProperties
    readOnly: CSSProperties
  }
  select: {
    option: CSSProperties
    wrapper: CSSProperties
  }
  textArea: {
    wrapper: CSSProperties
    input: CSSProperties
    disabled: CSSProperties
  }
  button: {
    chromeless: CSSProperties
    primary: CSSProperties
    secondary: CSSProperties
    common: CSSProperties
    spinner: CSSProperties
  }
  dropdown: {
    wrapper: CSSProperties
  }
  yesNoToggle: {
    wrapper: CSSProperties
    item: CSSProperties
    label: CSSProperties
    active: CSSProperties
    activeFalse: CSSProperties
  }
  codeInput: {
    wrapper: CSSProperties
    input: CSSProperties
  }
  label: {
    wrapper: CSSProperties
    labelTextWrapper: CSSProperties
    labelText: CSSProperties
    descriptionText: CSSProperties
    sublabelText: CSSProperties
    descriptionPopup: CSSProperties
    descriptionIcon: CSSProperties
  }
  singleCheckbox: {
    wrapper: CSSProperties
    input: CSSProperties
  }
}

const defaultTheme: AppTheme = {
  singleCheckbox: {
    wrapper: {},
    input: {},
  },
  select: {
    option: {},
    wrapper: {},
  },
  textInput: {
    wrapper: {},
    input: {},
    disabledInput: {},
    disabledWrapper: {},
    readOnlyWrapper: {},
    readOnlyInput: {},
    hook: {},
    readOnly: {},
  },
  textArea: {
    wrapper: {},
    input: {},
    disabled: {},
  },
  yesNoToggle: {
    wrapper: {},
    item: {},
    label: {},
    active: {},
    activeFalse: {},
  },
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
  dropdown: {
    wrapper: {},
  },
  label: {
    wrapper: {},
    labelTextWrapper: {},
    labelText: {},
    descriptionText: {},
    sublabelText: {},
    descriptionPopup: {},
    descriptionIcon: {},
  },
}

export type AppThemeConfig = { [k in keyof AppTheme]?: Partial<AppTheme[k]> }

let ThemeVal = defaultTheme
let ThemeContext = React.createContext(defaultTheme)

export const configureTheme = (userTheme: AppThemeConfig) => {
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
  ) as AppTheme

  ThemeContext = React.createContext(ThemeVal)

  return ThemeContext
}

export const getThemeContext = () => ThemeContext
export const getTheme = () => ThemeVal
