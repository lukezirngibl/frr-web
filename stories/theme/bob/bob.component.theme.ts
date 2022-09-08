import { ComponentTheme } from '../../../src/theme/theme.components'

export const componentTheme: Partial<ComponentTheme> = {
  modal: {
    outerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerWrapper: {
      boxShadow:
        '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
      width: '100%',
      backgroundColor: 'white',
      padding: 24,
      borderRadius: 0,
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      outline: 'none',
    },
  },
  staticChecklist: {
    wrapper: {
      backgroundColor: 'rgba(0,0,0,0.03)',
      padding: 32,
      borderRadius: 8,
      marginBottom: 16,
      '@media-mobile': {
        padding: '32px 16px',
      },
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
    wrapper: {},
    item: {
      minWidth: 168,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      lineHeight: '42px',
      padding: '0 16px',
      cursor: 'pointer',
    },
    popover: {},
    itemLabel: {},
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
      borderRadius: 24,
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
    wrapperFocus: {},
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
    errorInput: {},
    errorHook: {},
    errorWrapper: {
      borderColor: 'var(--color-error)',
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
      border-radius: 0;
      :hover {
        border-radius: 0;
        background-color: var(--color-hover);
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
        background-color: var(--color-hover);
      }
    }
    `,
  },
  slider: {
    label: {},
    outerWrapper: {},
    prefix: {
      fontSize: 18,
      fontWeight: 400,
      color: 'var(--color-disabled)',
    },
    postfix: {
      fontSize: 18,
      fontWeight: 400,
      color: 'var(--color-disabled)',
    },
    value: {
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--color-input)',
    },
    valueWrapper: {
      position: 'absolute',
      right: 8,
      top: -4,
      paddingTop: 'var(--form-field-mobile-padding)',
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
    valueWrapperEditable: {
      maxWidth: 160,
      top: -14,
    },
    wrapper: {
      margin: '16px 0 32px',
      width: '100%',
      paddingLeft: 8,
    },
  },
  materialSlider: {
    root: {
      color: 'var(--color-accent)',
    },
    thumb: {
      backgroundColor: 'var(--color-accent)',
    },
  },
  label: {
    labelTextWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    labelTextError: {
      color: 'var(--color-error)',
    },
    labelText: {
      color: 'var(--color-secondary)',
      fontWeight: 100,
      fontSize: 'var(--font-size-label)',
      '@media-mobile': {
        marginTop: 8,
        marginBottom: 8,
      },
    },
    labelTextFocus: {
      fontWeight: 500,
    },
    errorIcon: {
      opacity: 0.7,
      marginRight: 8,
    },
    errorLabel: {
      color: 'var(--color-error)',
      fontSize: 'var(--font-size-sublabel)',
      marginBottom: 8,
      '@media-mobile': {
        marginTop: 8,
      },
    },
    sublabelText: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-sublabel)',
      marginTop: 4,
      marginBottom: 4,
      '@media-mobile': {
        marginTop: 0,
        marginBottom: 8,
      },
    },
    descriptionPopup: {
      boxShadow: '1px 1px 4px rgba(0,0,0,0.3)',
      padding: 8,
      zIndex: 10,
      backgroundColor: 'var(--color-background-primary)',
      minWidth: 400,
      left: 'auto',
    },
    descriptionText: {
      fontSize: 'var(--font-size-p)',
    },
    descriptionIconWrapper: {
      opacity: 0.7,
      cursor: 'pointer',
      minWidth: 18,
    },
    descriptionIcon: {
      width: 18,
      height: 18,
      marginBottom: -2,
    },
    wrapper: {
      paddingTop: 'var(--form-field-mobile-padding)',
      paddingBottom: 'var(--form-field-mobile-padding)',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flexGrow: 1,
      marginRight: 32,
    },
  },
  codeInput: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      margin: '16px 0',
      '@media-mobile': {
        margin: '0 0 32px',
      },
    },
    input: {
      border: '1px solid rgba(0, 0, 0, 0.3)',
      borderRadius: 'var(--form-field-border-radius)',
      caretColor: 'transparent',
      color: 'var(--color-input)',
      cursor: 'pointer',
      fontSize: 24,
      height: 56,
      marginRight: 8,
      padding: 0,
      textAlign: 'center',
      width: 36,

      ':focus': {
        outline: 0,
        background: 'transparent',
        borderColor: 'var(--color-accent)',
      },
    },
  },
  toggle: {
    wrapper: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(0,0,0,0.5)',
    },
    wrapperActive: {
      borderColor: 'var(--color-active)',
      backgroundColor: 'var(--color-active)',
      flexDirection: 'row-reverse',
    },
    wrapperFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
    },
    circle: {
      height: 24,
      width: 24,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(0,0,0,0.5)',
    },
    circleActive: {
      borderColor: 'white',
      backgroundColor: 'white',
    },
  },
  radioGroup: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minWidth: 'var(--form-field-width)',
      gap: 24,
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
      transition: 'border 0.3s ease-out, background-color 0.1s ease-out',
    },
    radioOuterActive: {
      backgroundColor: 'var(--color-active)',
      borderColor: 'var(--color-active)',
    },
    radioOuterError: {
      borderColor: 'var(--color-error)',
    },
    radioOuterFocus: {
      borderColor: 'var(--color-accent)',
    },
    radioInner: {
      backgroundColor: 'white',
      width: 8,
      height: 8,
      transition: 'background-color 0.1s ease-out',
    },
    radioInnerActive: {
      backgroundColor: 'white',
    },
    item: {
      flexDirection: 'row-reverse',
      width: 112,
      padding: '0 24px var(--form-field-mobile-padding) 20px',
      justifyContent: 'flex-end',
      fontSize: 'var(--font-size-input)',
    },
    label: {
      paddingLeft: 12,
      lineHeight: '18px',
      color: 'var(--color-input)',
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
      position: 'absolute',
      right: 16,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontSize: 'var(--font-size-title)',
      color: 'var(--color-input)',
      opacity: 0.6,
    },
    iconMobile: {
      right: 20,
      zIndex: -1,
    },
    menu: {
      backgroundColor: 'var(--color-form-field-background)',
      borderRadius: 'var(--form-field-border-radius)',
      boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)',
      marginBottom: 4,
      marginLeft: -4,
      marginTop: -4,
      overflow: 'hidden',
      position: 'absolute',
      width: '100%',
      zIndex: 1,
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
      textTransform: 'capitalize',
      transition: 'all 100ms',
      width: 'var(--form-field-width)',
      zIndex: 10,
    },
    option: {
      cursor: 'pointer',
      display: 'block',
      fontSize: 'inherit',
      padding: '16px 16px',
      width: '100%',
      userSelect: 'none',
      paddingLeft: 28,
      transition: 'background-color 20ms, color 20ms',
      ':disabled': {
        backgroundColor: 'transparent',
        color: 'var(--color-disabled)',
        cursor: 'default',
      },
    },
    optionHover: {
      backgroundColor: 'var(--color-background-accent)',
      color: 'white',
    },
    optionActive: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
    },
    placeholder: {},
    valueContainer: { padding: 0 },
    value: {
      fontSize: 'var(--font-size-input)',
      ':active': {
        backgroundColor: 'var(--color-accent)',
      },
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
    },
    postfix: {
      paddingRight: 'var(--form-field-padding-horizontal)',
      paddingLeft: 16,
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-input)',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      height: 'var(--form-field-height)',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 'var(--form-field-border-radius)',
      borderColor: 'var(--color-form-field-border)',
      width: '100%',
      maxWidth: 'var(--form-field-width)',
      position: 'relative',
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
    errorWrapper: {},
    wrapper: {
      backgroundColor: 'white',
      width: 'var(--form-field-width)',
      cursor: 'pointer',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#c3c3c3',
      padding: '0 4px',
      height: 'calc(var(--form-field-height) + 4px)',
      borderRadius: 'calc((var(--form-field-height) + 4px) / 2)',
    },
    wrapperFocus: {
      // borderColor: 'var(--color-form-field-border-focus)',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      height: 'calc(var(--form-field-height) - 8px)',
      margin: '0 1px',
      color: 'var(--color-input)',
      border: '2px solid var(--color-background-primary)',
      borderRadius: 'calc((var(--form-field-height) - 8px) / 2)',
      transition: 'border 0.3s ease-out, background-color 0.1s ease-out, color 0.1s ease-out',
      ':hover': {
        borderColor: 'var(--color-background-accent)',
      },
    },
    itemActive: {
      backgroundColor: 'var(--color-background-accent)',
      color: 'white',
      borderColor: 'var(--color-background-accent)',
      boxSizing: 'content-box',
      zIndex: 1,
    },
    itemFocus: {
      borderColor: 'var(--color-form-field-border-focus)',
    },
    label: {
      textAlign: 'center',
      fontSize: 'var(--font-size-input)',
      color: 'var(--color-input)',
    },
    labelActive: {
      color: 'white',
    },
  },

  button: {
    common: {
      height: 'var(--button-height)',
      cursor: 'pointer',
      border: 0,
      outline: 'none',
      fontFamily: 'var(--font-family)',
      transition: 'all ease 0.7s',
      marginLeft: 8,
      marginRight: 8,
      '@media-mobile': {
        width: '100%',
        marginTop: 16,
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
      color: 'black',
      fontWeight: 700,
      borderColor: 'transparent',
      borderRadius: 'var(--button-border-radius)',
      minWidth: 'var(--button-width)',
      padding: '0 32px',
      '@animation': 'button-primary-animation 200ms ease-out',

      ':hover': {
        // backgroundColor: 'rgb(230,170,59)',
      },
      ':focus': {
        border: '2px solid var(--color-active)',
      },

      ':disabled': {
        opacity: 0.6,
        pointerEvents: 'none',
      },
    },
    label: {
      fontSize: 'var(--button-font-size)',
      textTransform: 'none',
      fontWeight: 500,
      marginBottom: '0.1rem',
    },
    chromelessLabel: {},
    primaryLabel: {},
    secondary: {
      backgroundColor: '#E8E8E8',
      color: 'black',
      borderColor: 'rgb(195, 195, 195)',
      borderRadius: 'var(--button-border-radius)',
      padding: '0 32px',
      fontSize: 'var(--button-font-size)',
      '@animation': 'button-secondary-animation 200ms ease-out',
    },
    secondaryLabel: {},
    spinner: {},
  },
  fileInput: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  pdfViewer: {
    pdfWrapper: {
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
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
      boxShadow: '0px 0px 12px 12px rgba(0, 0, 0, 0.08)',
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
        bottom: 16,
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
  uploadDropzone: {
    container: {
      cursor: 'pointer',
      width: '400px',
      height: '80px',
      justifyContent: 'center',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border 0.24s ease-in-out',
      ':hover': {
        backgroundColor: '#f5f5f5',
      },
    },
    dropzoneLabel: {},
    dropzoneSublabel: {
      fontSize: 12,
    },
    acceptedFilesLabel: {
      fontSize: '12px',
      color: 'green',
    },
    rejectedFilesLabel: {
      fontSize: '12px',
      color: 'red',
    },
    acceptedFileItem: {
      fontSize: '12px',
    },
    rejectedFileItem: {
      fontSize: '12px',
    },
    errorMessage: {
      fontSize: '12px',
      color: 'red',
    },
    section: {
      paddingTop: '20px',
    },
    sectionSingleItem: {
      paddingTop: '0px',
      display: 'flex',
      width: '100%',
      whiteSpace: 'nowrap',
      alignItems: 'center',
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
      padding: '4px 20px 0',
    },
    listSingleItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '0 20px',
    },
    removeItemIcon: {
      color: 'red',
      cursor: 'pointer',
      marginLeft: '10px',
      paddingTop: '4px',
    },
  },
  icon: {
    edit: {
      svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path fill="currentColor" stroke="none" d="M26 1.067l-23.067 23.067-1.6 6.533 6.533-1.6 23.067-23.067-4.933-4.933zM29.067 6l-1.733 1.733-3.067-3.067 1.733-1.733 3.067 3.067zM26.4 8.667l-18.267 18.267-3.067-3.067 18.267-18.267 3.067 3.067zM3.067 28.933l1.067-4 3.067 3.067-4.133 0.933z"></path></g></svg>',
    },
    info: {
      svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-7 -7 46 46"><circle cx="16" cy="16" r="20" stroke-width="2" stroke="currentColor" fill="none" /><path fill="currentColor" stroke="none" d="M17.333 25.333v-16h-4.667v2.667h2v13.333h-2v2.667h6.667v-2.667z"></path><path fill="currentColor" stroke="none" d="M14.667 4h2.667v2.667h-2.667v-2.667z"></path></svg>',
    },
    settings: {},
  },
}
