import React from 'react'
import { FormattedDatePicker } from '../../src/components/FormattedDatePicker'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/FormattedDatePicker',
  component: FormattedDatePicker,
}

const story = createStory<FieldRowItemProps<{ birthDate: string | null }>, typeof FieldRowItem>(
  FieldRowItem,
)

const formLens = makeFormLens<{ birthDate: string | null }>()

let birthDate: string | null = null
export const Initial = () => (
  <div style={{ maxWidth: 600 }}>
    {story({
      field: {
        type: FormFieldType.FormattedDatePicker,
        lens: formLens(['birthDate']),
        label: { label: 'Geburtsdatum' },
        dateFormat: 'yyyy-MM-dd',
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
      autoFocus: false,
      showValidation: false,
    })}
  </div>
)

export const Readonly = () => (
  <div style={{ maxWidth: 360 }}>
    {story({
      field: {
        type: FormFieldType.FormattedDatePicker,
        lens: formLens(['birthDate']),
        label: { label: 'Geburtsdatum' },
        dateFormat: 'yyyy-MM-dd',
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
      autoFocus: false,
      showValidation: false,
    })}
  </div>
)
