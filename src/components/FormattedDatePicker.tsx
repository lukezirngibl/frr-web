import React from 'react'
import { parse, format } from 'date-fns'
import { DatePicker, Props as DatePickerProps } from './DatePicker'

export type Props = {
  onChange: (value: string | null) => void
  value: string | null
  dateFormat: string
} & Omit<DatePickerProps, 'onChange' | 'value'>

export const FormattedDatePicker = (props: Props) => {
  const { onChange, value, dateFormat, ...otherProps } = props
  const val: Date = props.value
    ? parse(props.value, props.dateFormat, new Date())
    : null

  return (
    <DatePicker
      value={val as Date}
      onChange={v => {
        if (v !== null) {
          props.onChange(format(v, props.dateFormat))
        } else {
          props.onChange(null)
        }
      }}
      dateFormat={dateFormat}
      {...otherProps}
    />
  )
}
