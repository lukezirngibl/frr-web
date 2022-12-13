import * as React from 'react'
import { CSSProperties, createThemeConfigure } from './configure.theme'
import { getUseCSSStyles, getUseInlineStyle } from './util'

export type FormTheme = {
  row: {
    wrapper: CSSProperties
    item: CSSProperties
  }
  group: {
    title: CSSProperties
    wrapper: CSSProperties
    descriptionList: CSSProperties
    descriptionItem: CSSProperties
    descriptionText: CSSProperties
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
    contentCardWrapper: CSSProperties
    description: CSSProperties
    emptyTitleWrapperMobile: CSSProperties
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

export type FormThemeConfig = { [k in keyof FormTheme]?: Partial<FormTheme[k]> }

export const defaultFormTheme: FormTheme = {
  section: {
    content: {},
    contentWrapper: {},
    contentCardWrapper: {},
    description: {},
    emptyTitleWrapperMobile: {},
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
    descriptionList: {},
    descriptionItem: {},
    descriptionText: {},
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

// React Contect

export const FormThemeContext = React.createContext<FormTheme>(undefined as FormTheme)

FormThemeContext.displayName = 'FormThemeContext'

export const configureFormTheme = createThemeConfigure<FormThemeConfig, FormTheme>(defaultFormTheme)

// Hooks

export const useFormTheme = (): FormTheme => {
  const theme = React.useContext(FormThemeContext)
  if (!theme) {
    throw new Error(`FormTheme not found`)
  }
  return theme
}

export const useInlineStyle: <C extends keyof FormTheme>(
  theme: FormTheme,
  componentKey: C,
) => (override?: Partial<FormTheme[C]>) => <K extends keyof FormTheme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
  className?: string,
) => {
  style: FormTheme[C][K]
  dataThemeId: string
} = getUseInlineStyle<FormTheme>()

export const useCSSStyles: <C extends keyof FormTheme>(
  theme: FormTheme,
  componentKey: C,
) => (
  override?: Partial<FormTheme[C]>,
) => <K extends keyof FormTheme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
) => { cssStyles: string; dataThemeId: string } = getUseCSSStyles<FormTheme>()
