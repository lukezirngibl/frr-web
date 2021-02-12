import React, { Component } from 'react'
import 'react-day-picker/lib/style.css'
import { TranslationGeneric } from '../util'
import { TextInput, Props as TextInputProps } from './TextInput'
import { format, parse } from 'date-fns'

export type Props<T> = {
  onChange: (value: Date) => void
  value: Date | null
} & Omit<TextInputProps<T>, 'onChange' | 'value'>

export const DatePicker = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const { value } = props
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
      value={value ? format(value, 'dd.MM.yyyy') : null}
      onChange={v => {
        const date = parse(v, 'dd.MM.yyyy', new Date())
        if (date.toDateString() !== 'Invalid Date') {
          props.onChange(date)
        }
      }}
    />
  )
}
