import React from 'react'
import { LabelProps } from './Label'
import { Props as TextInputProps, TextInput } from './TextInput'

export type Props = {
  label?: LabelProps
  onChange: (params: { num: number | null; value: string }) => void
  value: number | null | undefined
  marks?: Array<number>
  max?: number
  min?: number
  step?: number
} & Omit<TextInputProps, 'onChange' | 'value'>

const getValue = (
  v: string,
  options?: { min: number; max: number; marks: Array<number>; step: number },
): number | null => {
  const value = v.replace(',', '.')
  let num = Number(value)
  num = v === '' || isNaN(num) ? null : num

  if (options) {
    if (num < options.min) {
      num = options.min
    } else if (num > options.max) {
      num = options.max
    } else if (options.marks) {
      const closest = options.marks.reduce((prev, curr) => {
        return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
      })
      num = closest
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
      onChange={(value) => {
        props.onChange({ num: getValue(value), value })
      }}
      onBlur={(value) => {
        props.onChange({
          num: getValue(value, { min: props.min, max: props.max, marks: props.marks, step: props.step }),
          value,
        })
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
