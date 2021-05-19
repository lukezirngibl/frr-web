import * as React from 'react'
import { CSSProperties, createThemeConfigure } from '../../theme/theme'

export type FormTheme = {
  row: {
    wrapper: CSSProperties
    item: CSSProperties
  }
  group: {
    title: CSSProperties
    wrapper: CSSProperties
    description: CSSProperties
  }
  staticField: {
    wrapper: CSSProperties
    title: CSSProperties
    text: CSSProperties
    button: CSSProperties
  }
  section: {
    description: CSSProperties
    introduction: CSSProperties
    title: CSSProperties
    wrapper: CSSProperties
    contentWrapper: CSSProperties
    content: CSSProperties
  }
  sectionRight: {
    wrapper: CSSProperties
    editLink: CSSProperties
    editIcon: CSSProperties
  }
  form: {
    wrapper: CSSProperties
    content: CSSProperties
    buttonContainer: CSSProperties
  }
  fieldMultiInput: {
    wrapper: CSSProperties
    item: CSSProperties
  }
  fieldReadOnly: {
    wrapper: CSSProperties
    item: CSSProperties
    value: CSSProperties
    valueHighlighted: CSSProperties
    image: CSSProperties
    label: CSSProperties
  }
}

export const defaultFormTheme: FormTheme = {
  section: {
    description: {},
    introduction: {},
    title: {},
    wrapper: {},
    contentWrapper: {},
    content: {},
  },
  staticField: {
    wrapper: {},
    title: {},
    text: {},
    button: {},
  },
  sectionRight: {
    wrapper: {},
    editIcon: {},
    editLink: {},
  },
  row: {
    wrapper: {},
    item: {},
  },
  group: {
    title: {},
    wrapper: {},
    description: {},
  },
  form: {
    wrapper: {},
    content: {},
    buttonContainer: {},
  },
  fieldMultiInput: {
    wrapper: {},
    item: {},
  },
  fieldReadOnly: {
    wrapper: {},
    item: {},
    value: {},
    valueHighlighted: {},
    image: {},
    label: {},
  },
}

export type FormThemeConfig = { [k in keyof FormTheme]?: Partial<FormTheme[k]> }

export const useFormTheme = (): FormTheme => {
  const theme = React.useContext(FormThemeContext)
  if (!theme) {
    throw new Error(`FormTheme not found`)
  }
  return theme
}

export const FormThemeContext = React.createContext<FormTheme>(undefined as FormTheme)

FormThemeContext.displayName = 'FormThemeContext'

export const configureFormTheme = createThemeConfigure<FormThemeConfig, FormTheme>(defaultFormTheme)
