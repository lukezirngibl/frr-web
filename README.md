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
import { Button } from '../../components'
import { AppThemeContext, configureAppTheme } from '../../theme/theme'
import { configureLanguage, Language } from '../../theme/language'
import { TranslationsContext, Translations, LanguageContext } from '../../theme/language'

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

## Form Motivation

It seems like 90% of a frontend developer's life is implementing forms. Forms, forms, forms. They're boring and styling them is a pain. You usually end up with way too much code for something that seems so boilerplate. For this reason, I've been using a configurable typesafe form instead. You provide the styling & layout once via a context hook and BOOM, you can crank out tons of forms throughout your app with just a configuration array. NO STYLING. NO JSX. Of course there are limitiations, but for your standard day-to-day forms, this library should be suitable.

### Form Example

```ts
import * as React from 'react'
import { Lens } from 'monocle-ts'
import { FormThemeContext, configureFormTheme } from 'frr-form/lib/theme/theme'
import { FormField, Form } from 'frr-form/lib/components/Form'
import { FormFieldType } from 'frr-form/lib/components/types'

type Person = {
  name: string
  hairColor: string
  age: number
  height: number
  description: string
  email: string
  website: string
}

const mkLens = Lens.fromPath<Person>()

export const personFormFields: Array<FormField<Person, any>> = [
  {
    type: FormFieldType.FormSection,
    title: 'Information',
    fields: [
      [
        {
          label: 'Name',
          type: FormFieldType.TextInput,
          lens: mkLens(['name']),
          required: true,
        },

        {
          label: 'Hair color',
          type: FormFieldType.TextInput,
          lens: mkLens(['hairColor']),
          required: true,
        },
      ],
      [
        {
          label: 'Age',
          type: FormFieldType.TextNumber,
          lens: mkLens(['age']),
          required: true,
        },
        {
          label: 'Height',
          type: FormFieldType.TextNumber,
          lens: mkLens(['height']),
          required: true,
        },
      ],
      [
        {
          label: 'Description',
          type: FormFieldType.TextInput,
          lens: mkLens(['description']),
          required: true,
        },
      ],
      [
        {
          label: 'Email',
          type: FormFieldType.TextInput,
          lens: mkLens(['email']),
          required: true,
        },
        {
          label: 'Website',
          type: FormFieldType.TextInput,
          lens: mkLens(['website']),
          required: true,
        },
      ],
    ],
  },
]

const personData = {
  name: 'Luke',
  hairColor: 'brown',
  age: 23,
  height: 194,
  description: 'average height',
  email: 'luke@google.com',
  website: 'www.foronered.com',
}

const FormTheme = configureFormTheme({})

export const App = () => (
  <FormThemeContext.Provider value={FormTheme}>
    <Form<Person>
      formFields={personFormFields}
      data={personData}
      onChange={(p) => {
        // add update function
      }}
    />
  </FormThemeContext.Provider>
)
```

## Development

### Build library

To build the library, run the build script.

1. Install packages: `yarn`
2. Build library with types: `yarn build`

### Develop in watch-mode

Follow these steps to run the library build in watch mode:

1. Start the build in watch mode (babel): `yarn build:watch`

### Use package in linked (watch-)mode

You might want to link this library to the consuming application and keep it in watch mode to develop in parallel.

- Create a symlink: `yarn link` (This you have to **do only once**)
- Run build with babel: `yarn build:watch`

### Use package in linked (watch-)mode updated!

cd YOUR_PROJECT
cd node_modules/react
yarn link
cd ../react-dom
yarn link

cd PACKAGE_YOU_DEBUG_LOCALLY
yarn link
yarn install
yarn link react
yarn link react-dom
yarn build:watch

cd YOUR_PROJECT
yarn link PACKAGE_YOU_DEBUG_LOCALLY
