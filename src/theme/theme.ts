import * as React from 'react'
import { CSSProperties as sc_CSSProperties } from 'styled-components'
import { keys } from '../util'

export type CSSProperties = sc_CSSProperties &
  Partial<{
    ':hover': CSSProperties
    ':focus': CSSProperties
    ':disabled': CSSProperties
    ':readonly': CSSProperties
    '@media-mobile': CSSProperties
    '@animation': string
  }>

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
  staticChecklist: {
    wrapper: CSSProperties
    title: CSSProperties
    description: CSSProperties
    listsWrapper: CSSProperties
    list: CSSProperties
    item: CSSProperties
    itemLabel: CSSProperties
    itemIcon: CSSProperties
    iconAllowed: CSSProperties
    iconDisallowed: CSSProperties
    itemsList: CSSProperties
  }
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
    disabledInput: CSSProperties
    disabledWrapper: CSSProperties
    errorHook: CSSProperties
    errorInput: CSSProperties
    errorWrapper: CSSProperties
    hook: CSSProperties
    input: CSSProperties
    prefix: CSSProperties
    readOnlyHook: CSSProperties
    readOnlyInput: CSSProperties
    readOnlyWrapper: CSSProperties
    wrapper: CSSProperties
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
    descriptionIcon: CSSProperties
    descriptionPopup: CSSProperties
    descriptionText: CSSProperties
    errorIcon: CSSProperties
    errorLabel: CSSProperties
    labelText: CSSProperties
    labelTextError: CSSProperties
    labelTextWrapper: CSSProperties
    sublabelText: CSSProperties
    wrapper: CSSProperties
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
    errorHook: CSSProperties
    errorWrapper: CSSProperties
    hook1: CSSProperties
    hook2: CSSProperties
    iconWrapper: CSSProperties
    wrapper: CSSProperties
    reactDatePicker?: string
  }
  popoverDropdown: {
    button: CSSProperties
    label: CSSProperties
    icon: CSSProperties
  }
  popoverWithItems: {
    popover: CSSProperties
    wrapper: CSSProperties
    item: CSSProperties
    itemLabel: CSSProperties
  }
}

const defaultAppTheme: AppTheme = {
  staticChecklist: {
    wrapper: {},
    title: {},
    description: {},
    listsWrapper: {},
    list: {},
    item: {},
    itemLabel: {},
    itemIcon: {},
    iconAllowed: {},
    iconDisallowed: {},
    itemsList: {},
  },
  popoverDropdown: {
    button: {},
    label: {},
    icon: {},
  },
  popoverWithItems: {
    itemLabel: {},
    popover: {},
    wrapper: {},
    item: {},
  },
  datePicker: {
    errorHook: {},
    errorWrapper: {},
    hook1: {},
    hook2: {},
    iconWrapper: {},
    reactDatePicker: '',
    wrapper: {},
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
    disabledInput: {},
    disabledWrapper: {},
    errorHook: {},
    errorInput: {},
    errorWrapper: {},
    hook: {},
    input: {},
    prefix: {},
    readOnlyHook: {},
    readOnlyInput: {},
    readOnlyWrapper: {},
    wrapper: {},
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
    descriptionIcon: {},
    descriptionPopup: {},
    descriptionText: {},
    errorIcon: {},
    errorLabel: {},
    labelText: {},
    labelTextError: {},
    labelTextWrapper: {},
    sublabelText: {},
    wrapper: {},
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

export const createThemeConfigure = <Theme extends GenericThemeConfig, R>(
  defaultTheme: Theme,
) => (userTheme: Theme) =>
  keys(defaultTheme).reduce(
    (components, componentKey) => ({
      ...components,
      [componentKey]: keys(defaultTheme[componentKey]).reduce(
        (componentStyles, styleKey) => {
          const isCSSStyles =
            typeof defaultTheme[componentKey][styleKey] === 'string'

          const userThemeVal =
            userTheme[componentKey]?.[styleKey] || (isCSSStyles && '') || {}

          return {
            ...componentStyles,
            [styleKey]: isCSSStyles
              ? userThemeVal
              : {
                  ...defaultTheme[componentKey][styleKey],
                  ...userThemeVal,
                },
          }
        },
        {},
      ),
    }),
    {},
  ) as R

export const configureAppTheme = createThemeConfigure<AppThemeConfig, AppTheme>(
  defaultAppTheme,
)
