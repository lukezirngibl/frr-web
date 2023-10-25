import { ComponentThemeConfig } from '../../../src/theme/theme.components'

export const componentTheme: Partial<ComponentThemeConfig> = {
  datePicker: {
    wrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: 'var(--form-field-width)',
      display: 'flex',
      alignItems: 'center',
    },
    iconWrapper: {
      flexBasis: 80,
      height: 'var(--form-field-height)',
      display: 'flex',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: 'var(--color-form-field-border)',
      marginTop: 'calc(var(--form-field-mobile-padding) * -1)',
      position: 'relative',
    },
    hook1: {
      display: 'block',
      position: 'absolute',
      width: 1,
      height: 12,
      bottom: 0,
      left: 0,
      backgroundColor: 'var(--color-form-field-border)',
    },
    hook2: {
      display: 'block',
      position: 'absolute',
      width: 1,
      height: 12,
      bottom: 0,
      right: 0,
      backgroundColor: 'var(--color-form-field-border)',
    },
    errorHook: {
      backgroundColor: 'var(--color-error)',
    },
    errorWrapper: {
      borderBottomColor: 'var(--color-error)',
    },
    disabledInput: {
      color: 'var(--color-disabled)',
    },
    reactDatePicker: `
& .react-datepicker {
  font-family: var(--font-family);
  top: calc(var(--form-field-height) + 4px);
  border-radius: 0;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
}

& .react-datepicker__header {
  background-color: var(--color-background-secondary);
  padding-top: 16px;

  & .react-datepicker__current-month {
    font-size: var(--font-size-16);
  }
}

& .react-datepicker__header__dropdown {
  margin: 16px 0;
  & select {
    border: 1px solid rgb(204, 204, 204);
    border-radius: 0;
    padding: 6px 8px 4px;
    font-size: var(--font-size-16);
  }
}

& .react-datepicker__navigation {
  border-width: 1rem;
}

& .react-datepicker__day-name {
  font-size: var(--font-size-16);
  font-weight: 500;
  width: 34px;
  line-height: var(--font-size-16);
  padding: 9px 0 7px;
  margin: 4px;
}
& .react-datepicker__day {
  font-size: var(--font-size-16);
  width: 34px;
  line-height: var(--font-size-16);
  padding: 9px 0 7px;
  margin: 4px;
  border: 1px solid transparent;
  border-radius: 0;
  :hover {
    border-radius: 0;
    background-color: rgba(249, 193, 0, 0.6);
  }
}
& .react-datepicker__day--outside-month {
  color: var(--color-disabled);
}
& .react-datepicker__day--selected {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  background-color: var(--color-background-primary);
  font-weight: 700;

  :hover {
    background-color: rgba(249, 193, 0, 0.6);
  }
}
`,
  },
  slider: {
    input: {
      textAlign: 'right',
      paddingRight: 12,
    },
    label: {
      maxWidth: 'calc(100% - var(--calculator-field-width) - 4px)',
    },
    outerWrapper: {},
    prefix: {
      marginLeft: 4,
      marginRight: 4,
      fontSize: 'var(--font-size-18)',
      fontWeight: 400,
    },
    postfix: {
      marginLeft: 4,
      marginRight: 4,
      fontSize: 'var(--font-size-18)',
      fontWeight: 400,
    },
    value: {
      fontSize: 'var(--font-size-18)',
      fontWeight: 700,
      textAlign: 'center',
    },
    valueWrapper: {
      position: 'absolute',
      right: 0,
      top: 0,
      paddingTop: 'var(--form-field-mobile-padding)',
      display: 'flex',
      alignItems: 'center',
    },
    valueWrapperEditable: {
      maxWidth: 'var(--calculator-field-width)',
      top: -14,
      '@media-mobile': {
        top: 2,
      },
    },
    wrapper: {
      width: '100%',
      marginTop: 24,
      '@media-mobile': {
        marginTop: 12,
      },
    },
  },
  materialSlider: {
    root: {
      color: 'var(--color-partner-primary)',
    },
    thumb: {
      backgroundColor: 'var(--color-partner-primary)',
      width: 14,
      height: 34,
      marginTop: -13,
      marginLeft: -8,
      borderRadius: 0,
      ':focus': {
        boxShadow: 'none',
        backgroundColor: 'var(--color-partner-primary)',
      },
      ':hover': {
        boxShadow: 'none',
        backgroundColor: 'var(--color-partner-primary)',
      },
      ':active': {
        boxShadow: 'none',
        backgroundColor: 'var(--color-partner-primary)',
      },
    },
    thumbFocus: {
      position: 'absolute',
      top: 'var(--form-field-border-padding)',
      left: 'var(--form-field-border-padding)',
      right: 'var(--form-field-border-padding)',
      bottom: 'var(--form-field-border-padding)',
      border: 'var(----form-field-border-focus)',
      borderRadius: 'var(--form-field-border-radius)',
      boxShadow: 'var(--form-field-focus-box-shadow)',
      background: 'var(--form-field-focus-background)',
      zIndex: -1,
    },
    rail: {
      backgroundColor: 'var(--color-form-field-background)',
      opacity: 1,
    },
  },
  label: {
    labelTextWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    labelText: {
      color: 'var(--color-secondary)',
    },
    labelTextError: {
      color: 'var(--color-error)',
    },
    errorIcon: {
      position: 'absolute',
      left: -22,
      top: 0,
      color: 'var(--color-error)',
    },
    errorLabel: {
      color: 'var(--color-error)',
      fontSize: 'var(--font-size-14)',
    },
    sublabelText: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-14)',
    },
    descriptionPopup: {
      position: 'absolute',
      top: 40,
      left: 'auto',
      border: '1px solid var(--color-partner-primary)',
      boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'var(--color-background-primary)',
      padding: 16,
      minWidth: 'var(--form-field-description-min-width)',
      zIndex: 9999,
      '@media-mobile': {
        left: -8,
      },
    },
    descriptionText: {
      fontSize: 'var(--font-size-16)',
    },
    descriptionIconWrapper: {
      position: 'relative',
      display: 'inline-block',
      color: 'var(--color-secondary)',
      opacity: 0.7,
      cursor: 'pointer',
      minWidth: 20,
      marginLeft: 8,
      transition: 'opacity 0.3s ease-out, color 0.3s ease-out',
      ':hover': {
        color: 'var(--color-primary)',
        opacity: 1,
      },
    },
    descriptionIcon: {
      position: 'absolute',
      bottom: -5,
      width: 20,
      height: 20,
    },
    wrapper: {
      paddingTop: 'var(--form-field-mobile-padding)',
      paddingBottom: 'calc(var(--form-field-mobile-padding) + 4px)',
      fontSize: 'var(--font-size-18)',
      flexGrow: 1,
      marginRight: 32,
    },
  },
  toggle: {
    wrapper: {
      position: 'relative',
      border: '1px solid var(--color-primary)',
      '@media-mobile': {
        marginLeft: 'auto',
      },
    },
    wrapperActive: {
      borderColor: '#3d6f1a',
      backgroundColor: '#3d6f1a',
      flexDirection: 'row-reverse',
    },
    wrapperFocus: {
      ':before': {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        top: 'var(--form-field-focus-padding)',
        left: 'var(--form-field-focus-padding)',
        right: 'var(--form-field-focus-padding)',
        bottom: 'var(--form-field-focus-padding)',
        border: 'var(--form-field-focus-border)',
        borderRadius: '22px',
        boxShadow: 'var(--form-field-focus-box-shadow)',
        background: 'var(--form-field-focus-background)',
      },
    },
    circle: {
      height: 24,
      width: 24,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'var(--color-primary)',
    },
    circleActive: {
      borderColor: 'var(--color-background-primary)',
      backgroundColor: 'var(--color-background-primary)',
    },
  },
  radioGroup: {
    wrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 'var(--form-field-height)',
      minWidth: 'var(--form-field-width)',
      paddingLeft: 'var(--form-field-mobile-padding)',
      gap: 20,
      '@media-mobile': {
        paddingBottom: 6,
        paddingLeft: 0,
        paddingRight: 0,
        gap: 8,
      },
    },
    wrapperFocus: {
      ':before': {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        top: 'var(--form-field-focus-padding)',
        left: 'var(--form-field-focus-padding)',
        right: 'var(--form-field-focus-padding)',
        bottom: 'var(--form-field-focus-padding)',
        border: 'var(--form-field-focus-border)',
        borderRadius: 'var(--form-field-focus-border-radius)',
        boxShadow: 'var(--form-field-focus-box-shadow)',
        background: 'var(--form-field-focus-background)',
      },
    },
    radioOuterError: {
      borderColor: 'var(--color-error)',
    },
    radioOuter: {
      position: 'relative',
      width: 19,
      height: 19,
      marginTop: -2,
      padding: 0,
      display: 'flex',
      flexShrink: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--color-form-field-background)',
      border: '1px solid var(--color-primary)',
      transition: 'border 0.1s',
      ':hover': {
        borderWidth: 2,
      },
    },
    radioOuterActive: {},
    radioOuterFocus: {
      borderWidth: 2,
    },
    radioInner: {
      width: 9,
      height: 9,
      backgroundColor: 'var(--color-primary)',
    },
    radioInnerActive: {},
    item: {
      flexDirection: 'row-reverse',
      minWidth: 112,
      padding: '0 20px 0 20px',
      justifyContent: 'flex-end',
      '@media-mobile': {
        width: '50%',
      },
    },
    label: {
      paddingLeft: 12,
      lineHeight: 1,
    },
    errorWrapper: {},
  },
  select: {
    errorWrapper: {
      borderColor: 'var(--color-error)',
    },
    wrapper: {
      position: 'relative',
      width: 'var(--form-field-width)',
      backgroundColor: 'var(--color-background-secondary)',
      zIndex: 0,
    },
    wrapperFocus: {
      ':before': {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        top: 'var(--form-field-focus-padding)',
        left: 'var(--form-field-focus-padding)',
        right: 'var(--form-field-focus-padding)',
        bottom: 'var(--form-field-focus-padding)',
        border: 'var(--form-field-focus-border)',
        borderRadius: 'var(--form-field-focus-border-radius)',
        boxShadow: 'var(--form-field-focus-box-shadow)',
        background: 'var(--form-field-focus-background)',
      },
    },
    icon: {
      color: 'var(--color-primary)',
      position: 'absolute',
      right: 16,
      fontSize: 'var(--font-size-24)',
      opacity: 0.6,
    },
    iconMobile: {
      top: 12,
      right: 20,
      zIndex: -1,
    },
    menu: {
      position: 'absolute',
      width: '100%',
      backgroundColor: 'var(--color-background-secondary)',
      boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.35), 0 -1px 4px rgba(0, 0, 0, 0.05)',
      marginLeft: -2,
      marginTop: -1,
      marginBottom: 4,
      borderRadius: 2,
      overflow: 'hidden',
      zIndex: 1,
    },
    option: {
      cursor: 'pointer',
      display: 'block',
      fontSize: 'var(--font-size-14)',
      padding: '16px 16px',
      width: '100%',
      userSelect: 'none',
      paddingLeft: 28,
      transition: 'background-color 50ms, color: 50ms',
      ':disabled': {
        backgroundColor: 'transparent',
        color: 'var(--color-disabled)',
      },
    },
    optionHover: {
      backgroundColor: '#2484FF', // Color in production
      color: 'white',
    },
    optionActive: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
    },
    select: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderColor: 'var(--color-form-field-border)',
      borderRadius: 2,
      borderStyle: 'solid',
      borderWidth: 1,
      boxShadow: undefined,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: 'var(--font-size-14)',
      height: 'var(--form-field-height)',
      justifyContent: 'space-between',
      minHeight: 38,
      outline: '0 !important',
      overflow: 'visible',
      padding: '0 16px 0 16px',
      position: 'relative',
      textOverflow: 'ellipsis',
      transition: 'all 100ms',
      whiteSpace: 'nowrap',
      width: 'var(--form-field-width)',
      zIndex: 10,
    },
    placeholder: { marginTop: 5, fontSize: 'var(--font-size-14)' },
    valueContainer: { padding: 0 },
    value: {
      marginTop: 5,
      fontSize: 'var(--font-size-14)',
      marginRight: 42,
    },
  },
  textInput: {
    errorWrapper: {
      borderBottomColor: 'var(--color-error)',
    },
    errorHook: {
      backgroundColor: 'var(--color-error)',
    },
    readOnlyWrapper: {
      borderWidth: 0,
    },
    readOnlyInput: {
      textAlign: 'right',
    },
    readOnlyHook: {
      display: 'none',
    },
    prefix: {
      paddingLeft: 12,
      cursor: 'pointer',
      color: 'var(--color-disabled)',
      fontSize: 'var(--font-size-18)',
      lineHeight: 'var(--form-field-height)',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      height: 'var(--form-field-height)',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: 'var(--color-form-field-border)',
      width: '100%',
      maxWidth: 'var(--form-field-width)',
      marginTop: 'calc(var(--form-field-mobile-padding) * -1)',
      position: 'relative',
    },
    wrapperFocus: {
      ':before': {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        top: 'var(--form-field-focus-padding)',
        left: 'var(--form-field-focus-padding)',
        right: 'var(--form-field-focus-padding)',
        bottom: 'var(--form-field-focus-padding)',
        border: 'var(--form-field-focus-border)',
        borderRadius: 'var(--form-field-focus-border-radius)',
        boxShadow: 'var(--form-field-focus-box-shadow)',
        background: 'var(--form-field-focus-background)',
      },
    },
    input: {
      width: '100%',
      height: '100%',
      border: 0,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      paddingLeft: 12,
      fontSize: 'var(--font-size-18)',
    },
    hook: {
      display: 'block',
      position: 'absolute',
      width: 1,
      height: 12,
      bottom: 0,
      left: 0,
      backgroundColor: 'var(--color-form-field-border)',
    },
    disabledInput: {
      color: 'var(--color-disabled)',
    },
    disabledWrapper: {},
    errorInput: {
      color: 'var(--color-error)',
    },
  },
  textArea: {
    wrapper: {
      marginTop: 'calc(var(--form-field-mobile-padding) * -1)',
    },
    input: {},
    disabled: {},
  },
  optionGroup: {
    errorWrapper: {
      borderColor: 'var(--color-error)',
    },
    wrapper: {
      cursor: 'pointer',
      position: 'relative',
      width: 'var(--form-field-width)',
      height: 'var(--form-field-height)',
      zIndex: 1,
    },
    wrapperFocus: {
      ':before': {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        top: 'var(--form-field-focus-padding)',
        left: 'var(--form-field-focus-padding)',
        right: 'var(--form-field-focus-padding)',
        bottom: 'var(--form-field-focus-padding)',
        border: 'var(--form-field-focus-border)',
        borderRadius: 'var(--form-field-focus-border-radius)',
        boxShadow: 'var(--form-field-focus-box-shadow)',
        background: 'var(--form-field-focus-background)',
        zIndex: -1,
      },
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      backgroundColor: 'var(--color-background-primary)',
      padding: '8px 16px',
      borderWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#c3c3c3',
      borderTopColor: '#c3c3c3',
      borderLeftColor: 'transparent',
      borderRightColor: '#c3c3c3',
      transition: 'border 0.1s',
      ':first-child': {
        borderLeftColor: '#c3c3c3',
      },
    },
    itemActive: {
      boxShadow: '0 0 4px rgba(0,0,0,0.2)',
      borderBottomColor: 'var(--color-primary)',
      borderTopColor: 'var(--color-primary)',
      borderLeftColor: 'var(--color-primary)',
      borderRightColor: 'var(--color-primary)',
      ':first-child': {
        borderLeftColor: 'var(--color-primary)',
      },
      zIndex: 1,
    },
    itemFocus: {
      borderBottomColor: 'var(--color-primary)',
      borderTopColor: 'var(--color-primary)',
      borderLeftColor: 'var(--color-primary)',
      borderRightColor: 'var(--color-primary)',
      ':first-child': {
        borderLeftColor: 'var(--color-primary)',
      },
      borderWidth: 2,
      zIndex: 1,
    },
    label: {
      textAlign: 'center',
      fontSize: 'var(--font-size-14)',
    },
    labelActive: {},
  },
  button: {
    common: {
      position: 'relative',
      borderWidth: 1,
      borderStyle: 'solid',
      paddingLeft: 28,
      paddingRight: 28,
      transition: 'all ease-out 0.15s',
      height: 43,
      minWidth: 120,
      fontSize: 'var(--font-size-14)',
      '@media-mobile': {
        fontSize: 'var(--font-size-16)',
        paddingLeft: 16,
        paddingRight: 16,
        minWidth: 0,
      },
      ':focus:before': {
        content: '""',
        position: 'absolute',
        top: 'var(--form-field-focus-padding)',
        left: 'var(--form-field-focus-padding)',
        right: 'var(--form-field-focus-padding)',
        bottom: 'var(--form-field-focus-padding)',
        border: 'var(--form-field-focus-border)',
        borderRadius: 'var(--form-field-focus-border-radius)',
        boxShadow: 'var(--form-field-focus-box-shadow)',
        background: 'var(--form-field-focus-background)',
      },
    },
    chromeless: {
      background: 'transparent',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    primary: {
      backgroundColor: 'var(--color-partner-primary)',
      borderColor: 'var(--color-partner-primary)',
      color: 'var(--color-primary)',
      minWidth: 180,
      ':hover': {
        transform: 'scale(1.05, 1.05)',
      },
      ':disabled': {
        opacity: 0.6,
        pointerEvents: 'none',
      },
      '@media-mobile': {
        minWidth: 0,
        width: '100%',
        margin: '0 0 16px 0',
      },
      '@animation': 'button-primary-animation 200ms ease-out',
    },
    label: {},
    secondary: {
      backgroundColor: 'var(--color-background-primary)',
      color: 'var(--color-primary)',
      borderColor: 'rgb(195, 195, 195)',
      ':hover': {
        borderColor: 'rgba(0,0,0, 0.6)',
        transform: 'scale(1.05, 1.05)',
      },
      ':disabled': {
        opacity: 0.4,
        pointerEvents: 'none',
      },
      '@media-mobile': {
        minWidth: 0,
        width: '100%',
        margin: 0,
      },
      '@animation': 'button-secondary-animation 200ms ease-out',
    },
    spinner: {},
  },
  icon: {
    edit: {
      svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path fill="currentColor" stroke="none" d="M26 1.067l-23.067 23.067-1.6 6.533 6.533-1.6 23.067-23.067-4.933-4.933zM29.067 6l-1.733 1.733-3.067-3.067 1.733-1.733 3.067 3.067zM26.4 8.667l-18.267 18.267-3.067-3.067 18.267-18.267 3.067 3.067zM3.067 28.933l1.067-4 3.067 3.067-4.133 0.933z"></path></g></svg>',
    },
    info: {
      svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-7 -7 46 46"><circle cx="16" cy="16" r="20" stroke-width="2" stroke="currentColor" fill="none" /><path fill="currentColor" stroke="none" d="M17.333 25.333v-16h-4.667v2.667h2v13.333h-2v2.667h6.667v-2.667z"></path><path fill="currentColor" stroke="none" d="M14.667 4h2.667v2.667h-2.667v-2.667z"></path></svg>',
    },
  },

  // ==============================
  // Navigation
  // ==============================

  navigation: {
    carrot: {
      display: 'none',
    },
    wrapperOuter: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      '@media-mobile': {
        marginBottom: 8,
      },
    },
    wrapperInner: {
      alignItems: 'center',
      backgroundColor: 'var(--color-background-primary)',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      margin: '0 auto',
      maxWidth: 1000,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 32,
      width: '100%',
      '@media-mobile': {
        padding: '16px 10px 24px',
      },
    },
    itemWrapper: {
      display: 'flex',
      alignItems: 'center',
      width: '25%',
    },
    itemTitle: {
      display: 'none',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 1,
      marginBottom: 0,
      width: '100%',
      borderBottom: '5px solid var(--color-primary)',
    },
    itemActive: {
      borderBottom: '5px solid var(--color-partner-primary)',
    },
    itemLabel: {
      fontSize: 'var(--font-size-14)',
      whiteSpace: 'nowrap',
      marginBottom: 2,
      marginLeft: 4,
      '@media-mobile': {
        display: 'none',
      },
    },
    itemLabelActive: {
      fontWeight: 700,
    },
    itemNumber: {
      fontSize: 'var(--font-size-14)',
      marginBottom: 2,
    },
    itemCircle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: '0 6px',
      backgroundColor: 'var(--color-primary)',
      display: 'none',
    },
    itemCircleActive: {
      backgroundColor: 'var(--color-partner-primary)',
    },
  },

  modal: {
    outerWrapper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      top: 0,
      animation: 'modal-open-background-animation 0.2s',
      '@media-mobile': {
        display: 'none',
      },
    },
    innerWrapper: {
      backgroundColor: 'white',
      boxShadow: 'var(--shadow-overlay)',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      outline: 'none',
      overflow: 'hidden',
      padding: 48,
      width: '100%',
      animation: 'modal-open-animation 0.2s',
      '@media-mobile': {
        width: '100%',
        height: 'var(--view-height)',
        borderRadius: 0,
      },
    },
  },
  staticChecklist: {
    wrapper: {},
    listsWrapper: {
      display: 'var(--display-flex-mobile-block)',
      justifyContent: 'space-between',
    },
    list: { marginRight: 8 },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 0',
    },
    itemLabel: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-14)',
    },
    itemIcon: {
      marginRight: 4,
      width: 18,
    },
    iconAllowed: {
      color: 'green',
    },
    iconDisallowed: {
      color: 'red',
    },
    itemsList: {
      paddingTop: 16,
    },
  },
}
