import { configureComponentTheme, ComponentThemeConfig } from '../theme/theme.components'

export const storybookTheme: Partial<ComponentThemeConfig> = {
  button: {
    common: {
      ':hover': {
        cursor: 'pointer',
        opacity: 0.8,
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'default',
      },
    },
    primary: {
      backgroundColor: 'blue',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'gray',
      color: 'white',
    },
    chromeless: {
      backgroundColor: 'transparent',
      border: 0,
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
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: 'var(--form-field-border-radius)',
      caretColor: 'transparent',
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
        borderColor: 'var(--color-bob-primary)',
      },
    },
  },
}

export const componentTheme = configureComponentTheme(storybookTheme)
