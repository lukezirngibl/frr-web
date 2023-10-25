import * as React from 'react'
import { CSSProperties, createThemeConfigure } from './configure.theme'
import { getUseCSSStyles, getUseInlineStyle } from './util'

export type FormTheme = {
  fieldMultiInput: {
    wrapper: CSSProperties
    item: CSSProperties
  }
  fieldReadOnly: {
    image: CSSProperties
    item: CSSProperties
    itemFullwidth: CSSProperties
    label: CSSProperties
    labelFullwidth: CSSProperties
    textAreaItem: CSSProperties
    textAreaValue: CSSProperties
    value: CSSProperties
    valueHighlighted: CSSProperties
    wrapper: CSSProperties
    wrapperFullwidth: CSSProperties
  }
  form: {
    wrapper: CSSProperties
    content: CSSProperties
    buttonContainer: CSSProperties
  }
  group: {
    title: CSSProperties
    wrapper: CSSProperties
    descriptionList: CSSProperties
    descriptionItem: CSSProperties
    descriptionText: CSSProperties
  }
  row: {
    wrapper: CSSProperties
    wrapperReadOnly: CSSProperties
    item: CSSProperties
  }
  section: {
    content: CSSProperties
    contentCardWrapper: CSSProperties
    contentWrapper: CSSProperties
    description: CSSProperties
    descriptionError: CSSProperties
    descriptionInfo: CSSProperties
    descriptionSuccess: CSSProperties
    descriptionWarning: CSSProperties
    emptyTitleWrapperMobile: CSSProperties
    introduction: CSSProperties
    rowItem: CSSProperties
    title: CSSProperties
    titleWrapper: CSSProperties
    wrapper: CSSProperties
  }
  sectionRight: {
    wrapper: CSSProperties
    editLink: CSSProperties
    editIcon: CSSProperties
  }
  staticField: {
    wrapper: CSSProperties
    title: CSSProperties
    text: CSSProperties
    button: CSSProperties
  }
}

export type FormThemeConfig = { [k in keyof FormTheme]?: Partial<FormTheme[k]> }

export const defaultFormTheme: FormTheme = {
  fieldMultiInput: {
    wrapper: {},
    item: {},
  },
  fieldReadOnly: {
    image: {},
    item: {},
    itemFullwidth: {},
    label: {},
    labelFullwidth: {},
    textAreaItem: {},
    textAreaValue: {},
    value: {},
    valueHighlighted: {},
    wrapper: {},
    wrapperFullwidth: {},
  },
  form: {
    wrapper: {},
    content: {},
    buttonContainer: {},
  },
  row: {
    wrapper: {},
    wrapperReadOnly: {},
    item: {},
  },
  group: {
    title: {},
    wrapper: {},
    descriptionList: {},
    descriptionItem: {},
    descriptionText: {},
  },
  section: {
    content: {},
    contentCardWrapper: {},
    contentWrapper: {},
    description: {},
    descriptionError: {},
    descriptionInfo: {},
    descriptionSuccess: {},
    descriptionWarning: {},
    emptyTitleWrapperMobile: {},
    introduction: {},
    rowItem: {},
    title: {},
    titleWrapper: {},
    wrapper: {},
  },
  sectionRight: {
    wrapper: {},
    editIcon: {},
    editLink: {},
  },
  staticField: {
    wrapper: {},
    title: {},
    text: {},
    button: {},
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

export const useInlineStyle = getUseInlineStyle<FormTheme>()
export const useCSSStyles = getUseCSSStyles<FormTheme>()
