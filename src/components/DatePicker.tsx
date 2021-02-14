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
  const datePickerRef = React.createRef<any>()
  const [day, setDay] = React.useState(props.value)

  React.useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current.hideDayPicker()
    }
  }, [day])

  return (
    <TextInput
      {...props}
      value={value ? format(value, dateFormat || 'dd.MM.yyyy') : null}
      onChange={v => {
        const date = parse(v, dateFormat || 'dd.MM.yyyy', new Date())
        if (date.toDateString() !== 'Invalid Date') {
          props.onChange(date)
        }
      }}
    />
  )
}
