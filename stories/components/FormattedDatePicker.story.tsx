import { Meta } from '@storybook/react'
import React from 'react'
import { FormattedDatePicker } from '../../src/components/FormattedDatePicker'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FormattedDatePicker> = {
  title: 'Components/Formatted date picker',
  component: FormattedDatePicker,
}
export default meta


const story = createStory<FieldRowItemProps<{ birthDate: string | null }>, typeof FieldRowItem>(
  FieldRowItem,
)

const formLens = makeFormLens<{ birthDate: string | null }>()

let birthDate: string | null = null
export const Initial = () => (
  <div style={{ maxWidth: 600 }}>
    {story({
      autoFocus: false,
      field: {
        type: FormFieldType.FormattedDatePicker,
        lens: formLens(['birthDate']),
        label: { label: 'Geburtsdatum' },
        dateFormat: 'yyyy-MM-dd',
      },
      fieldIndex: 0,
      formReadOnly: false,
      formFieldOptions: {},
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
      autoFocus: false,
      field: {
        type: FormFieldType.FormattedDatePicker,
        lens: formLens(['birthDate']),
        label: { label: 'Geburtsdatum' },
        dateFormat: 'yyyy-MM-dd',
      },
      fieldIndex: 0,
      formReadOnly: true,
      formFieldOptions: {},
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
