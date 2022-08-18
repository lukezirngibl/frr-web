import { Select, Props } from '../../src/components/Select'
import { createStory, meta } from '../storybook.helpers'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import React from 'react'
import { makeFormLens } from '../../src/form/util'
import { FormFieldType, SingleFormField } from '../../src/form/components/types'
import { Options } from '../../src/html'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof Select>({
  title: 'Components/Select',
  component: Select,
})

type FormData = {
  letter: string | null
  numberOfChildren: number | null
  zip?: string | null
  city?: string | null
}
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const textSelectField: SingleFormField<FormData> = {
  type: FormFieldType.TextSelect,
  lens: formLens(['letter']),
  label: { label: 'Buchstabe' },
  options: [
    {
      value: 'a',
      label: 'A',
      isLabelTranslated: true,
    },
    {
      value: 'b',
      label: 'B',
      isLabelTranslated: true,
    },
    {
      value: 'c',
      label: 'C',
      isLabelTranslated: true,
    },
  ],
} as any

const numberSelectField = {
  type: FormFieldType.NumberSelect,
  lens: formLens(['numberOfChildren']),
  label: { label: 'Anzahl Kinder' },
  options: [
    {
      value: 0,
      label: 'Keine',
      isLabelTranslated: true,
    },
    {
      value: 1,
      label: '1',
      isLabelTranslated: true,
    },
    {
      value: 2,
      label: '2',
      isLabelTranslated: true,
    },
  ],
} as any

export const SelectText = () => {
  const [value, setValue] = React.useState(null)
  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        field: textSelectField,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: {
          letter: value,
          numberOfChildren: null,
        },
        onChange: (lens, value) => {
          alert(`ON CHANGE\nLetter value: ${value}`)
          setValue(value)
        },
        showValidation: false,
      })}
    </div>
  )
}

export const SelectTextWithValue = () => {
  const [value, setValue] = React.useState('b')
  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        field: textSelectField,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: {
          letter: value,
          numberOfChildren: null,
        },
        onChange: (lens, value) => {
          alert(`ON CHANGE\nLetter value: ${value}`)
          setValue(value)
        },
        showValidation: false,
      })}
    </div>
  )
}

export const Readonly = () => (
  <div style={{ maxWidth: 600, minHeight: 600 }}>
    {story({
      field: textSelectField,
      fieldIndex: 0,
      formReadOnly: true,
      style: {},
      data: {
        letter: 'b',
        numberOfChildren: null,
      },
      onChange: (lens, value) => {
        alert(`ON CHANGE\nLetter value: ${value}`)
      },
      showValidation: false,
    })}
  </div>
)

export const SelectNumber = () => {
  const [value, setValue] = React.useState(null)
  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        field: numberSelectField,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: {
          letter: null,
          numberOfChildren: value,
        },
        onChange: (lens, newValue) => {
          alert(`ON CHANGE\nNumber of children value: ${newValue}`)
          setValue(newValue)
        },
        showValidation: false,
      })}
    </div>
  )
}
