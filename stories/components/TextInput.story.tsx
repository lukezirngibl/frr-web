import React from 'react'
import { TextInput } from '../../src/components/TextInput'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TextInput',
  component: TextInput,
}

type FormData = {
  letter: string | null
  numberOfChildren: number | null
  zip?: string | null
  city?: string | null
}
const formLens = makeFormLens<FormData>()

export const SelectText = () => {
  const [value, setValue] = React.useState(null)

  const fieldRowItemProps: FieldRowItemProps<FormData> = {
    field: {
      type: FormFieldType.TextInput,
      lens: formLens(['letter']),
      label: { label: 'Buchstabe' },
      required: true,
    },
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
    autoFocus: true,
    showValidation: false,
  }

  return (
    <div style={{ maxWidth: 800, minHeight: 600, padding: '0 40px' }}>
      <FieldRowItem {...fieldRowItemProps} />
    </div>
  )
}
