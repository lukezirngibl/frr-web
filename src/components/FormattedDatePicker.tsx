import React from 'react'
import { parse, format } from 'date-fns'
import { DatePicker, Props as DatePickerProps } from './DatePicker'

export type Props = {
  onChange: (value: string) => void
  value: string
  dateFormat: string
} & Omit<DatePickerProps, 'onChange' | 'value'>

export const FormattedDatePicker = (props: Props) => {
  const { onChange, value, dateFormat, ...otherProps } = props
  const val: Date = props.value
    ? parse(props.value, props.dateFormat, new Date())
    : new Date()

  return (
    <DatePicker
      value={val as Date}
      onChange={(v: Date) => {
        props.onChange(format(v, props.dateFormat))
      }}
      dateFormat={dateFormat}
      {...otherProps}
    />
  )
}
