import React, { useEffect } from 'react'
import { Button } from '../src/components'
import { configureLanguage, Language } from '../src/theme/language'
import { configureTheme, getTheme as getAppTheme } from '../src/theme/theme'

export const AppThemeContext = configureTheme({
  button: {
    chromeless: {},
    secondary: {},
    common: {
      backgroundColor: 'red',
      color: 'white',
    },
  },
})

export const Translations = {
  submit: {
    [Language.EN]: 'Submit',
    [Language.DE]: 'Einreichen',
    [Language.IT]: 'Invia',
    [Language.FR]: 'Soumettre',
  },
}

const LanguageContext = configureLanguage(Translations, Language.EN)

const App = () => {
  const language = Language.EN

  return (
    <LanguageContext.Provider value={language}>
      <AppThemeContext.Provider value={getAppTheme()}>
        <Button label="submit" />
      </AppThemeContext.Provider>
    </LanguageContext.Provider>
  )
}
