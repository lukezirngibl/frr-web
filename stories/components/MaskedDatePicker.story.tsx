import { MaskedDatePicker, Props } from '../../src/components/MaskedDatePicker'
import { createStory, meta } from '../storybook.helpers'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import React from 'react'
import { makeFormLens } from '../../src/form/util'
import { FormFieldType } from '../../src/form/components/types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof MaskedDatePicker>({
  title: 'Components/MaskedDatePicker',
  component: MaskedDatePicker,
})

const story = createStory<FieldRowItemProps<{ birthDate: string | null }>, typeof FieldRowItem>(
  FieldRowItem,
)

const formLens = makeFormLens<{ birthDate: string | null }>()

let birthDate: string | null = null
export const Initial = () => (
  <div style={{ maxWidth: 600 }}>
    {story({
      field: {
        type: FormFieldType.MaskedDatePicker,
        lens: formLens(['birthDate']),
        label: { label: 'Geburtsdatum' },
        dateFormat: 'yyyy-MM-dd',
        maskInput: { alwaysShowMask: true, maskString: 'DD.MM.YYYY', mask: '00.00.0000' },
      },
      fieldIndex: 0,
      formReadOnly: false,
      style: {},
      data: {
        birthDate,
      },
      onChange: (lens, value) => {
        alert(`ON CHANGE\nDate value: ${value}`)
      },
      showValidation: false,
    })}
  </div>
)

export const Readonly = () => (
  <div style={{ maxWidth: 360 }}>
    {story({
      field: {
        type: FormFieldType.MaskedDatePicker,
        lens: formLens(['birthDate']),
        label: { label: 'Geburtsdatum' },
        dateFormat: 'yyyy-MM-dd',
        maskInput: { alwaysShowMask: true, maskString: 'DD.MM.YYYY', mask: '00.00.0000' },
      },
      fieldIndex: 0,
      formReadOnly: true,
      style: {},
      data: {
        birthDate: '2000-01-01',
      },
      onChange: (lens, value) => {
        alert(`ON CHANGE\nDate value: ${value}`)
      },
      showValidation: false,
    })}
  </div>
)
