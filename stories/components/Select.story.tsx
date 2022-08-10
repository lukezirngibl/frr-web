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

const story = createStory<FieldRowItemProps<{ letter: string | null }>, typeof FieldRowItem>(
  FieldRowItem,
)

const formLens = makeFormLens<{ letter: string | null }>()
const field = {
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

export const Initial = () => (
  <div style={{ maxWidth: 600 }}>
    {story({
      field,
      fieldIndex: 0,
      formReadOnly: false,
      style: {},
      data: {
        letter: null,
      },
      onChange: (lens, value) => {
        alert(`ON CHANGE\nLetter value: ${value}`)
      },
      showValidation: false,
    })}
  </div>
)

export const Selected = () => (
  <div style={{ maxWidth: 600 }}>
    {story({
      field,
      fieldIndex: 0,
      formReadOnly: false,
      style: {},
      data: {
        letter: 'b',
      },
      onChange: (lens, value) => {
        alert(`ON CHANGE\nLetter value: ${value}`)
      },
      showValidation: false,
    })}
  </div>
)

