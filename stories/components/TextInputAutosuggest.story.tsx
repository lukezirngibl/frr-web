import { TextInputAutosuggest, Props } from '../../src/components/TextInputAutosuggest'
import { createStory, meta } from '../storybook.helpers'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/FieldRowItem'
import React from 'react'
import { makeFormLens } from '../../src/form/util'
import {
  FormField,
  FormFieldType,
  MultiInputAutosuggestField,
  SingleFormField,
  TextInputAutosuggestField,
} from '../../src/form/types'
import { Option } from '../../src/components/menu/Menu.types'
import { Options } from 'react-select'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof TextInputAutosuggest>({
  title: 'Components/TextInput with auto suggest',
  component: TextInputAutosuggest,
})

type FormData = {
  zip?: string | null
  city?: string | null
}
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

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
const textInputAutosuggestField: TextInputAutosuggestField<FormData> = {
  type: FormFieldType.TextInputAutosuggest,
  lens: formLens(['zip']),
  label: { label: 'Postal Code' },
  onSuggestionSelected: () => {},
  onLoadSuggestions: (value: string): Promise<Options<Option>> => {
    return new Promise((resolve) => {
      const zipOptions = zips
        .filter((zip) => zip.startsWith(value))
        .map((zip) => ({ value: zip, label: zip, isTranslated: true, data: { zip } }))
      console.log('ZIP OPTIONS', zipOptions)
      setTimeout(() => {
        resolve(zipOptions)
      }, 1000)
    })
  },
}

export const Autosugget = () => {
  const [value, setValue] = React.useState('')
  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        field: {
          ...textInputAutosuggestField,
          onSuggestionSelected: (suggestion) => {
            setValue(suggestion.value)
          }
        },
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: { zip: value },
        onChange: (lens, value) => {
          setValue(value)
        },
        showValidation: false,
      })}
    </div>
  )
}