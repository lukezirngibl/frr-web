import * as React from 'react'
import { CSSProperties as sc_CSSProperties } from 'styled-components'
import { keys, Language } from '../util'

export type CSSProperties = sc_CSSProperties & {
  ':hover'?: CSSProperties
  ':focus'?: CSSProperties
  ':disabled'?: CSSProperties
  ':readonly'?: CSSProperties
  '@media-mobile'?: CSSProperties
  '@animation'?: string
}

export type MaterialSliderStyles = {
  active?: CSSProperties
  root?: CSSProperties
  rail?: CSSProperties
  mark?: CSSProperties
  markActive?: CSSProperties
  markLabel?: CSSProperties
  valueLabel?: CSSProperties
  thumb?: CSSProperties
  track?: CSSProperties
}

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
    valueWrapper: CSSProperties
    prefix: CSSProperties
    value: CSSProperties
  }
  materialSlider: MaterialSliderStyles
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
    label: CSSProperties
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
    iconWrapper: CSSProperties
    hook1: CSSProperties
    hook2: CSSProperties
  }
}

const defaultAppTheme: AppTheme = {
  datePicker: {
    wrapper: {},
    iconWrapper: {},
    hook1: {},
    hook2: {},
  },
  slider: {
    wrapper: {},
    valueWrapper: {},
    prefix: {},
    value: {},
  },
  materialSlider: {
    active: {},
    root: {},
    rail: {},
    mark: {},
    markActive: {},
    markLabel: {},
    valueLabel: {},
    thumb: {},
    track: {},
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
    label: {},
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

export const useAppTheme = (): AppTheme => {
  const theme = React.useContext(AppThemeContext)
  if (!theme) {
    throw new Error(`AppTheme not found`)
  }
  return theme
}

export const AppThemeContext = React.createContext<AppTheme>(
  undefined as AppTheme,
)

AppThemeContext.displayName = 'AppThemeContext'

export enum MediaQuery {
  Mobile = '(max-width: 768px)',
}

type GenericThemeConfig = Record<string, Record<string, any>>

export const createThemeConfigure = <T extends GenericThemeConfig, R>(
  defaultTheme: T,
) => (userTheme: T) =>
  keys(defaultTheme).reduce(
    (acc1, k1) => ({
      ...acc1,
      [k1]: keys(defaultTheme[k1]).reduce((acc2, k2) => {
        const userThemeVal =
          (userTheme[k1] && ((userTheme[k1] as unknown) as any)[k2]) || {}

        return {
          ...acc2,
          [k2]: {
            ...((defaultTheme[k1][k2] as unknown) as any),
            ...userThemeVal,
          },
        }
      }, {}),
    }),
    {},
  ) as R

export const configureAppTheme = createThemeConfigure<AppThemeConfig, AppTheme>(
  defaultAppTheme,
)
