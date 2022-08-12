import { Select, Props } from '../../src/components/Select'
import { createStory, meta } from '../storybook.helpers'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import React from 'react'
import { makeFormLens } from '../../src/form/util'
import { FormFieldType } from '../../src/form/components/types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof Select>({
  title: 'Components/Select',
  component: Select,
})

type FormData = { letter: string | null; numberOfChildren: number | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(
  FieldRowItem,
)

const textSelectField = {
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


export const TextSelect = () => (
  <div style={{ maxWidth: 600, minHeight: 600 }}>
    {story({
      field: textSelectField,
      fieldIndex: 0,
      formReadOnly: false,
      style: {},
      data: {
        letter: null,
        numberOfChildren: null,
      },
      onChange: (lens, value) => {
        alert(`ON CHANGE\nLetter value: ${value}`)
      },
      showValidation: false,
    })}
  </div>
)

export const TextSelectWithValue = () => (
  <div style={{ maxWidth: 600, minHeight: 600 }}>
    {story({
      field: textSelectField,
      fieldIndex: 0,
      formReadOnly: false,
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

export const TextSelectReadonly = () => (
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

export const NumberSelect = () => (
  <div style={{ maxWidth: 600, minHeight: 600 }}>
    {story({
      field: numberSelectField,
      fieldIndex: 0,
      formReadOnly: false,
      style: {},
      data: {
        letter: null,
        numberOfChildren: null,
      },
      onChange: (lens, value) => {
        alert(`ON CHANGE\nNumber of children value: ${value}`)
      },
      showValidation: false,
    })}
  </div>
)

