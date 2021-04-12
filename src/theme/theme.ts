import * as React from 'react'
import { CSSProperties as sc_CSSProperties } from 'styled-components'

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
  html: {
    a: CSSProperties
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
  button: {
    chromeless: CSSProperties
    primary: CSSProperties
    label: CSSProperties
    secondary: CSSProperties
    common: CSSProperties
    spinner: CSSProperties
  }
  label: {
    descriptionIcon: CSSProperties
    descriptionIconWrapper: CSSProperties
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
  textInputDescription: {
    wrapper: CSSProperties
    title: CSSProperties
    description: CSSProperties
  }
  textArea: {
    disabled: CSSProperties
    input: CSSProperties
    wrapper: CSSProperties
  }
  staticChecklist: {
    description: CSSProperties
    iconAllowed: CSSProperties
    iconDisallowed: CSSProperties
    item: CSSProperties
    itemIcon: CSSProperties
    itemLabel: CSSProperties
    itemsList: CSSProperties
    list: CSSProperties
    listsWrapper: CSSProperties
    title: CSSProperties
    wrapper: CSSProperties
  }
  slider: {
    label: CSSProperties
    prefix: CSSProperties
    value: CSSProperties
    valueWrapper: CSSProperties
    wrapper: CSSProperties
  }
  materialSlider: MaterialSliderStyles
  select: {
    option: CSSProperties
    wrapper: CSSProperties
    errorWrapper: CSSProperties
    icon: CSSProperties
    select: CSSProperties
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
  popoverDropdown: {
    button: CSSProperties
    burgerMenuButton: CSSProperties
    label: CSSProperties
    icon: CSSProperties
  }
  popoverWithItems: {
    popover: CSSProperties
    wrapper: CSSProperties
    item: CSSProperties
    itemLabel: CSSProperties
  }
  icon: {
    edit: {
      svg?: string
    }
    info: {
      svg?: string
    }
  }
  modal: {
    outerWrapper: CSSProperties
    innerWrapper: CSSProperties
  }
}

const defaultAppTheme: AppTheme = {
  modal: {
    outerWrapper: {},
    innerWrapper: {},
  },
  popoverDropdown: {
    button: {},
    burgerMenuButton: {},
    label: {},
    icon: {},
  },
  popoverWithItems: {
    itemLabel: {},
    popover: {},
    wrapper: {},
    item: {},
  },

  html: {
    a: {},
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
  button: {
    chromeless: {},
    primary: {},
    label: {},
    secondary: {},
    common: {},
    spinner: {},
  },
  label: {
    descriptionIcon: {},
    descriptionIconWrapper: {},
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
  textInputDescription: {
    wrapper: {},
    title: {},
    description: {},
  },
  textArea: {
    disabled: {},
    input: {},
    wrapper: {},
  },
  staticChecklist: {
    description: {},
    iconAllowed: {},
    iconDisallowed: {},
    item: {},
    itemIcon: {},
    itemLabel: {},
    itemsList: {},
    list: {},
    listsWrapper: {},
    title: {},
    wrapper: {},
  },
  slider: {
    label: {},
    prefix: {},
    value: {},
    valueWrapper: {},
    wrapper: {},
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
  select: {
    option: {},
    wrapper: {},
    errorWrapper: {},
    icon: {},
    select: {},
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
  dropdown: {
    wrapper: {},
  },
  optionGroup: {
    wrapper: {},
    item: {},
    itemActive: {},
    label: {},
    labelActive: {},
    errorWrapper: {},
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
  codeInput: {
    wrapper: {},
    input: {},
  },
  icon: {
    edit: {},
    info: {},
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
  Small = '(max-width: 840px)',
}

type GenericThemeConfig = Record<string, Record<string, any>>

export const createThemeConfigure = <Theme extends GenericThemeConfig, R>(
  defaultTheme: Theme,
) => (userTheme: Theme) =>
  Object.keys(defaultTheme).reduce(
    (components, componentKey) => ({
      ...components,
      [componentKey]: Object.keys(defaultTheme[componentKey]).reduce(
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
