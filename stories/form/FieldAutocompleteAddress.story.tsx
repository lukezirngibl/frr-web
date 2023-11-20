import { Meta } from '@storybook/react'
import React from 'react'
import {
  FieldAutocompleteAddress,
  FieldAutocompleteAddressProps,
} from '../../src/form/components/FieldAutocompleteAddress'
import {
  FormFieldType,
  MultiInputAutosuggestAddressField,
  MultiInputAutosuggestField,
} from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory, validateAddress, validateCity, validateSwissZip } from '../storybook.helpers'
import { AddressResponse } from './AddressAssistant'
import { useDebouncedSearch } from './useDebouncedSearch'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FieldAutocompleteAddress> = {
  title: 'Form/FieldAutocompleteAddress',
  component: FieldAutocompleteAddress,
}
export default meta

const formLens = makeFormLens<FormData>()
type FormData = {
  street?: string | null
  houseNr?: string | null
  zip?: string | null
  city?: string | null
}

const story = createStory<FieldAutocompleteAddressProps<FormData>, typeof FieldAutocompleteAddress>(
  FieldAutocompleteAddress,
)

const textInputAutosuggestField = (): MultiInputAutosuggestAddressField<FormData> => {
  const { searchParams, setSearchParams, debouncedSearch } = useDebouncedSearch()
  return {
    type: FormFieldType.AutocompleteAddress,
    itemStyle: {
      marginRight: 0,
      width: '100%',
    },
    fields: [
      {
        type: FormFieldType.TextInputAutosuggest,
        label: { label: 'Street / House Nr.' },
        lens: formLens(['street']),
        name: 'street',
        required: true,
        validate: validateAddress,
        itemStyle: {
          marginLeft: 0,
        },
        onLoadSuggestions: (searchString) => {
          setSearchParams({ ...searchParams, StreetName: searchString })
          return searchString > ''
            ? debouncedSearch(searchParams).then((address) =>
                address.map((item: AddressResponse) => ({
                  value: item.StreetName,
                  label: `${item.StreetName} ${item.HouseNo}${item.HouseNoAddition} ${item.ZipCode} ${item.TownName}`,
                  isTranslated: true,
                  data: {
                    street: item.StreetName,
                    houseNr: item.HouseNo,
                    zip: item.ZipCode,
                    city: item.TownName,
                  },
                })),
              )
            : Promise.resolve([])
        },
      },
      {
        type: FormFieldType.TextInputAutosuggest,
        lens: formLens(['houseNr']),
        name: 'houseNr',
        required: true,
        validate: validateAddress,
        style: {
          wrapper: {
            minWidth: 'var(--multi-form-field-zip-width)',
            maxWidth: 'var(--multi-form-field-zip-width)',
          },
        },
        itemStyle: {
          marginRight: 0,
        },
        onLoadSuggestions: (searchString) => {
          setSearchParams({ ...searchParams, HouseNo: searchString })
          return searchString > ''
            ? debouncedSearch(searchParams).then((address) =>
                address.map((item: AddressResponse) => ({
                  value: `${item.HouseNo}${item.HouseNoAddition}`,
                  label: `${item.StreetName} ${item.HouseNo}${item.HouseNoAddition} ${item.ZipCode} ${item.TownName}`,
                  isTranslated: true,
                  data: {
                    street: item.StreetName,
                    houseNr: item.HouseNo,
                    zip: item.ZipCode,
                    city: item.TownName,
                  },
                })),
              )
            : Promise.resolve([])
        },
      },
      {
        type: FormFieldType.TextInputAutosuggest,
        label: { label: 'Postal Code / City', style: { wrapper: { display: 'flex', width: '55%' } } },
        lens: formLens(['zip']),
        name: 'zip',
        required: true,
        validate: validateSwissZip,
        style: {
          wrapper: {
            minWidth: 'var(--multi-form-field-zip-width)',
            maxWidth: 'var(--multi-form-field-zip-width)',
          },
        },
        itemStyle: {
          marginRight: 0,
        },
        onLoadSuggestions: (searchString) => {
          setSearchParams({ ...searchParams, ZipCode: searchString })
          return searchString > ''
            ? debouncedSearch(searchParams).then((address) =>
                address.map((item: AddressResponse) => ({
                  value: item.ZipCode,
                  label: `${item.StreetName} ${item.HouseNo}${item.HouseNoAddition} ${item.ZipCode} ${item.TownName}`,
                  isTranslated: true,
                  data: {
                    street: item.StreetName,
                    houseNr: item.HouseNo,
                    zip: item.ZipCode,
                    city: item.TownName,
                  },
                })),
              )
            : Promise.resolve([])
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
          setSearchParams({ ...searchParams, TownName: searchString })
          return searchString > ''
            ? debouncedSearch(searchParams).then((address) =>
                address.map((item: AddressResponse) => ({
                  value: item.TownName,
                  label: `${item.StreetName} ${item.HouseNo}${item.HouseNoAddition} ${item.ZipCode} ${item.TownName}`,
                  isTranslated: true,
                  data: {
                    street: item.StreetName,
                    houseNr: item.HouseNo,
                    zip: item.ZipCode,
                    city: item.TownName,
                  },
                })),
              )
            : Promise.resolve([])
        },
      },
    ],
  }
}

export const AddressPostalCodeCity = () => {
  const [data, setData] = React.useState<FormData>({ city: null, zip: null })

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 300 }}>
      {story({
        autoFocus: false,
        field: textInputAutosuggestField(),
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
