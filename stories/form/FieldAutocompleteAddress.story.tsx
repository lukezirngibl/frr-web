import { Meta } from '@storybook/react'
import React from 'react'
import { FieldAutocompleteAddress } from '../../src/form/components/FieldAutocompleteAddress'
import {
  FieldInputType,
  FormFieldType,
  MultiInputAutosuggestAddressField,
} from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { validateAddress, validateCity, validateSwissZip } from '../storybook.helpers'
import { AddressResponse, sendRequest } from './AddressAssistant'

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

const getResult = async (params) => {
  const address = await sendRequest(params)
  return address.QueryAutoComplete4Result.AutoCompleteResult
}

const getSuggestions = (params): Promise<Array<AddressResponse>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      getResult(params).then((res: AddressResponse[]) => resolve(res))
    }, 0)
  })
}

const textInputAutosuggestField = (params: any): MultiInputAutosuggestAddressField<FormData> => {
  return {
    type: FormFieldType.AutocompleteAddress,
    itemStyle: {
      marginRight: 0,
      width: '100%',
    },
    loadAddressSuggestions: getSuggestions,
    firstRow: {
      autoFocus: false,
      onChange: params.onChange,
      data: params.data,
      label: { label: 'Street / House Nr.' },
      formReadOnly: params.formReadOnly,
      fieldIndex: params.fieldIndex,
      fields: [
        {
          type: FormFieldType.TextInputAutosuggest,
          fieldInputType: FieldInputType.Street,
          itemStyle: { marginLeft: 0 },
          lens: formLens(['street']),
          name: 'street',
          onLoadSuggestions: () => Promise.resolve([]),
          required: true,
          validate: validateAddress,
        },
        {
          type: FormFieldType.TextInputAutosuggest,
          fieldInputType: FieldInputType.HouseNr,
          itemStyle: { marginRight: 0 },
          lens: formLens(['houseNr']),
          name: 'houseNr',
          onLoadSuggestions: () => Promise.resolve([]),
          required: true,
          style: {
            wrapper: {
              minWidth: 'var(--multi-form-field-zip-width)',
              maxWidth: 'var(--multi-form-field-zip-width)',
            },
          },
        },
      ],
      showValidation: params.showValidation,
      style: {},
    },
    secondRow: {
      autoFocus: false,
      onChange: params.onChange,
      data: params.data,
      label: { label: 'Postal Code / City', style: { wrapper: { display: 'flex', width: '55%' } } },
      formReadOnly: params.formReadOnly,
      fieldIndex: params.fieldIndex,
      fields: [
        {
          type: FormFieldType.TextInputAutosuggest,
          fieldInputType: FieldInputType.Zip,
          itemStyle: { marginRight: 0 },
          lens: formLens(['zip']),
          maxLength: 4,
          name: 'zip',
          onLoadSuggestions: () => Promise.resolve([]),
          required: true,
          validate: validateSwissZip,
          style: {
            wrapper: {
              minWidth: 'var(--multi-form-field-zip-width)',
              maxWidth: 'var(--multi-form-field-zip-width)',
            },
          },
        },
        {
          type: FormFieldType.TextInputAutosuggest,
          fieldInputType: FieldInputType.City,
          itemStyle: { marginLeft: 0 },
          lens: formLens(['city']),
          name: 'city',
          onLoadSuggestions: () => Promise.resolve([]),
          required: true,
          validate: validateCity,
        },
      ],
      showValidation: params.showValidation,
      style: {},
    },
  }
}

const AddressAutocompleteTemplate = (args) => {
  const [data, setData] = React.useState<FormData>(args.initialData || {
    street: null,
    houseNr: null,
    city: null,
    zip: null,
  })

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 300 }}>
      <FieldAutocompleteAddress
        autoFocus={false}
        field={textInputAutosuggestField({
          onChange: (lens, value) => {
            setData((prev) => ({ ...prev, [lens.id()]: value }))
          },
          fieldIndex: 0,
          formReadOnly: false,
          style: {},
          data,
          showValidation: false,
        })}
        fieldIndex={0}
        formReadOnly={args.readonly}
        style={{}}
        data={data}
        onChange={(lens, value) => {
          setData((prev) => ({ ...prev, [lens.id()]: value }))
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

export const AddressAutocomplete = AddressAutocompleteTemplate.bind({})
AddressAutocomplete.storyName = 'Address Autocomplete (Postal Code / City)'
AddressAutocomplete.args = {
  readonly: false,
}

export const AddressAutocompleteReadonly = AddressAutocompleteTemplate.bind({})
AddressAutocompleteReadonly.storyName = 'Address Autocomplete Readonly'
AddressAutocompleteReadonly.args = {
  readonly: true,
  initialData: {
    street: 'Musterstrasse',
    houseNr: '12',
    city: 'Zürich',
    zip: '8000',
  }
}
