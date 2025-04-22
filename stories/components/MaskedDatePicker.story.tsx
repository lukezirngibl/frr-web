import { Meta } from '@storybook/react'
import React from 'react'
import { MaskedDatePicker } from '../../src/components/MaskedDatePicker'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MaskedDatePicker> = {
  title: 'Components/Masked date picker',
  component: MaskedDatePicker,
}
export default meta

const story = createStory<FieldRowItemProps<{ birthDate: string | null }>, typeof FieldRowItem>(
  FieldRowItem,
)

const formLens = makeFormLens<{ birthDate: string | null }>()

export const Initial = () => {
  const [data, setData] = React.useState<{ birthDate: string | null }>({ birthDate: null })
  return (
    <div style={{ maxWidth: 600 }}>
      {story({
        autoFocus: true,
        field: {
          type: FormFieldType.MaskedDatePicker,
          lens: formLens(['birthDate']),
          label: { label: 'Geburtsdatum' },
          dateFormat: 'yyyy-MM-dd',
          // maskInput: { alwaysShowMask: true, maskString: 'DD.MM.YYYY', mask: '00.00.0000' },
          displayDateFormat: 'dd.MM.yyyy',
        },
        fieldIndex: 0,
        formReadOnly: false,
        formFieldOptions: {},
        style: {},
        data,
        onChange: (lens, value) => {
          // alert(`ON CHANGE\nDate value: ${value}`)
          setData(lens.set(value)(data))
          console.log('new value', value)
        },
        showValidation: false,
      })}
    </div>
  )
}

export const Preset = () => {
  const [data, setData] = React.useState<{ birthDate: string | null }>({
    birthDate: '1990-03-23',
    // birthDate: formatRFC3339(new Date(2019, 8, 18, 19, 0, 52), { fractionDigits: 3 }),
  })
  return (
    <div style={{ maxWidth: 600 }}>
      {story({
        autoFocus: true,
        field: {
          type: FormFieldType.MaskedDatePicker,
          lens: formLens(['birthDate']),
          label: { label: 'Geburtsdatum' },
          // iso format
          // dateFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSSSSSXXX",
          dateFormat: 'yyyy-MM-dd',
          displayDateFormat: 'dd/MM/yyyy',
          maskInput: { alwaysShowMask: true, maskString: 'DD/MM/YYYY', mask: '00/00/0000' },
        },
        fieldIndex: 0,
        formReadOnly: false,
        formFieldOptions: {},
        style: {},
        data,
        onChange: (lens, value) => {
          setData(lens.set(value)(data))
          console.log('new value', value)
          // alert(`ON CHANGE\nDate value: ${value}`)
        },
        showValidation: false,
      })}
    </div>
  )
}

export const Readonly = () => (
  <div style={{ maxWidth: 360 }}>
    {story({
      autoFocus: true,
      field: {
        type: FormFieldType.MaskedDatePicker,
        lens: formLens(['birthDate']),
        label: { label: 'Geburtsdatum' },
        dateFormat: 'yyyy-MM-dd',
        displayDateFormat: 'dd.MM.yyyy',
      },
      fieldIndex: 0,
      formReadOnly: true,
      formFieldOptions: {},
      style: {},
      data: {
        birthDate: '2000-01-01',
      },
      onChange: () => {},
      showValidation: false,
    })}
  </div>
)
