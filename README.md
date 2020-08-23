# Configurable & Styleable React Component Library

### Motivation

It is tiresome constantly having to import 15 different dependencies for your favorite React components (e.g Dropdowns, Inputs, Tables, etc). This library is a wrapper around all my favorite components. The main purpose of this wrapper is to support styling & translations to all these core components. It's as easy as just loading in a single style and translation object and viola, you have a multi language component library that is styled in your own custom way. 


### Getting started

##### Yarn Install

```
yarn add frr-web @material-ui/core @material-ui/styles
```

##### NPM Install

```
npm install frr-web @material-ui/core @material-ui/styles
```

### Usage

```ts

import React, { useEffect } from 'react'
import { Button } from 'frr-web/lib/components'
import { configureLanguage, Language } from 'frr-web/lib/theme/language'
import { configureTheme, getTheme as getAppTheme } from 'frr-web/lib/theme/theme'

const AppThemeContext = configureTheme({
  button: {
    chromeless: {},
    secondary: {},
    common: {
      backgroundColor: 'red',
      color: 'white',
    },
  },
})

const Translations = {
  submit: {
    [Language.EN]: 'Submit',
    [Language.DE]: 'Einreichen',
    [Language.IT]: 'Invia',
    [Language.FR]: 'Soumettre',
  },
}

type TM = typeof Translations

const LanguageContext = configureLanguage(Translations, Language.EN)

const App = () => {
  const language = Language.EN

  return (
    <LanguageContext.Provider value={language}>
      <AppThemeContext.Provider value={getAppTheme()}>
        <Button<TM> label="submit" />
      </AppThemeContext.Provider>
    </LanguageContext.Provider>
  )
}

```
