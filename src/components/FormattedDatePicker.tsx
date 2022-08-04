import React from 'react'
import { parse, format, isValid } from 'date-fns'
import { MaskedDatePicker, Props as DatePickerProps } from './MaskedDatePicker'

export type Props = {
  onChange: (value: string | null) => void
  onBlur: (value: string | null) => void
  value: string | null
  dateFormat: string
  maskInput?: DatePickerProps['maskInput']
} & Omit<DatePickerProps, 'onChange' | 'onBlur' | 'value' | 'maskInput'>

export const FormattedDatePicker = (props: Props) => {
  const { onChange, onBlur, value, dateFormat, ...otherProps } = props

  return (
    <MaskedDatePicker
      value={props.value}
      onBlur={(value: string) => {
        if (value !== null && isValid(new Date(value))) {
          onBlur(value)
        } else {
          onBlur(null)
        }
      }}
      dateFormat={dateFormat}
      maskInput={
        props.maskInput || { alwaysShowMask: true, maskString: 'DD.MM.YYYY', mask: '00.00.0000' }
      }
      {...otherProps}
    />
  )
}
