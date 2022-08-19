import { createStory, meta } from '../storybook.helpers'

import React from 'react'
import { makeFormLens } from '../../src/form/util'
import {
  FieldMultiInputAutosuggest,
  FieldMultiInputAutosuggestProps,
} from '../../src/form/FieldMultiInputAutosuggest'
import {
  FormField,
  FormFieldType,
  MultiInputAutosuggestField,
  SingleFormField,
} from '../../src/form/types'
import { Options } from '../../src/html'

type FormData = {
  zip?: string | null
  city?: string | null
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<FieldMultiInputAutosuggestProps<FormData>, typeof FieldMultiInputAutosuggest>({
  title: 'Form/Multi input field with auto suggest',
  component: FieldMultiInputAutosuggest,
})

const formLens = makeFormLens<FormData>()
const story = createStory<FieldMultiInputAutosuggestProps<FormData>, typeof FieldMultiInputAutosuggest>(
  FieldMultiInputAutosuggest,
)

const zips = [
  '1000',
  '1001',
  '1021',
  '1321',
  '2000',
  '2001',
  '2021',
  '2321',
  '3000',
  '3001',
  '3021',
  '3321',
  '4000',
  '4001',
  '4021',
  '4321',
  '5000',
  '5001',
  '5021',
  '5321',
  '6000',
  '6001',
  '6021',
  '6321',
  '7000',
  '7001',
  '7021',
  '7321',
  '8000',
  '8001',
  '8021',
  '8321',
  '9000',
  '9001',
  '9021',
  '9321',
]

const cities = [
  'Aarau',
  'Basel',
  'Bern',
  'Dietikon',
  'Hinwil',
  'Locarno',
  'Lugano',
  'Luzern',
  'Olten',
  'Oltingen',
  'Rapperswil',
  'Winterthur',
  'Zürich',
]

// At least one digit
export const ZIP_REGEXP = /(?=.*\d)/
export const SWISSZIP_REGEXP = /^(?:[1-9]\d{3})$/ /* /^\d{4}$/ */
export const LICHTENSTEIN_ZIP_LIST = [
  '9485',
  '9486',
  '9487',
  '9488',
  '9489',
  '9490',
  '9491',
  '9492',
  '9493',
  '9494',
  '9495',
  '9496',
  '9497',
  '9498',
]

export const validateSwissZip = (value: any) => {
  return !SWISSZIP_REGEXP.test(`${value}`) || LICHTENSTEIN_ZIP_LIST.includes(value)
    ? 'formFields.error.invalidZip'
    : null
}

export const CITY_REGEXP = /^[A-Za-zÀ-ž- '`.]+$/
export const validateCity = (value: string) =>
  !CITY_REGEXP.test(`${value}`) ? 'formFields.error.invalidText' : null

const textInputAutosuggestField: MultiInputAutosuggestField<FormData> = {
  type: FormFieldType.MultiInputAutosuggest,
  label: { label: 'Postal Code / City' },
  itemStyle: {
    marginRight: 0,
  },
  fields: [
    {
      type: FormFieldType.TextInputAutosuggest,
      lens: formLens(['zip']),
      name: 'zip',
      required: true,
      validate: validateSwissZip,
      style: {
        wrapper: {
          marginRight: 8,
          minWidth: 'var(--multi-form-field-zip-width)',
          maxWidth: 'var(--multi-form-field-zip-width)',
        },
      },
      itemStyle: {
        marginRight: 0,
      },
      // defaultOptions: [] as Options<string>,
      onLoadSuggestions: (value: string) => {
        return new Promise((resolve) => {
          const zipOptions = zips
            .filter((zip) => zip.startsWith(value))
            .map((zip) => ({ value: zip, label: zip, isTranslated: true }))
          console.log('ZIP OPTIONS', zipOptions)
          setTimeout(() => {
            resolve(zipOptions)
          }, 1000)
        })
      },
    },
    {
      type: FormFieldType.TextInputAutosuggest,
      lens: formLens(['city']),
      itemStyle: {
        marginLeft: 0,
      },
      name: 'city',
      required: true,
      validate: validateCity,
      onLoadSuggestions: (value: string) => {
        return new Promise((resolve) => {
          const cityOptions = cities
            .filter((city) => city.startsWith(value))
            .map((city) => ({ value: city, label: city, isTranslated: true }))
          console.log('CItY OPTIONS', cityOptions)
          setTimeout(() => {
            resolve(cityOptions)
          }, 1000)
        })
      },
    },
  ],
}

export const PostalCodeCity = () => {
  const [data, setData] = React.useState({ city: null, zip: null })
  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        field: textInputAutosuggestField,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data,
        onChange: (lens, value) => {
          setData({ ...data, [lens.id()]: value })
        },
        showValidation: false,
      })}
    </div>
  )
}
