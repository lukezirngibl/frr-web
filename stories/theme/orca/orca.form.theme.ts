import { FormThemeConfig } from "../../../src/theme/theme.form";

export const formTheme: Partial<FormThemeConfig> = {
  form: {
    wrapper: {
      flexShrink: 0,
      padding: '0',
      width: '100%',
    },
    content: {},
    buttonContainer: {
      alignItems: 'center',
      backgroundColor: 'var(--color-background-primary)',
      display: 'flex',
      gap: 8,
      height: 84,
      justifyContent: 'var(--flex-end-mobile-center)',
      padding: '20px var(--form-padding-horizontal)',
      width: '100%',
      '@media-mobile': {
        flexDirection: 'column-reverse',
        height: 'auto',
        padding: '32px var(--form-padding-horizontal)',
      },
    },
  },
  staticField: {
    wrapper: {
      maxWidth: 'var(--form-field-width)',
    },
    title: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-14)',
    },
    text: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-14)',
    },
  },
  row: {
    wrapper: {
      display: 'flex',
      minHeight: 64,
      marginBottom: 'var(--form-row-padding-vertical)',
      ':readonly': {
        minHeight: 28,
      },
    },
    item: {
      display: 'var(--display-flex-mobile-block)',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 64,
      ':readonly': {
        width: '100%',
        minHeight: 28,
      },
      '@media-mobile': {
        width: '100%',
        marginTop: 12,
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
  group: {
    wrapper: {
      marginBottom: 8,
    },
    descriptionText: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-16)',
      fontWeight: 400,
    },
    descriptionList: {
      marginLeft: 0,
      paddingLeft: 0,
      listStyle: 'none',
      listStylePosition: 'inside',
    },
    descriptionItem: {
      display: 'flex',
      gap: 24,
      marginBottom: 16,
    },
    title: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-24)',
      fontWeight: 400,
    },
  },
  section: {
    wrapper: {
      position: 'relative',
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 4,
      borderStyle: 'solid',
      borderColor: 'var(--color-background-secondary)',
      background: 'var(--color-background-primary)',
      padding:
        'var(--form-padding-vertical) var(--form-padding-horizontal) calc(var(--form-padding-vertical) - var(--form-row-padding-vertical))',
      margin: '0',
    },
    contentWrapper: {
      position: 'relative',
      display: 'flex',
    },
    content: {
      flexGrow: 1,
    },
    title: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-24)',
      fontWeight: 400,
      marginTop: 8,
      marginBottom: 16,
      ':readonly': {
        marginTop: 0,
        marginBottom: 20,
      },
      '@media-mobile': {
        marginRight: 32,
      },
    },

    description: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-14)',
      fontWeight: 400,
      marginBottom: 24,
    },

    introduction: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-16)',
      fontWeight: 400,
      padding: '0 0 48px',
    },
  },
  sectionRight: {
    wrapper: {
      marginTop: 3,
      fontSize: 'var(--font-size-16)',
      ':readonly': {
        minWidth: 140,
      },
      '@media-mobile': {
        position: 'absolute',
        right: 0,
        top: 0,
        minWidth: 0,
        marginTop: 0,
      },
    },
    editLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 'var(--font-size-16)',
    },
    editIcon: {
      marginRight: 8,
      width: 20,
      height: 20,
      '@media-mobile': {
        marginRight: 0,
        width: 24,
        height: 24,
      },
    },
  },
  fieldMultiInput: {
    wrapper: {},
    item: {
      display: 'flex',
      width: 'var(--form-field-width)',
    },
  },
  fieldReadOnly: {
    label: {
      color: 'var(--color-secondary)',
      flexGrow: 1,
      marginRight: 30,
      '@media-mobile': { width: '100%', marginRight: 0, paddingBottom: 8 },
    },
    item: {
      display: 'flex',
      width: 'var(--form-field-readonly-width)',
      minWidth: 'var(--form-field-readonly-width)',
    },
    value: {
      fontSize: 'var(--font-size-16)',
      marginRight: 8,
      '@media-mobile': { fontSize: 'var(--font-size-18)', paddingBottom: 8 },
    },
    valueHighlighted: {
      fontSize: 28,
      fontWeight: 600,
    },
    image: {},
    wrapper: {
      display: 'var(--display-flex-mobile-block)',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
}
