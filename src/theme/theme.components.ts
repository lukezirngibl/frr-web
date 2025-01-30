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
  thumbFocus?: CSSProperties
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
    chromelessLabel: CSSProperties
    common: CSSProperties
    label: CSSProperties
    primary: CSSProperties
    primaryLabel: CSSProperties
    secondary: CSSProperties
    secondaryLabel: CSSProperties
    spinner: CSSProperties
  }
  label: {
    descriptionIcon: CSSProperties
    descriptionIconWrapper: CSSProperties
    descriptionPopup: CSSProperties
    descriptionText: CSSProperties
    errorIcon: CSSProperties
    errorLabelWrapper: CSSProperties
    errorLabel: CSSProperties
    errorButton: CSSProperties
    errorButtonIcon: CSSProperties
    labelText: CSSProperties
    labelTextError: CSSProperties
    labelTextActive: CSSProperties
    labelTextWrapper: CSSProperties
    sublabelText: CSSProperties
    sublabelTextActive: CSSProperties
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
    inputPlaceholder: CSSProperties
    prefix: CSSProperties
    postfix: CSSProperties
    readOnlyHook: CSSProperties
    readOnlyInput: CSSProperties
    readOnlyWrapper: CSSProperties
    wrapper: CSSProperties
    wrapperCurrency: CSSProperties
    wrapperFocus: CSSProperties
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
    input: CSSProperties
    inputWrapper: CSSProperties
    label: CSSProperties
    outerWrapper: CSSProperties
    postfix: CSSProperties
    prefix: CSSProperties
    value: CSSProperties
    valueWrapper: CSSProperties
    valueWrapperEditable: CSSProperties
    wrapper: CSSProperties
  }
  materialSlider: MaterialSliderStyles
  select: {
    errorWrapper: CSSProperties
    icon: CSSProperties
    iconMobile: CSSProperties
    menuPortal: CSSProperties
    menu: CSSProperties
    menuList: CSSProperties
    option: CSSProperties
    optionActive: CSSProperties
    optionHover: CSSProperties
    placeholder: CSSProperties
    select: CSSProperties
    value: CSSProperties
    valueContainer: CSSProperties
    wrapper: CSSProperties
    wrapperFocus: CSSProperties
  }
  colorPicker: {
    circle: CSSProperties
    labelColor: CSSProperties
    labelModal: CSSProperties
    wrapper: CSSProperties
    wrapperFocus: CSSProperties
  }
  datePicker: {
    disabledInput: CSSProperties
    errorHook: CSSProperties
    errorInput: CSSProperties
    errorWrapper: CSSProperties
    hook1: CSSProperties
    hook2: CSSProperties
    iconWrapper: CSSProperties
    iconWrapperFocus: CSSProperties
    input: CSSProperties
    inputPlaceholder: CSSProperties
    inputWrapper: CSSProperties
    reactDatePicker?: string
    wrapper: CSSProperties
    wrapperFocus: CSSProperties
  }
  dropdown: {
    wrapper: CSSProperties
  }
  optionGroup: {
    wrapper: CSSProperties
    wrapperFocus: CSSProperties
    item: CSSProperties
    itemActive: CSSProperties
    itemFocus: CSSProperties
    itemDisabled: CSSProperties
    itemRadioCircle: CSSProperties
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
    wrapperDisabled: CSSProperties
    input: CSSProperties
    inputDisabled: CSSProperties
  }
  radioGroup: {
    wrapper: CSSProperties
    wrapperVertical: CSSProperties
    wrapperFocus: CSSProperties
    labelWrapper: CSSProperties
    label: CSSProperties
    sublabel: CSSProperties
    item: CSSProperties
    itemActive: CSSProperties
    itemVertical: CSSProperties
    itemVerticalActive: CSSProperties
    icon: CSSProperties
    radioOuter: CSSProperties
    radioOuterActive: CSSProperties
    radioOuterError: CSSProperties
    radioOuterFocus: CSSProperties
    radioInner: CSSProperties
    radioInnerActive: CSSProperties
    errorWrapper: CSSProperties
  }
  toggle: {
    wrapper: CSSProperties
    wrapperActive: CSSProperties
    wrapperFocus: CSSProperties
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
    itemDisabled: CSSProperties
    itemLabel: CSSProperties
  }
  icon: {
    contact: { svg?: string }
    edit: { svg?: string }
    info: { svg?: string }
    language: { svg?: string }
    settings: { svg?: string }
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
    sortingIcon: CSSProperties
    sortingIconWrapper: CSSProperties
    sortingIconsContainer: CSSProperties
    descriptionPopup: CSSProperties
    descriptionText: CSSProperties
  }
  navigation: {
    carrot: CSSProperties
    item: CSSProperties
    itemActive: CSSProperties
    itemCircle: CSSProperties
    itemCircleActive: CSSProperties
    itemStepIndicator: CSSProperties
    itemTitle: CSSProperties
    itemTitleWrapper: CSSProperties
    itemLabel: CSSProperties
    itemLabelActive: CSSProperties
    itemNumber: CSSProperties
    itemWrapper: CSSProperties
    wrapperInner: CSSProperties
    wrapperOuter: CSSProperties
    progressBar: CSSProperties
    progressBarActive: CSSProperties
    progressBarCompleted: CSSProperties
    progressBarError: CSSProperties
    progressBarWarning: CSSProperties
    itemLabelCompleted: CSSProperties
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
    sortingIcon: {},
    sortingIconWrapper: {},
    sortingIconsContainer: {},
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
    itemDisabled: {},
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
    chromelessLabel: {},
    common: {},
    label: {},
    primary: {},
    primaryLabel: {},
    secondary: {},
    secondaryLabel: {},
    spinner: {},
  },
  label: {
    descriptionIcon: {},
    descriptionIconWrapper: {},
    descriptionPopup: {},
    descriptionText: {},
    errorIcon: {},
    errorLabelWrapper: {},
    errorLabel: {},
    errorButton: {},
    errorButtonIcon: {},
    labelText: {},
    labelTextError: {},
    labelTextActive: {},
    labelTextWrapper: {},
    sublabelText: {},
    sublabelTextActive: {},
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
    inputPlaceholder: {},
    prefix: {},
    postfix: {},
    readOnlyHook: {},
    readOnlyInput: {},
    readOnlyWrapper: {},
    wrapper: {},
    wrapperCurrency: {},
    wrapperFocus: {},
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
    input: {},
    inputWrapper: {},
    label: {},
    outerWrapper: {},
    postfix: {},
    prefix: {},
    value: {},
    valueWrapper: {},
    valueWrapperEditable: {},
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
    thumbFocus: {},
    track: {},
  },
  select: {
    errorWrapper: {},
    icon: {},
    iconMobile: {},
    menuPortal: {},
    menu: {},
    menuList: {},
    option: {},
    optionActive: {},
    optionHover: {},
    placeholder: {},
    select: {},
    value: {},
    valueContainer: {},
    wrapper: {},
    wrapperFocus: {},
  },
  colorPicker: {
    circle: {},
    labelModal: {},
    labelColor: {},
    wrapper: {},
    wrapperFocus: {},
  },
  datePicker: {
    disabledInput: {},
    errorHook: {},
    errorInput: {},
    errorWrapper: {},
    hook1: {},
    hook2: {},
    iconWrapper: {},
    iconWrapperFocus: {},
    inputWrapper: {},
    input: {},
    inputPlaceholder: {},
    reactDatePicker: '',
    wrapper: {},
    wrapperFocus: {},
  },
  dropdown: {
    wrapper: {},
  },
  optionGroup: {
    wrapper: {},
    wrapperFocus: {},
    item: {},
    itemActive: {},
    itemFocus: {},
    itemDisabled: {},
    itemRadioCircle: {},
    label: {},
    labelActive: {},
    errorWrapper: {},
  },
  toggle: {
    wrapper: {},
    wrapperActive: {},
    wrapperFocus: {},
    circle: {},
    circleActive: {},
  },
  radioGroup: {
    wrapper: {},
    wrapperVertical: {},
    wrapperFocus: {},
    labelWrapper: {},
    label: {},
    sublabel: {},
    item: {},
    itemActive: {},
    itemVertical: {},
    itemVerticalActive: {},
    icon: {},
    radioOuter: {},
    radioOuterActive: {},
    radioOuterError: {},
    radioOuterFocus: {},
    radioInner: {},
    radioInnerActive: {},
    errorWrapper: {},
  },
  singleCheckbox: {
    wrapper: {},
    wrapperDisabled: {},
    input: {},
    inputDisabled: {},
  },
  codeInput: {
    wrapper: {},
    input: {},
  },
  icon: {
    contact: {},
    edit: {},
    info: {},
    language: {},
    settings: {},
  },
  navigation: {
    carrot: {},
    item: {},
    itemActive: {},
    itemCircle: {},
    itemCircleActive: {},
    itemStepIndicator: {},
    itemTitle: {},
    itemTitleWrapper: {},
    itemLabel: {},
    itemLabelActive: {},
    itemNumber: {},
    itemWrapper: {},
    wrapperInner: {},
    wrapperOuter: {},
    progressBar: {},
    progressBarActive: {},
    progressBarCompleted: {},
    progressBarError: {},
    progressBarWarning: {},
    itemLabelCompleted: {},
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
