import { FormThemeConfig } from '../../../src/theme/theme.form'

export const formTheme: Partial<FormThemeConfig> = {
  form: {
    wrapper: {
      flexShrink: 0,
      padding: 0,
      width: '100%',
    },
    content: {
      width: '100%',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'var(--flex-end-mobile-center)',
      gap: 8,
      height: 80,
      width: '100%',
      marginTop: 32,
      padding: '0 var(--form-padding-horizontal)',
      '@media-mobile': {
        flexWrap: 'wrap',
      },
    },
  },
  row: {
    wrapper: {
      display: 'flex',
      minHeight: 'var(--form-row-height)',
      padding: '4px 0',
    },
    wrapperReadOnly: {
      minHeight: 0, // 'var(--form-field-height)',
      paddingBottom: 0,
      ':first-child': {
        paddingTop: 0,
      },
      ':last-child': {
        paddingBottom: 0,
        borderBottom: 'none',
      },
      '@media-mobile': {
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: '1px solid #DBDBDB',
      },
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 'var(--form-row-height)',
      ':readonly': {
        width: '100%',
        minHeight: 0,
        paddingTop: 'var(--form-padding-vertical)',
        paddingBottom: 'var(--form-padding-vertical)',
      },
      '@media-mobile': {
        width: '100%',
        marginTop: 12,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 16,
        gap: 24,
      },
    },
  },
  group: {
    wrapper: {
      marginBottom: 8,
    },
    descriptionText: {
      color: 'var(--color-primary)',
      fontSize: 'var(--font-size-p)',
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
      '@media-mobile': {
        gap: 8,
      },
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
      background: 'var(--color-background-primary)',
      borderRadius: 4,
      boxShadow: '0 0 8px 8px rgb(0 0 0 / 2%)',
      margin: '0',
      marginBottom: 8,
      padding: 'var(--form-section-padding)',
      '@media-mobile': {
        borderRadius: 0,
        boxShadow: 'none',
        marginBottom: 0,
      },
    },
    contentWrapper: {
      position: 'relative',
      display: 'flex',
    },
    content: {
      flexGrow: 1,
    },
    contentCardWrapper: {
      margin: '-16px -24px',
      padding: '16px 24px',
      background: '#FAFAFA',
      border: '1px solid #DBDBDB',
      borderRadius: 4,
    },
    title: {
      color: 'var(--color-primary)',
      fontSize: 'var(--font-size-title)',
      fontWeight: 400,
      marginBottom: 8,
      ':readonly': {
        marginBottom: 20,
      },
      '@media-mobile': {
        marginRight: 32,
        marginBottom: 24,
      },
    },
    emptyTitleWrapperMobile: {
      '@media-mobile': {
        marginBottom: 0,
      },
    },
    description: {
      color: 'var(--color-secondary)',
      fontSize: 'var(--font-size-p)',
      fontWeight: 400,
      marginTop: 16,
      marginBottom: 8,
    },
    introduction: {
      fontSize: 'var(--font-size-p)',
      marginBottom: 24,
    },
  },
  sectionRight: {
    wrapper: {
      marginTop: 3,
      ':readonly': {
        width: 240,
        minWidth: 240,
      },
      '@media-mobile': {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 'auto',
        minWidth: 'unset',
        marginTop: 0,
        ':disabled': {
          display: 'none',
        },
      },
    },
    editLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 'var(--font-size-p)',
      color: 'var(--color-disabled)',
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
      gap: 8,
    },
  },
  fieldReadOnly: {
    label: {
      color: 'var(--color-secondary)',
      width: 400,
      fontSize: 'var(--font-size-p)',
      fontWeight: 100,
      marginRight: 30,
      lineHeight: 1.2,
      '@media-mobile': {
        marginRight: 16,
        maxWidth: 160,
        width: '100%',
      },
    },
    labelFullwidth: {
      '@media-mobile': {
        maxWidth: 'unset',
        marginRight: 0,
      },
    },
    item: {
      minWidth: 192,
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      '@media-mobile': {
        paddingBottom: 0,
      },
    },
    itemFullwidth: {
      '@media-mobile': {
        justifyContent: 'flex-start',
        paddingTop: 16,
      },
    },
    value: {
      fontSize: 'var(--font-size-p)',
      fontWeight: 600,
      textAlign: 'right',
      marginRight: 8,
      '@media-mobile': {
        textAlign: 'left',
        marginRight: 0,
      },
      ':last-child': {
        marginRight: 0,
      },
    },
    valueHighlighted: {
      fontSize: 'calc(var(--font-size-p) * 1.1)',
      fontWeight: 600,
      color: '#0B9DBE',
    },
    image: {
      maxWidth: 112,
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    wrapperFullwidth: {
      display: 'var(--display-flex-mobile-block)',
    },
  },
}
