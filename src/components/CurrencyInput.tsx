import React from 'react'
import { LabelProps } from './Label'
import { TextInput, Props as TextInputProps } from './TextInput'
import { TextNumberInput, Props as TextNumberProps } from './TextNumberInput'

export type Props = {
  label?: LabelProps
  onChange: (n: number | null) => void
  value: number | null | undefined
  max?: number
  min?: number
} & Omit<TextInputProps, 'onChange' | 'value'>

const getValue = (v: string, options: { min?: number, max?: number }): number | null => {
  const value = v.replace(',', '.')
  let num = Number(value)
  num = v === '' || isNaN(num) ? null : num
  
  if (options.min !== undefined && num < options.min) {
    num = options.min
  } else if (options.max !== undefined && num > options.max) {
    num = options.max
  }

  return num
}

const parseAmount = (v: string): string => {
  const value = Number(v.replace(',', '.'))
  return v === '' || isNaN(value) ? v : value.toFixed(2).replace(/\.0{2}$/, '')
}

export const CurrencyInput = (props: Props) => {
  const { value } = props

  return (
    <TextInput
      {...props}
      onChange={(v) => {
        props.onChange(getValue(v, {}))
      }}
      onBlur={(v) => {
        props.onChange(getValue(v, { min: props.min, max: props.max }))
      }}
      value={value === null || isNaN(value) || value === undefined ? undefined : `${value}`}
      parseValue={parseAmount}
    />
  )
}
