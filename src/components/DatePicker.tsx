import React, { Component } from 'react'
import 'react-day-picker/lib/style.css'
import { TextInput, Props as TextInputProps } from './TextInput'
import { format, parse } from 'date-fns'

export type Props = {
  onChange: (value: Date) => void
  value: Date | null
  dateFormat?: string
} & Omit<TextInputProps, 'onChange' | 'value'>

export const DatePicker = (props: Props) => {
  const { value, dateFormat } = props

  return (
    <TextInput
      {...props}
      value={value ? format(value, dateFormat || 'dd.MM.yyyy') : null}
      onlyOnBlur
      onChange={v => {
        const date = parse(v, dateFormat || 'dd.MM.yyyy', new Date())
        if (date.toDateString() !== 'Invalid Date') {
          props.onChange(date)
        } else {
          props.onChange(null)
        }
      }}
    />
  )
}
