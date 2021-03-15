# Configurable & Styleable React Component Library

## Motivation

It is tiresome constantly having to import 15 different dependencies for your favorite React components (e.g Dropdowns, Inputs, Tables, etc). This library is a wrapper around all my favorite components. The main purpose of this wrapper is to support styling & translations to all these core components. It's as easy as just loading in a single style and translation object and viola, you have a multi language component library that is styled in your own custom way.

## Getting started

### Yarn Install

```
yarn add frr-web
```

### NPM Install

```
npm install frr-web
```

## Usage

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

## Development

### Build library

To build the library, run the build script.
1. Install packages: `yarn`
2. Build library with types: `yarn build`

### Develop in watch-mode

Follow these steps to run the library build in watch mode:

1. Build the types first: `yarn build`
2. Start the build in watch mode (babel): `yarn babel:watch`

To rebuild the types the following actions are required (for the why see **IMPORTANT NOTE** below):
1. (Quit watch mode: `ctrl c`).
2. Run: `yarn build-types`
3. Start babel again: `yarn babel:watch`

### Use package in linked (watch-)mode
You might want to link this library to the consuming application and keep it in watch mode to develop in parallel.

- Create a symlink: `yarn link` (This you have to **do only once**)
- Run build with babel: `yarn babel:watch` 

**IMPORTANT NOTE**
Types are not transpiled by Babel. As a consequence, changes of types require a rebuild of the types with the TypeScript compiler in order for consuming applications to receive them.

As the TypeScript compiler requires all dependencies including peerDependencies, we first have to install those as well. Unfortunately libraries like React or Style-Components cannot handle duplicate installations of the same package in one application and will crash in the browser during rendering.

That is why we have to clean the _node_modules_ from all peerDependencies before using it. And that is also why we cannot really use the TypeScript compiler to develop in watch-mode with linked modules.


