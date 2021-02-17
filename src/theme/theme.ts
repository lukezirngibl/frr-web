import * as React from 'react'
import { CSSProperties, CSSProp } from 'styled-components'
import { keys } from '../util'

export type AppTheme = {
  html: {
    p: CSSProperties
    h1: CSSProperties
    h2: CSSProperties
    h3: CSSProperties
    h4: CSSProperties
    h5: CSSProperties
    h6: CSSProperties
    button: CSSProperties
    li: CSSProperties
    option: CSSProperties
  }
  textInput: {
    wrapper: CSSProperties
    input: CSSProperties
    disabledInput: CSSProperties
    disabledWrapper: CSSProperties
    readOnlyWrapper: CSSProperties
    readOnlyInput: CSSProperties
    hook: CSSProperties
    readOnlyHook: CSSProperties
    errorInput: CSSProperties
    errorHook: CSSProperties
    errorWrapper: CSSProperties
    prefix: CSSProperties
  }
  slider: {
    wrapper: CSSProperties
    rail: CSSProperties
    marks: CSSProperties
    valueWrapper: CSSProperties
    prefix: CSSProperties
    value: CSSProperties
  }
  select: {
    option: CSSProperties
    wrapper: CSSProperties
    errorWrapper: CSSProperties
    icon: CSSProperties
    select: CSSProperties
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
  optionGroup: {
    wrapper: CSSProperties
    item: CSSProperties
    itemActive: CSSProperties
    label: CSSProperties
    labelActive: CSSProperties
    errorWrapper: CSSProperties
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
    errorLabel: CSSProperties
    labelTextError: CSSProperties
    errorIcon: CSSProperties
  }
  singleCheckbox: {
    wrapper: CSSProperties
    input: CSSProperties
  }
  radioGroup: {
    wrapper: CSSProperties
    label: CSSProperties
    item: CSSProperties
    radioOuter: CSSProperties
    radioOuterActive: CSSProperties
    radioInner: CSSProperties
    radioInnerActive: CSSProperties
    radioOuterError: CSSProperties
    errorWrapper: CSSProperties
  }
  toggle: {
    wrapper: CSSProperties
    wrapperActive: CSSProperties
    circle: CSSProperties
    circleActive: CSSProperties
  }
  datePicker: {
    wrapper: CSSProperties
  }
}

const defaultTheme: AppTheme = {
  datePicker: {
    wrapper: {},
  },
  slider: {
    wrapper: {},
    rail: {},
    marks: {},
    valueWrapper: {},
    prefix: {},
    value: {},
  },
  html: {
    p: {},
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    button: {},
    li: {},
    option: {},
  },
  toggle: {
    wrapper: {},
    wrapperActive: {},
    circle: {},
    circleActive: {},
  },
  radioGroup: {
    wrapper: {},
    label: {},
    item: {},
    radioOuter: {},
    radioOuterActive: {},
    radioInner: {},
    radioInnerActive: {},
    radioOuterError: {},
    errorWrapper: {},
  },
  singleCheckbox: {
    wrapper: {},
    input: {},
  },
  select: {
    option: {},
    wrapper: {},
    errorWrapper: {},
    icon: {},
    select: {},
  },
  textInput: {
    errorInput: {},
    errorHook: {},
    wrapper: {},
    input: {},
    disabledInput: {},
    disabledWrapper: {},
    readOnlyWrapper: {},
    readOnlyInput: {},
    hook: {},
    readOnlyHook: {},
    errorWrapper: {},
    prefix: {},
  },
  textArea: {
    wrapper: {},
    input: {},
    disabled: {},
  },
  optionGroup: {
    wrapper: {},
    item: {},
    itemActive: {},
    label: {},
    labelActive: {},
    errorWrapper: {},
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
    labelTextError: {},
    errorLabel: {},
    wrapper: {},
    labelTextWrapper: {},
    labelText: {},
    descriptionText: {},
    sublabelText: {},
    descriptionPopup: {},
    descriptionIcon: {},
    errorIcon: {},
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
