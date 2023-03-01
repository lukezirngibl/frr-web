import React from 'react'
import { MaskedDatePicker } from '../../src/components/MaskedDatePicker'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MaskedDatePicker',
  component: MaskedDatePicker,
}

const formLens = makeFormLens<{ birthDate: string | null }>()

let birthDate: string | null = null
export const Initial = () => {
  const fieldItemProps: FieldRowItemProps<{ birthDate: string | null }> = {
    autoFocus: true,
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
  }
  return (
    <div style={{ maxWidth: 600 }}>
      <FieldRowItem {...fieldItemProps} />
    </div>
  )
}

export const Preset = () => {
  const fieldItemProps: FieldRowItemProps<{ birthDate: string | null }> = {
    autoFocus: true,
    field: {
      type: FormFieldType.MaskedDatePicker,
      lens: formLens(['birthDate']),
      label: { label: 'Geburtsdatum' },
      dateFormat: 'yyyy-MM-dd',
      maskInput: { alwaysShowMask: true, maskString: 'DD/MM/YYYY', mask: '00/00/0000' },
    },
    fieldIndex: 0,
    formReadOnly: false,
    style: {},
    data: {
      birthDate: '1990-03-23',
    },
    onChange: (lens, value) => {
      alert(`ON CHANGE\nDate value: ${value}`)
    },
    showValidation: false,
  }
  return (
    <div style={{ maxWidth: 600 }}>
      <FieldRowItem {...fieldItemProps} />
    </div>
  )
}

export const Readonly = () => {
  const fieldItemProps: FieldRowItemProps<{ birthDate: string | null }> = {
    autoFocus: true,
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
  }
  return (
    <div style={{ maxWidth: 360 }}>
      <FieldRowItem {...fieldItemProps} />
    </div>
  )
}
