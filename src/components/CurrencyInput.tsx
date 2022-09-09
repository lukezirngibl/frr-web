import React from 'react'
import { LabelProps } from './Label'
import { Props as TextInputProps, TextInput } from './TextInput'

export type Props = {
  label?: LabelProps
  onChange: (n: number | null) => void
  value: number | null | undefined
  max?: number
  min?: number
  step?: number
} & Omit<TextInputProps, 'onChange' | 'value'>

const getValue = (v: string, options?: { min: number; max: number; step: number }): number | null => {
  const value = v.replace(',', '.')
  let num = Number(value)
  num = v === '' || isNaN(num) ? null : num

  if (options) {
    if (num < options.min) {
      num = options.min
    } else if (num > options.max) {
      num = options.max
    } else if (options.step > 1) {
      num = Math.round(num / options.step) * options.step
    }
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
      isCurrencyInput
      onChange={(v) => {
        props.onChange(getValue(v))
      }}
      onBlur={(v) => {
        props.onChange(getValue(v, { min: props.min, max: props.max, step: props.step }))
      }}
      value={value === null || isNaN(value) || value === undefined ? undefined : `${value}`}
      parseValue={parseAmount}
    />
  )
}

CurrencyInput.defaultProps = {
  max: 100000,
  min: 0,
  step: 1,
}
