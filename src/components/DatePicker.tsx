import React from 'react'
import DatePickerLib, { ReactDatePickerProps } from 'react-datepicker'
import { LabelProps, Label } from './Label'

export type Props = {
  onChange: (value: Date) => void
  value: Date
  label?: LabelProps
  datePickerProps: Partial<
    Omit<ReactDatePickerProps, 'onChange' | 'selected' | 'value'>
  >
}

export const DatePicker = (props: Props) => {
  const { onChange, value, ...otherProps } = props
  return (
    <>
      {props.label && <Label {...props.label} />}
      <DatePickerLib
        selected={value}
        onChange={onChange}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        {...props.datePickerProps}
      />
    </>
  )
}
