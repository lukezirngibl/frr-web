import { ComponentThemeConfig } from '../../../src/theme/theme.components'

export const componentTheme: Partial<ComponentThemeConfig> = {
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
      borderRadius: 6,
      boxShadow: 'var(--shadow-overlay)',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      outline: 'none',
      overflow: 'hidden',
      padding: 24,
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
    wrapper: {
      // backgroundColor: 'rgba(0,0,0,0.03)',
      // padding: 32,
      // borderRadius: 8,
      marginBottom: 48,
      // '@media-mobile': {
      //   padding: '32px 16px',
      // },
    },
    title: {
      fontSize: 'var(--font-size-h2)',
      marginBottom: 32,
    },
    description: {
      fontSize: 'var(--font-size-p)',
    },
    listsWrapper: {
      display: 'flex',
      alignItems: 'start',
      '@media-mobile': {
        flexWrap: 'wrap',
      },
    },
    list: {
      marginTop: 32,
      marginRight: 64,
      '@media-mobile': { marginRight: 32 },
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 0',
    },
    itemLabel: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-p)',
    },
    itemIcon: {
      marginRight: 4,
      width: 18,
    },
    iconAllowed: {
      color: 'green',
    },
    iconDisallowed: {
      color: 'var(--color-error)',
    },
    itemsList: {
      paddingTop: 16,
    },
  },
  popoverWithItems: {
    wrapper: {
      boxShadow: 'var(--shadow-overlay)',
      backgroundColor: 'var(--color-background-hover)',
      border: '1px solid var(--color-form-field-border)',
      borderRadius: 'var(--form-field-border-radius)',
    },
    item: {
      minWidth: 168,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      lineHeight: '42px',
      padding: '8px 16px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: 'var(--color-form-field-background)',
      },
    },
  },
  popoverDropdown: {
    icon: {
      marginLeft: 8,
      marginBottom: -2,
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 72,
      padding: '0 16px',
      borderRadius: 8,
      marginLeft: 24,
      backgroundColor: 'white',
      height: 36,
      cursor: 'pointer',
      '@media-mobile': {
        minWidth: 0,
        marginLeft: 16,
      },
    },
    burgerMenuButton: {
      width: 36,
    },
    label: {
      color: 'black',
      fontSize: 16,
      textAlign: 'left',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
  datePicker: {
    wrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: 'var(--form-field-width)',
      display: 'flex',
      alignItems: 'center',
    },
    inputWrapper: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRightWidth: 0,
    },
    iconWrapper: {
      alignItems: 'center',
      borderColor: 'var(--color-form-field-border)',
      borderTopRightRadius: 'var(--form-field-border-radius)',
      borderBottomRightRadius: 'var(--form-field-border-radius)',
      borderStyle: 'solid',
      borderWidth: 1,
      color: 'var(--color-input)',
      cursor: 'pointer',
      display: 'flex',
      flexBasis: 80,
      height: 'var(--form-field-height)',
      justifyContent: 'center',
      position: 'relative',
    },
    iconWrapperFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
    },
    hook1: {
      display: 'none',
    },
    hook2: {
      display: 'none',
    },
    disabledInput: {
      color: 'var(--color-disabled)',
    },
    errorHook: {},
    errorWrapper: {
      borderColor: 'var(--color-error)',
    },
    reactDatePicker: `
    & .react-datepicker {
      font-family: var(--font-family);
      top: calc(var(--form-field-height) + 4px);
      border-radius: var(--form-field-border-radius);
      box-shadow: 2px 2px 8px rgba(0,145,178, 0.25), 0 -1px 4px rgba(0,145,178, 0.05);
    }
    
    & .react-datepicker__header {
      background-color: var(--color-background-secondary);
      padding-top: 16px;
    
      & .react-datepicker__current-month {
        font-size: var(--font-size-p);
      }
    }
    
    & .react-datepicker__header__dropdown {
      margin: 16px 0;
      & select {
        border: 1px solid rgb(204, 204, 204);
        border-radius: 0;
        padding: 6px 8px 4px;
        font-size: var(--font-size-p);
      }
    }
    
    & .react-datepicker__navigation {
      border-width: 1rem;
    }
    
    & .react-datepicker__day-name {
      font-size: var(--font-size-p);
      font-weight: 500;
      width: 34px;
      line-height: var(--font-size-p);
      padding: 9px 0 7px;
      margin: 4px;
    }
    & .react-datepicker__day {
      font-size: var(--font-size-p);
      width: 34px;
      line-height: var(--font-size-p);
      padding: 9px 0 7px;
      margin: 4px;
      border: 1px solid transparent;
      border-radius: var(--form-field-border-radius);
      :hover {
        border-radius: var(--form-field-border-radius);
        background-color: var(--color-hover);
      }
    }
    & .react-datepicker__day--outside-month {
      color: var(--color-disabled);
    }
    & .react-datepicker__day--selected {
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
      border-radius: var(--form-field-border-radius);
      background-color: var(--color-background-primary);
      font-weight: 700;

      :hover {
        background-color: var(--color-hover);
      }
    }
    `,
  },
  slider: {
    input: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--color-input)',
      textAlign: 'right',
    },
    inputWrapper: {
      width: '100%',
      maxWidth: 'unset',
    },
    label: {
      maxWidth: 'calc(100% - var(--calculator-field-width) - 4px)',
    },
    prefix: {
      fontSize: 'var(--font-size-label)',
      fontWeight: 400,
      color: 'var(--color-secondary)',
    },
    postfix: {
      fontSize: 'var(--font-size-label)',
      fontWeight: 400,
      color: 'var(--color-secondary)',
    },
    value: {
      fontSize: 'var(--font-size-title)',
      fontWeight: 700,
      color: 'var(--color-input)',
      textOverflow: 'unset',
      textAlign: 'right',
    },
    valueWrapper: {
      alignItems: 'baseline',
      display: 'flex',
      gap: 8,
      paddingTop: 'var(--form-field-mobile-padding)',
      position: 'absolute',
      right: 0,
      top: -4,
    },
    valueWrapperEditable: {
      maxWidth: 'var(--calculator-field-width)',
      top: -16,
    },
    wrapper: {
      margin: '16px 0 32px',
      width: '100%',
      '@media-mobile': {
        margin: '8px 0 24px',
      },
    },
  },
  materialSlider: {
    root: {
      color: 'var(--color-accent)',
    },
    thumb: {
      marginLeft: -12,
      backgroundColor: 'var(--color-accent)',
      ':active': {
        backgroundColor: 'var(--color-accent)',
      },
      ':focus': {
        backgroundColor: 'var(--color-background-accent)',
      },
      ':hover': {
        background: 'var(--color-background-accent)',
      },
    },
    track: {
      borderRadius: 3,
    },
    rail: {
      borderRadius: 3,
    },
    markLabel: {
      color: 'var(--color-secondary)',
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
      fontWeight: 100,
      fontSize: 'var(--font-size-label)',
    },
    labelTextError: {
      color: 'var(--color-error)',
    },
    errorIcon: {
      position: 'absolute',
      left: -28,
      top: 1,
      color: 'var(--color-error)',
      '@media-mobile': {
        left: -24,
      },
    },
    errorLabel: {
      color: 'var(--color-error)',
      fontSize: 'var(--font-size-sublabel)',
    },
    errorButton: {
      color: 'var(--color-error)',
      cursor: 'pointer',
      marginTop: 8,
    },
    errorButtonIcon: {
      marginRight: 8,
      width: 20,
      height: 20,
    },
    sublabelText: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-sublabel)',
    },
    descriptionPopup: {
      position: 'absolute',
      top: 28,
      left: -16,
      boxShadow: 'var(--shadow-overlay)',
      border: '1px solid var(--color-form-field-border)',
      padding: '16px 24px',
      backgroundColor: 'var(--color-background-primary)',
      minWidth: 400,
      maxWidth: 660,
      zIndex: 9999,
      '@media-mobile': {
        minWidth: 'calc(100vw - 48px)',
        top: 40,
        left: -8,
      },
    },
    descriptionText: {
      fontSize: 'var(--font-size-p)',
      color: 'var(--color-secondary)',
    },
    descriptionIconWrapper: {
      position: 'relative',
      display: 'inline-block',
      opacity: 0.7,
      cursor: 'pointer',
      minWidth: 22,
      marginLeft: 6,
      '@media-mobile': {
        minWidth: 20,
      },
    },
    descriptionIcon: {
      position: 'absolute',
      bottom: -5,
      width: 22,
      height: 22,
      '@media-mobile': {
        width: 20,
        height: 20,
      },
    },
    wrapper: {
      paddingTop: 'var(--form-field-mobile-padding)',
      paddingBottom: 'var(--form-field-mobile-padding)',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flexGrow: 1,
      marginRight: 32,
      '@media-mobile': {
        paddingBottom: 8,
        marginRight: 0,
      },
    },
  },
  codeInput: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      margin: '16px 0',
      width: 'var(--form-field-width)',
      '@media-mobile': {
        margin: '0 0 32px',
      },
    },
    input: {
      border: '1px solid var(--color-form-field-border)',
      borderRadius: 'var(--form-field-border-radius)',
      caretColor: 'transparent',
      color: 'var(--color-input)',
      cursor: 'pointer',
      fontSize: 24,
      fontWeight: 700,
      height: 56,
      marginRight: 8,
      padding: 0,
      textAlign: 'center',
      transition: 'border 0.1s',
      width: 36,
      ':hover': {
        borderColor: 'var(--color-form-field-border-focus)',
      },
      ':focus': {
        outline: 0,
        background: 'transparent',
        borderColor: 'var(--color-form-field-border-focus)',
      },
    },
  },
  toggle: {
    wrapper: {
      border: '1px solid transparent',
      background: 'var(--color-form-field-border)',
      height: 32,
      margin: '0 24px',
      transition: 'border 0.1s, background 0.2s',
      ':hover': {
        borderColor: 'var(--color-form-field-border-focus)',
      },
      '@media-mobile': {
        marginTop: 8,
        marginLeft: 'auto',
        marginRight: 0,
        ':hover': {
          borderColor: 'transparent',
        },
      },
    },
    wrapperActive: {
      borderColor: 'var(--color-active)',
      backgroundColor: 'var(--color-active)',
      flexDirection: 'row-reverse',
    },
    wrapperFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
      '@media-mobile': {
        borderColor: 'transparent',
      },
    },
    circle: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'white',
      height: 25,
      width: 25,
    },
  },
  radioGroup: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minWidth: 'var(--form-field-width)',
      width: 'var(--form-field-width)',
      gap: 24,
      '@media-mobile': {
        width: '100%',
        minWidth: '100%',
        marginTop: 16,
        gap: 4,
      },
    },
    wrapperVertical: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    radioOuterError: {
      borderColor: 'var(--color-error)',
    },
    radioOuter: {
      position: 'relative',
      width: 20,
      height: 20,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      border: '2px solid var(--color-form-field-border)',
      backgroundColor: 'var(--color-form-field-background)',
      transition: 'border 0.1s',
      ':hover': {
        borderColor: 'var(--color-form-field-border-focus)',
      },
    },
    radioOuterActive: {
      backgroundColor: 'var(--color-active)',
      borderColor: 'var(--color-active)',
    },
    radioOuterFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
      '@media-mobile': {
        borderColor: 'var(--color-active)',
      },
    },
    radioInner: {
      backgroundColor: 'white',
      width: 8,
      height: 8,
      border: 'none',
    },
    radioInnerActive: {
      backgroundColor: 'white',
    },
    item: {
      flexDirection: 'row-reverse',
      fontSize: 'var(--font-size-input)',
      justifyContent: 'flex-end',
      minWidth: 180,
      paddingBottom: 'var(--form-field-mobile-padding)',
      paddingLeft: 12,
      width: 'fit-content',
      ':last-child': {
        paddingLeft: 0,
      },
      '@media-mobile': {
        minWidth: 120,
        paddingLeft: 8,
        width: '50%',
      },
    },
    itemVerticalActive: {
      border: '2px solid var(--color-active)',
      background: 'rgba(238, 248, 250, 1)',
    },
    itemVertical: {
      border: '1px solid var(--color-form-field-border)',
      borderRadius: 4,
      fontWeight: 700,
      minHeight: 72,
      padding: '24px 24px',
      width: '480px',
      transition: 'border 0.1s',
      ':last-child': {
        paddingLeft: 24,
      },
      '@media-mobile': {
        padding: '16px 24px',
        width: '100%',
      },
    },
    icon: {
      marginLeft: 24,
      width: 24,
      height: 24,
    },
    labelWrapper: {
      paddingLeft: 24,
      fontWeight: 'inherit',
    },
    label: {
      color: 'var(--color-input)',
      lineHeight: '18px',
    },
    sublabel: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-sublabel)',
      fontWeight: 400,
      marginTop: 8,
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
      zIndex: 0,
      backgroundColor: 'var(--color-background-primary)',
    },
    wrapperFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
    },
    icon: {
      // position: 'absolute',
      // right: 16,
      // top: 0,
      // bottom: 0,
      display: 'flex',
      alignItems: 'center',
      color: 'var(--color-input)',
      opacity: 0.6,
    },
    iconMobile: {
      position: 'absolute',
      right: 20,
      top: 'calc((var(--form-field-height)  - 24px) / 2)',
      zIndex: -1,
    },
    menu: {
      position: 'absolute',
      width: '100%',
      backgroundColor: 'var(--color-background-hover)',
      border: '1px solid var(--color-form-field-border)',
      boxShadow: 'var(--shadow-overlay)',
      marginLeft: -2,
      marginTop: -3,
      marginBottom: 4,
      borderRadius: 'var(--form-field-border-radius)',
      overflow: 'hidden',
      zIndex: 1,
    },
    option: {
      cursor: 'pointer',
      display: 'block',
      fontSize: 'inherit',
      padding: '16px 16px',
      width: '100%',
      userSelect: 'none',
      paddingLeft: 28,
      transition: 'background-color 20ms color 20ms',
      ':disabled': {
        backgroundColor: 'transparent',
        color: 'var(--color-disabled)',
        cursor: 'default',
      },
    },
    optionHover: {
      backgroundColor: 'var(--color-form-field-background)',
      // color: 'white',
    },
    optionActive: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
    },
    placeholder: {
      color: 'var(--color-disabled)',
      fontWeight: 400,
    },
    select: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderColor: 'var(--color-form-field-border)',
      borderRadius: 'var(--form-field-border-radius)',
      borderStyle: 'solid',
      borderWidth: 1,
      boxShadow: undefined,
      boxSizing: 'border-box',
      color: 'var(--color-input)',
      cursor: 'pointer',
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: 'var(--font-size-input)',
      height: 'var(--form-field-height)',
      justifyContent: 'space-between',
      minHeight: 38,
      outline: '0 !important',
      padding: '0 var(--form-field-padding-horizontal)',
      position: 'relative',
      textOverflow: 'ellipsis',
      transition: 'all 100ms',
      width: 'var(--form-field-width)',
      zIndex: 10,
      '@media-mobile': {
        paddingRight: 48,
      },
      ':hover': {
        borderColor: 'var(--color-form-field-border-focus)',
      },
    },
    valueContainer: { padding: 0, fontSize: 'var(--font-size-input)' },
    value: {
      fontSize: 'var(--font-size-input)',
      fontWeight: 700,
      marginRight: 42,
    },
  },
  textInput: {
    errorWrapper: {
      borderColor: 'var(--color-error)',
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
      paddingLeft: 'var(--form-field-padding-horizontal)',
      color: 'var(--color-disabled)',
      fontSize: 'var(--font-size-input)',
      lineHeight: 1,
    },
    postfix: {
      paddingRight: 'var(--form-field-padding-horizontal)',
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-input)',
      lineHeight: 1,
    },
    wrapper: {
      display: 'flex',
      alignItems: 'baseline',
      height: 'var(--form-field-height)',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 'var(--form-field-border-radius)',
      borderColor: 'var(--color-form-field-border)',
      width: '100%',
      maxWidth: 'var(--form-field-width)',
      position: 'relative',
      transition: 'border 0.1s',
      ':hover': {
        borderColor: 'var(--color-form-field-border-focus)',
      },
      ':disabled': {
        borderColor: 'var(--color-form-field-border)',
      },
    },
    wrapperCurrency: {
      maxWidth: 180,
      marginRight: 'calc(var(--form-field-width) - 180px)',
    },
    wrapperFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
    },
    input: {
      width: '100%',
      height: '100%',
      border: 0,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: 'var(--color-input)',
      paddingLeft: 'var(--form-field-padding-horizontal)',
      paddingRight: 'var(--form-field-padding-horizontal)',
      fontSize: 'var(--font-size-input)',
      fontWeight: 700,
      textOverflow: 'ellipsis',
    },
    inputPlaceholder: {
      color: 'var(--color-disabled)',
      fontWeight: 400,
    },
    hook: {
      display: 'none',
    },
    disabledInput: {
      color: 'var(--color-disabled)',
    },
    disabledWrapper: {},
    errorInput: {},
  },
  textArea: {
    wrapper: {},
    input: {
      color: 'var(--color-input)',
    },
    disabled: {},
  },
  optionGroup: {
    wrapper: {
      backgroundColor: 'white',
      width: 'var(--form-field-width)',
      cursor: 'pointer',
      gap: 8,
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      height: 'var(--form-field-height)',
      color: 'var(--color-secondary)',
      border: '1px solid var(--color-form-field-border)',
      borderRadius: 'var(--form-field-border-radius)',
      transition: 'border 0.1s',
      ':hover': {
        borderColor: 'var(--color-form-field-border-focus)',
        color: 'var(--color-input)',
      },
      ':disabled': {
        borderColor: 'var(--color-form-field-border)',
      },
      ':first-child': {
        marginLeft: 0,
      },
      ':last-child': {
        marginRight: 0,
      },
    },
    itemActive: {
      boxShadow: 'inset 0 0 0 3px var(--color-active)',
      borderColor: 'transparent',
      boxSizing: 'content-box',
      color: 'var(--color-input)',
      zIndex: 1,
    },
    itemFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
      color: 'var(--color-input)',
    },
    itemDisabled: {
      backgroundColor: 'var(--color-disabled)',
      cursor: 'default',
    },
    label: {
      textAlign: 'center',
      fontSize: 'var(--font-size-input)',
      color: 'inherit',
      transition: 'color 0.2s',
    },
    labelActive: {
      fontWeight: 700,
      color: 'var(--color-input)',
    },
  },

  button: {
    common: {
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-family)',
      height: 'var(--button-height)',
      outline: 'none',
      transition: 'all 0.7s ease',
      display: 'flex',
      alignItems: 'center',
      // marginLeft: 8,
      // marginRight: 8,
      '@media-mobile': {
        width: '100%',
        marginTop: 8,
        minHeight: 'var(--button-height)',
        height: 'auto',
        padding: 8,
      },
      ':hover': {
        filter: 'brightness(80%)',
      },
      ':focus': {
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.35), 0 -2px 8px rgba(0, 0, 0, 0.05)',
      },
    },
    chromeless: {
      background: 'transparent',
      color: 'black',
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-primary)',
      fontWeight: 700,
      borderColor: 'transparent',
      borderRadius: 'var(--button-border-radius)',
      minWidth: 'var(--button-width)',
      padding: '0 32px',
      '@animation': 'button-primary-animation 200ms ease-out',

      ':disabled': {
        opacity: 0.6,
        pointerEvents: 'none',
      },
      ':focus': {
        filter: 'brightness(80%)',
      },
    },
    primaryLabel: {
      color: 'var(--color-button-primary)',
    },
    label: {
      fontSize: 'var(--button-font-size)',
      fontWeight: 500,
      lineHeight: 1,
      marginBottom: '0.1rem',
      textTransform: 'none',
    },
    secondary: {
      backgroundColor: 'var(--color-background-button-default)',
      color: 'var(--color-primary)',
      borderColor: 'transparent',
      borderRadius: 'var(--button-border-radius)',
      padding: '0 32px',
      fontSize: 'var(--button-font-size)',
      '@animation': 'button-secondary-animation 200ms ease-out',
    },
    spinner: {},
  },
  pdfViewer: {
    pdfWrapper: {
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: 68,
    },
    downloadButton: {
      width: 56,
      height: 56,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 16,
      borderRadius: 4,
      right: 16,
      background: 'white',
      boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.08)',
      zIndex: 11,
      '@media-mobile': {
        position: 'fixed',
        bottom: 16,
        right: 8,
      },
    },
    closeButton: {
      display: 'flex',
      position: 'absolute',
      left: 16,
      bottom: 16,
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: 'var(--color-background-primary)',
      boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.08)',
      zIndex: 11,
      '@media-mobile': {
        display: 'flex',
        position: 'fixed',
        bottom: 16,
        left: 8,
      },
    },
    pageSelectorWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: 88,
      padding: '16px 0',
      background: 'rgba(0, 0, 0, 0.7)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 10,
      '@media-mobile': {
        position: 'fixed',
      },
    },
    pageSelector: {
      width: 192,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 4,
      backgroundColor: 'white',
      boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.08)',
      height: 56,
      zIndex: 10,
      '@media-mobile': {
        width: 'calc(100% - 144px)',
      },
    },
    pageNumber: {
      fontSize: 18,
    },
  },

  // File Upload

  fileInput: {
    wrapper: {
      minHeight: 100,
      maxWidth: 'var(--form-field-width)',
      margin: '8px 0',
      width: '100%',
    },
  },
  uploadDropzone: {
    container: {
      alignItems: 'center',
      backgroundColor: 'var(--color-form-field-background)',
      border: '2px dashed var(--color-form-field-border)',
      borderRadius: 'var(--form-field-border-radius)',
      color: 'var(--color-disabled)',
      cursor: 'pointer',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: 'var(--form-field-width)',
      height: 84,
      margin: '8px 0',
      outline: 'none',
      padding: '20px',
      width: '100%',
      transition: 'border 0.24s ease-in-out, background-color 0.3s ease-out',
      ':hover': {
        borderColor: 'var(--color-form-field-border-focus)',
      },
      ':focus': {
        borderColor: 'var(--color-form-field-border-focus)',
      },
    },
    dropzoneSublabel: {
      fontSize: 'var(--font-size-sublabel)',
      width: '100%',
      marginTop: 8,
      textAlign: 'center',
    },
    acceptedFileItem: {
      flexGrow: 1,
      display: 'inline-block',
      fontSize: 'var(--font-size-input)',
      lineHeight: 1.1,
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    acceptedFilesLabel: {
      fontSize: 'var(--font-size-sublabel)',
      color: 'var(--toastify-color-success)',
      marginBottom: 8,
    },
    rejectedFilesLabel: {
      fontSize: 'var(--font-size-sublabel)',
      color: 'var(--color-error)',
      marginBottom: 8,
    },
    errorMessage: {
      color: 'var(--color-error)',
      fontSize: 'var(--font-size-sublabel)',
      marginTop: 8,
      width: '100%',
    },
    section: {
      paddingTop: 20,
      width: '100%',
    },
    sectionSingleItem: {
      paddingTop: 0,
      marginBottom: 24,
    },
    imageItem: {
      marginRight: '10px',
      width: '40px',
      height: '40px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: 'var(--form-field-width)',
      height: 48,
      padding: '8px var(--form-field-padding-horizontal) 8px',
      border: '1px solid var(--color-form-field-border)',
      borderRadius: 'var(--form-field-border-radius)',
      marginBottom: 8,
    },
    listSingleItem: {
      marginBottom: 0,
    },
    removeItemIcon: {
      color: 'var(--color-error)',
      cursor: 'pointer',
      display: 'inline-block',
      height: 24,
      width: 24,
      minWidth: 24,
      marginLeft: 12,
    },
  },

  // Icons
  icon: {
    edit: {
      svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path fill="currentColor" stroke="none" d="M26 1.067l-23.067 23.067-1.6 6.533 6.533-1.6 23.067-23.067-4.933-4.933zM29.067 6l-1.733 1.733-3.067-3.067 1.733-1.733 3.067 3.067zM26.4 8.667l-18.267 18.267-3.067-3.067 18.267-18.267 3.067 3.067zM3.067 28.933l1.067-4 3.067 3.067-4.133 0.933z"></path></g></svg>',
    },
    info: {
      svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-7 -7 46 46"><circle cx="16" cy="16" r="20" strokeWidth="2" stroke="currentColor" fill="none" /><path fill="currentColor" stroke="none" d="M17.333 25.333v-16h-4.667v2.667h2v13.333h-2v2.667h6.667v-2.667z"></path><path fill="currentColor" stroke="none" d="M14.667 4h2.667v2.667h-2.667v-2.667z"></path></svg>',
    },
  },
}
