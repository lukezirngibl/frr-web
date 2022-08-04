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
  const { onChange, onBlur, dateFormat, ...otherProps } = props
        console.log('DATE VALUE', props.value, isValid(new Date(props.value)))

  return (
    <MaskedDatePicker
      value={props.value}
      onBlur={(value: string) => {
        console.log('ON BLUR VALUE', value, isValid(new Date(value)), format(new Date(value), dateFormat))
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
