import { configureAppTheme, AppThemeConfig } from '../theme/theme'

export const storybookTheme: Partial<AppThemeConfig> = {
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
}

export const appTheme = configureAppTheme(storybookTheme)
