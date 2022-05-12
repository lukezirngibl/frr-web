import { FormThemeConfig } from "../../../src/form/theme/theme";

export const formTheme: Partial<FormThemeConfig> = {
  form: {
    wrapper: {
      flexShrink: 0,
      padding: '0',
      width: '100%',
    },
    content: {
      width: '100%',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'var(--flex-end-mobile-center)',
      backgroundColor: 'var(--color-background-primary)',
      marginTop: 32,
      height: 84,
      width: '100%',
      '@media-mobile': {
        flexWrap: 'wrap',
      },
    },
  },
  row: {
    wrapper: {
      borderBottom: 'var(--form-row-bottom-border)',
      display: 'flex',
      minHeight: 'var(--form-row-height)',
      padding: '4px 0',
    },
    item: {
      display: 'var(--display-flex-mobile-block)',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 'var(--form-row-height)',
      ':readonly': {
        width: '100%',
      },
      '@media-mobile': {
        width: '100%',
        marginTop: 12,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 24,
      },
    },
  },
  group: {
    wrapper: {
      marginBottom: 8,
    },
    description: {
      color: 'var(--color-primary)',
      fontSize: 'var(--font-size-p)',
      fontWeight: 400,
    },
    title: {
      color: 'var(--color-primary)',
      fontSize: 'var(--font-size-title)',
      fontWeight: 400,
    },
  },
  section: {
    wrapper: {
      position: 'relative',
      display: 'flex',
      margin: '0',
      padding: 'var(--form-padding-vertical) 0',
    },
    contentWrapper: {
      width: '100%',
    },
    content: {
      width: '100%',
    },
    title: {
      color: 'var(--color-primary)',
      fontSize: 'var(--font-size-title)',
      fontWeight: 400,
      marginTop: 16,
      marginBottom: 8,
      ':readonly': {
        marginBottom: 20,
      },
      '@media-mobile': {
        marginRight: 32,
      },
    },
    description: {
      color: 'var(--color-primary)',
      fontSize: 'var(--font-size-p)',
      fontWeight: 400,
      marginBottom: 8,
    },
    introduction: {},
  },
  sectionRight: {
    wrapper: {
      marginTop: 3,
      ':readonly': {
        width: 140,
      },
      '@media-mobile': {
        position: 'absolute',
        right: 8,
        top: 16,
        width: 'auto',
        marginTop: 0,
      },
    },
    editLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 'var(--font-size-p)',
    },
    editIcon: {
      marginRight: 8,
      width: 20,
      height: 20,
      '@media-mobile': {
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
      alignItems: 'center',
    },
  },
  fieldReadOnly: {
    label: {
      color: 'var(--color-secondary)',
      width: 400,
      fontSize: 'var(--font-size-p)',
      fontWeight: 100,
      marginRight: 30,
      '@media-mobile': { width: '100%', marginRight: 0, paddingBottom: 8 },
    },
    item: {
      minWidth: 192,
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      '@media-mobile': {
        justifyContent: 'flex-start',
        paddingBottom: 8,
      },
    },
    value: {
      fontSize: 'var(--font-size-p)',
      fontWeight: 600,
      textAlign: 'right',
      '@media-mobile': {
        textAlign: 'left',
      },
    },
    valueHighlighted: {
      fontSize: 'calc(var(--font-size-p) * 1.6)',
      fontWeight: 600,
    },
    image: {
      maxWidth: 112,
    },
    wrapper: {
      display: 'var(--display-flex-mobile-block)',
      alignItems: 'center',
      minHeight: 'var(--form-row-height)',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
}
