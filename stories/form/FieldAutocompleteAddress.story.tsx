import React from 'react'
import { Meta } from '@storybook/react'
import { createStory, validateAddress, validateCity, validateSwissZip } from '../storybook.helpers'
import {
  FieldAutocompleteAddress,
  FieldAutocompleteAddressProps,
} from '../../src/form/components/FieldAutocompleteAddress'
import { FormFieldType, MultiInputAutosuggestField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { ZipCityList } from '../assets/ZipCityList'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FieldAutocompleteAddress> = {
  title: 'Form/FieldAutocompleteAddress',
  component: FieldAutocompleteAddress,
}
export default meta

const formLens = makeFormLens<FormData>()
type FormData = {
  address?: string | null
  houseNr?: string | null
  zip?: string | null
  city?: string | null
}

const story = createStory<FieldAutocompleteAddressProps<FormData>, typeof FieldAutocompleteAddress>(
  FieldAutocompleteAddress,
)

const AddressList = [
  {
    value: 'Address1',
    label: `Address1 8000 City1`,
    isTranslated: true,
    data: {
      addres: 'Address1',
      zip: '8000',
      city: 'City1',
    },
  },
  {
    value: 'Address2',
    label: `Address2 8000 City2`,
    isTranslated: true,
    data: {
      addres: 'Address2',
      zip: '8000',
      city: 'City2',
    },
  },
  {
    value: 'Address3',
    label: `Address3 8000 City3`,
    isTranslated: true,
    data: {
      addres: 'Address3',
      zip: '8000',
      city: 'City3',
    },
  },
  {
    value: 'Address4',
    label: `Address4 8000 City4`,
    isTranslated: true,
    data: {
      addres: 'Address4',
      zip: '8000',
      city: 'City4',
    },
  },
  {
    value: 'Address5',
    label: `Address5 8000 City5`,
    isTranslated: true,
    data: {
      addres: 'Address5',
      zip: '8000',
      city: 'City5',
    },
  },
  {
    value: 'Address6',
    label: `Address6 8000 City6`,
    isTranslated: true,
    data: {
      addres: 'Address6',
      zip: '8000',
      city: 'City6',
    },
  },
  {
    value: 'Address7',
    label: `Address7 8000 City7`,
    isTranslated: true,
    data: {
      addres: 'Address7',
      zip: '8000',
      city: 'City7',
    },
  },
]

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
  itemStyle: {
    marginRight: 0,
  },
  fields: [
    {
      type: FormFieldType.TextInputAutosuggest,
      label: { label: 'Address' },
      lens: formLens(['address']),
      name: 'zip',
      required: true,
      validate: validateAddress,
      itemStyle: {
        marginLeft: 0,
      },
      onLoadSuggestions: (searchString) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const zipCityOptions =
              searchString > ''
                ? AddressList.filter((item) => item.value.startsWith(searchString)).splice(0, 7)
                : []
            // console.log(`ZIP OPTIONS for "${searchString}"`, zipCityOptions, )
            resolve(zipCityOptions)
          }, 0)
        })
      },
    },
    {
      type: FormFieldType.TextInputAutosuggest,
      label: { label: 'Postal Code / City' },
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

export const AddressPostalCodeCity = () => {
  const [data, setData] = React.useState<FormData>({ city: null, zip: null })

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 300 }}>
      {story({
        autoFocus: false,
        field: textInputAutosuggestField,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data,
        onChange: (lens, value) => {
          // setData({ ...data, [lens.id()]: value })
        },
        onChangeMulti: (fields) => {
          const newData = { ...data }
          fields.forEach((field) => {
            newData[field.lens.id()] = field.value
          })
          setData(newData)
        },
        showValidation: false,
      })}
    </div>
  )
}
