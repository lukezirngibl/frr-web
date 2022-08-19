import { createStory, meta, validateCity, validateSwissZip } from '../storybook.helpers'

import React from 'react'
import { Option } from '../../src/components/menu/Menu.types'
import {
  FieldMultiInputAutosuggest,
  FieldMultiInputAutosuggestProps,
} from '../../src/form/FieldMultiInputAutosuggest'
import { FormFieldType, MultiInputAutosuggestField } from '../../src/form/types'
import { FormLens, makeFormLens } from '../../src/form/util'
import { ZipCityList } from '../assets/ZipCityList'
import { Options } from 'react-select'

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

const ZipList = ZipCityList.map((item) => ({
  value: item.zip,
  label: `${item.zip} ${item.city}`,
  isTranslated: true,
  data: item
}))
const CityList = ZipCityList.map((item) => ({
  value: item.city,
  label: `${item.city} (${item.zip})`,
  isTranslated: true,
  data: item
}))

const getTextInputAutosuggestField = (
  setSuggestion: (lens: FormLens<FormData, any>) => (suggestion: Option) => void,
): MultiInputAutosuggestField<FormData> => ({
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
      onSuggestionSelected: setSuggestion(formLens(['zip'])),
      onLoadSuggestions: (searchString) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const zipCityOptions = ZipList.filter((item) => item.value.startsWith(searchString)).splice(
              0,
              7,
            )
            resolve(zipCityOptions)
          }, 0)
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
      onSuggestionSelected: setSuggestion(formLens(['city'])),
      onLoadSuggestions: (searchString) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const zipCityOptions = CityList.filter((item) =>
              item.value.toLowerCase().startsWith(searchString.toLowerCase()),
            ).splice(0, 7)
            resolve(zipCityOptions)
          }, 0)
        })
      },
    },
  ],
})

export const PostalCodeCity = () => {
  const [data, setData] = React.useState<FormData>({ city: null, zip: null })

  const setSuggestion = (lens: FormLens<FormData, any>) => (suggestion: Option) => {
    if (lens.id() === 'zip') {
      setData({
        zip: suggestion.value,
        city: suggestion.data.city,
      })
    }
    if (lens.id() === 'city') {
      setData({
        zip: suggestion.data.zip,
        city: suggestion.value,
      })
    }
  }

  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        field: getTextInputAutosuggestField(setSuggestion),
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
