import { Meta } from '@storybook/react'
import React from 'react'
import {
  FieldAutocompleteAddress,
  FieldAutocompleteAddressProps,
} from '../../src/form/components/FieldAutocompleteAddress'
import {
  FieldInputType,
  FormFieldType,
  MultiInputAutosuggestAddressField,
} from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory, validateAddress, validateCity, validateSwissZip } from '../storybook.helpers'
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

const story = createStory<FieldAutocompleteAddressProps<FormData>, typeof FieldAutocompleteAddress>(
  FieldAutocompleteAddress,
)

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
      formReadOnly: params.formReadOnly,
      fieldIndex: params.fieldIndex,
      fields: [
        {
          type: FormFieldType.TextInputAutosuggest,
          label: { label: 'Street / House Nr.' },
          lens: formLens(['street']),
          name: 'street',
          fieldInputType: FieldInputType.Street,
          required: true,
          validate: validateAddress,
          itemStyle: {
            marginLeft: 0,
          },
          onLoadSuggestions: () => Promise.resolve([]),
        },
        {
          type: FormFieldType.TextInputAutosuggest,
          lens: formLens(['houseNr']),
          name: 'houseNr',
          fieldInputType: FieldInputType.HouseNr,
          required: true,
          style: {
            wrapper: {
              minWidth: 'var(--multi-form-field-zip-width)',
              maxWidth: 'var(--multi-form-field-zip-width)',
            },
          },
          itemStyle: {
            marginRight: 0,
          },
          onLoadSuggestions: () => Promise.resolve([]),
        },
      ],
      showValidation: params.showValidation,
      style: {},
    },
    secondRow: {
      autoFocus: false,
      onChange: params.onChange,
      data: params.data,
      formReadOnly: params.formReadOnly,
      fieldIndex: params.fieldIndex,
      fields: [
        {
          type: FormFieldType.TextInputAutosuggest,
          label: { label: 'Postal Code / City', style: { wrapper: { display: 'flex', width: '55%' } } },
          lens: formLens(['zip']),
          name: 'zip',
          fieldInputType: FieldInputType.Zip,
          maxLength: 4,
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
          onLoadSuggestions: () => Promise.resolve([]),
        },
        {
          type: FormFieldType.TextInputAutosuggest,
          lens: formLens(['city']),
          itemStyle: {
            marginLeft: 0,
          },
          name: 'city',
          fieldInputType: FieldInputType.City,
          required: true,
          validate: validateCity,
          onLoadSuggestions: () => Promise.resolve([]),
        },
      ],
      showValidation: params.showValidation,
      style: {},
    },
  }
}

export const AddressPostalCodeCity = () => {
  const [data, setData] = React.useState<FormData>({
    street: null,
    houseNr: null,
    city: null,
    zip: null,
  })

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 300 }}>
      {story({
        autoFocus: false,
        field: textInputAutosuggestField({
          onChange: (lens, value) => {
            setData((prev) => ({ ...prev, [lens.id()]: value }))
          },
          fieldIndex: 0,
          formReadOnly: false,
          style: {},
          data,
          showValidation: false,
        }),
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data,
        onChange: (lens, value) => {
          setData((prev) => ({ ...prev, [lens.id()]: value }))
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
