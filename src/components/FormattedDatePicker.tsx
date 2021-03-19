import React from 'react'
import { parse, format, isValid } from 'date-fns'
import { DatePicker, Props as DatePickerProps } from './DatePicker'

export type Props = {
  onChange: (value: string | null) => void
  onBlur: (value: string | null) => void
  value: string | null
  dateFormat: string
} & Omit<DatePickerProps, 'onChange' | 'onBlur' | 'value'>

export const FormattedDatePicker = (props: Props) => {
  const { onChange, onBlur, value, dateFormat, ...otherProps } = props
  const val: Date = props.value
    ? parse(props.value, props.dateFormat, new Date())
    : null

  return (
    <DatePicker
      value={val as Date}
      onChange={(value: Date) => {
        if (value !== null && isValid(value)) {
          onChange(format(value, props.dateFormat))
        } else {
          onChange(null)
        }
      }}
      onBlur={(value: Date) => {
        if (value !== null && isValid(value)) {
          onBlur(format(value, props.dateFormat))
        } else {
          onBlur(null)
        }
      }}
      dateFormat={dateFormat}
      {...otherProps}
    />
  )
}
