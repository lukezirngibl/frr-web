# Configurable & Styleable React Component Library

### Motivation

It is tiresome constantly having to import 15 different dependencies for your favorite React components (e.g Dropdowns, Inputs, Tables, etc). This library is a wrapper around all my favorite components. The main purpose of this wrapper is to support styling & translations to all these core components. It's as easy as just loading in a single style and translation object and viola, you have a multi language component library that is styled in your own custom way.

### Getting started

##### Yarn Install

```
yarn add frr-web
```

##### NPM Install

```
npm install frr-web
```

#### Build library

To build the library, run the build script and clean up afterwards

1. Build library with types: `yarn build-types`
2. (Clean node_modules: `yarn clean`)

#### Watch mode for local development

In the locale environment you might want to link this library to the consuming application and keep it in watch mode. Follow these steps to prepare the library for the watch mode

0. (One time only) Link package: `yarn link`
1. Build the types first: `yarn build-types`
2. Remove the (critical) peer dependencies: `yarn clean`
3. Start the build in watch mode (babel): `yarn build:watch`

_IMPORTANT NOTE_ Types are not transpiled by Babel. As a consequence, changes of types require a rebuild of the types with the TypeScript compiler in order for consuming applications to receive them.
As the TypeScript compiler requires all dependencies, we first have to install those as well. Unfortunately libraries like React or Style-Components cannot handle duplicate installations of the same package and will crash in the browser during rendering.
That is why we have to clean the _node_modules_ from all peerDependencies before using it.

### Usage

```ts
import React, { useEffect } from 'react'
import { Button } from 'frr-web/lib/components'
import { AppThemeContext, configureAppTheme } from 'frr-web/lib/theme/theme'
import { configureLanguage, Language } from 'frr-web/lib/theme/language'
import {
  TranslationsContext,
  Translations,
  LanguageContext,
} from 'frr-web/lib/theme/language'

const appTheme = configureAppTheme({
  button: {
    chromeless: {},
    secondary: {},
    common: {
      backgroundColor: 'red',
      color: 'white',
    },
  },
})

const translations = {
  submit: {
    [Language.EN]: 'Submit',
    [Language.DE]: 'Einreichen',
    [Language.IT]: 'Invia',
    [Language.FR]: 'Soumettre',
  },
}

const App = () => {
  const language = Language.EN

  return (
    <TranslationsContext.Provider value={translations}>
      <LanguageContext.Provider value={language}>
        <AppThemeContext.Provider value={appTheme}>
          <Button label="submit" />
        </AppThemeContext.Provider>
      </LanguageContext.Provider>
    </TranslationsContext.Provider>
  )
}
```
