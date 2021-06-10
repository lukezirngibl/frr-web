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
    content: CSSProperties
    contentWrapper: CSSProperties
    description: CSSProperties
    introduction: CSSProperties
    title: CSSProperties
    titleWrapper: CSSProperties
    wrapper: CSSProperties
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
    image: CSSProperties
    item: CSSProperties
    label: CSSProperties
    textAreaItem: CSSProperties
    textAreaValue: CSSProperties
    value: CSSProperties
    valueHighlighted: CSSProperties
    wrapper: CSSProperties
  }
}

export const defaultFormTheme: FormTheme = {
  section: {
    content: {},
    contentWrapper: {},
    description: {},
    introduction: {},
    title: {},
    titleWrapper: {},
    wrapper: {},
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
    image: {},
    item: {},
    label: {},
    textAreaItem: {},
    textAreaValue: {},
    value: {},
    valueHighlighted: {},
    wrapper: {},
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
