import * as React from 'react'
import { createThemeConfigure, CSSProperties } from './configure.theme'
import { getUseCSSStyles, getUseInlineStyle } from './util'

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

export type ComponentTheme = {
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
    primaryLabel: CSSProperties
    secondaryLabel: CSSProperties
    chromelessLabel: CSSProperties
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
    postfix: CSSProperties
    readOnlyHook: CSSProperties
    readOnlyInput: CSSProperties
    readOnlyWrapper: CSSProperties
    wrapper: CSSProperties
  }
  textArea: {
    disabled: CSSProperties
    input: CSSProperties
    wrapper: CSSProperties
  }
  fileInput: {
    wrapper: CSSProperties
  }
  multiFileInput: {
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
    outerWrapper: CSSProperties
  }
  materialSlider: MaterialSliderStyles
  select: {
    option: CSSProperties
    wrapper: CSSProperties
    errorWrapper: CSSProperties
    icon: CSSProperties
    select: CSSProperties
  }
  colorPicker: {
    circle: CSSProperties
    labelColor: CSSProperties
    labelModal: CSSProperties
    wrapper: CSSProperties
  }
  datePicker: {
    disabledInput: CSSProperties
    errorHook: CSSProperties
    errorInput: CSSProperties
    errorWrapper: CSSProperties
    hook1: CSSProperties
    hook2: CSSProperties
    iconWrapper: CSSProperties
    inputWrapper: CSSProperties
    reactDatePicker?: string
    wrapper: CSSProperties
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
    settings: {
      svg?: string
    }
  }
  modal: {
    outerWrapper: CSSProperties
    innerWrapper: CSSProperties
  }
  table: {
    tableWrapper: CSSProperties
    listWrapper: CSSProperties
    rowWrapper: CSSProperties
    rowCell: CSSProperties
    rowText: CSSProperties
    headerWrapper: CSSProperties
    headerCell: CSSProperties
    headerText: CSSProperties
    loadingWrapper: CSSProperties
    noResultsWrapper: CSSProperties
    noResultsLabel: CSSProperties
    loading: CSSProperties
    headerOuterWrapper: CSSProperties
    descriptionOuterWrapper: CSSProperties
    descriptionIcon: CSSProperties
    descriptionIconWrapper: CSSProperties
    descriptionPopup: CSSProperties
    descriptionText: CSSProperties
  }
  navigation: {
    carrot: CSSProperties
    item: CSSProperties
    itemActive: CSSProperties
    itemCircle: CSSProperties
    itemCircleActive: CSSProperties
    itemLabel: CSSProperties
    itemLabelActive: CSSProperties
    itemNumber: CSSProperties
    itemWrapper: CSSProperties
    wrapperInner: CSSProperties
    wrapperOuter: CSSProperties
  }
  loading: {
    wrapper: CSSProperties
    item: CSSProperties
    label: CSSProperties
  }
  uploadDropzone: {
    container: CSSProperties
    dropzoneLabel: CSSProperties
    dropzoneSublabel: CSSProperties
    acceptedFilesLabel: CSSProperties
    rejectedFilesLabel: CSSProperties
    acceptedFileItem: CSSProperties
    rejectedFileItem: CSSProperties
    errorMessage: CSSProperties
    section: CSSProperties
    sectionSingleItem: CSSProperties
    imageItem: CSSProperties
    listItem: CSSProperties
    listSingleItem: CSSProperties
    removeItemIcon: CSSProperties
  }
  pdfViewer: {
    pageSelectorWrapper: CSSProperties
    pageSelector: CSSProperties
    pageNumber: CSSProperties
    pdfWrapper: CSSProperties
    downloadButton: CSSProperties
    closeButton: CSSProperties
  }
  buttonGroup: {
    wrapper: CSSProperties
    item: CSSProperties
    itemActive: CSSProperties
    icon: CSSProperties
    iconActive: CSSProperties
    label: CSSProperties
    labelActive: CSSProperties
  }
}

export type ComponentThemeConfig = { [k in keyof ComponentTheme]?: Partial<ComponentTheme[k]> }

export const defaultComponentTheme: ComponentTheme = {
  buttonGroup: {
    wrapper: {},
    item: {},
    itemActive: {},
    icon: {},
    iconActive: {},
    label: {},
    labelActive: {},
  },
  pdfViewer: {
    pageSelectorWrapper: {},
    pageSelector: {},
    pageNumber: {},
    pdfWrapper: {},
    downloadButton: {},
    closeButton: {},
  },
  table: {
    tableWrapper: {},
    listWrapper: {},
    rowWrapper: {},
    rowCell: {},
    rowText: {},
    headerWrapper: {},
    headerCell: {},
    headerText: {},
    loadingWrapper: {},
    noResultsWrapper: {},
    noResultsLabel: {},
    loading: {},
    headerOuterWrapper: {},
    descriptionOuterWrapper: {},
    descriptionIcon: {},
    descriptionIconWrapper: {},
    descriptionPopup: {},
    descriptionText: {},
  },
  fileInput: {
    wrapper: {},
  },
  multiFileInput: {
    wrapper: {},
  },
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
    primaryLabel: {},
    secondaryLabel: {},
    chromelessLabel: {},
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
    postfix: {},
    readOnlyHook: {},
    readOnlyInput: {},
    readOnlyWrapper: {},
    wrapper: {},
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
    outerWrapper: {},
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
  colorPicker: {
    circle: {},
    labelModal: {},
    labelColor: {},
    wrapper: {},
  },
  datePicker: {
    disabledInput: {},
    errorHook: {},
    errorInput: {},
    errorWrapper: {},
    hook1: {},
    hook2: {},
    iconWrapper: {},
    inputWrapper: {},
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
    settings: {},
  },
  navigation: {
    carrot: {},
    item: {},
    itemActive: {},
    itemCircle: {},
    itemCircleActive: {},
    itemLabel: {},
    itemLabelActive: {},
    itemNumber: {},
    itemWrapper: {},
    wrapperInner: {},
    wrapperOuter: {},
  },
  loading: {
    wrapper: {},
    item: {},
    label: {},
  },
  uploadDropzone: {
    container: {},
    dropzoneLabel: {},
    dropzoneSublabel: {},
    acceptedFilesLabel: {},
    rejectedFilesLabel: {},
    acceptedFileItem: {},
    rejectedFileItem: {},
    errorMessage: {},
    section: {},
    sectionSingleItem: {},
    imageItem: {},
    listItem: {},
    listSingleItem: {},
    removeItemIcon: {},
  },
}

// React Context

export const ComponentThemeContext = React.createContext<ComponentTheme>(undefined as ComponentTheme)

ComponentThemeContext.displayName = 'ComponentThemeContext'

export const configureComponentTheme = createThemeConfigure<ComponentThemeConfig, ComponentTheme>(
  defaultComponentTheme,
)

// Hooks

export const useComponentTheme = (): ComponentTheme => {
  const theme = React.useContext(ComponentThemeContext)
  if (!theme) {
    throw new Error(`ComponentTheme not found`)
  }
  return theme
}

export const useInlineStyle = getUseInlineStyle<ComponentTheme>()
export const useCSSStyles = getUseCSSStyles<ComponentTheme>()
