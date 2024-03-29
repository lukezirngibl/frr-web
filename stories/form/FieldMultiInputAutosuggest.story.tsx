import { Meta } from '@storybook/react'
import React from 'react'
import { FieldMultiInputAutosuggest } from '../../src/form/components/FieldMultiInputAutosuggest'
import { FormFieldType, MultiInputAutosuggestField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { ZipCityList } from '../assets/ZipCityList'
import { validateCity, validateSwissZip } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FieldMultiInputAutosuggest> = {
  title: 'Form/FieldMultiInputAutosuggest',
  component: FieldMultiInputAutosuggest,
}
export default meta

type FormData = {
  zip?: string | null
  city?: string | null
}

const formLens = makeFormLens<FormData>()

const ZipList = ZipCityList.map((item) => ({
  value: item.zip,
  label: `${item.zip} ${item.city}`,
  isTranslated: true,
  data: item,
}))
const CityList = ZipCityList.map((item) => ({
  value: item.city,
  label: `${item.city} (${item.zip})`,
  isTranslated: true,
  data: item,
}))

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
      onLoadSuggestions: (searchString) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const zipCityOptions =
              searchString > ''
                ? ZipList.filter((item) => item.value.startsWith(searchString)).splice(0, 7)
                : []
            // console.log(`ZIP OPTIONS for "${searchString}"`, zipCityOptions, )
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
      onLoadSuggestions: (searchString) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const zipCityOptions =
              searchString > ''
                ? CityList.filter((item) =>
                    item.value.toLowerCase().startsWith(searchString.toLowerCase()),
                  ).splice(0, 7)
                : []
            // console.log(`CITY OPTIONS for "${searchString}"`, zipCityOptions)
            resolve(zipCityOptions)
          }, 0)
        })
      },
    },
  ],
}

export const PostalCodeCity = () => {
  const [data, setData] = React.useState<FormData>({ city: null, zip: null })

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 300 }}>
      <FieldMultiInputAutosuggest
        autoFocus={false}
        field={textInputAutosuggestField}
        fieldIndex={0}
        formReadOnly={false}
        style={{}}
        data={data}
        onChange={(lens, value) => {
          // setData({ ...data, [lens.id()]: value })
        }}
        onChangeMulti={(fields) => {
          const newData = { ...data }
          fields.forEach((field) => {
            newData[field.lens.id()] = field.value
          })
          setData(newData)
        }}
        showValidation={false}
      />
    </div>
  )
}
