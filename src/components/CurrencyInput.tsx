import React from 'react'
import { LabelProps } from './Label'
import { TextInput, Props as TextInputProps } from './TextInput'
import { TextNumberInput, Props as TextNumberProps } from './TextNumberInput'

export type Props = {
  label?: LabelProps
  onChange: (n: string) => void
  value: number | null | undefined
  max?: number
  min?: number
} & Omit<TextInputProps, 'onChange' | 'value'>

const getValue = (v: string): string | null => {
  const value = v.replace(',', '.')
  return value
}

const parseAmount = (v: string): string => {
  const value = Number(v.replace(',', '.'))
  return isNaN(value) ? v : value.toFixed(2).replace(/\.0{2}$/, '')
}

export const CurrencyInput = (props: Props) => {
  const { value } = props

  return (
    <TextInput
      {...props}
      onChange={(v) => {
        props.onChange(getValue(v))
      }}
      value={!value || isNaN(value) ? undefined : `${value}`}
      parseValue={parseAmount}
    />
  )
}
