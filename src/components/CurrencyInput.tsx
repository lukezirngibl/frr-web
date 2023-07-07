import React from 'react'
import { LabelProps } from './Label'
import { Props as TextInputProps, TextInput } from './TextInput'

export type Props = {
  label?: LabelProps
  marks?: Array<number>
  max?: number
  min?: number
  onChange: (params: { num: number | null; value: string }) => void
  step?: number
  value: number | null | undefined
} & Omit<TextInputProps, 'onChange' | 'value'>

const getValue = (
  v: string,
  options?: {
    marks: Array<number>
    max: number | null
    min: number | null
    step: number
  },
): number | null => {
  const value = v.replace(',', '.')
  let num = Number(value)
  num = v === '' || isNaN(num) ? null : num

  if (options) {
    if (options.min !== null && num < options.min) {
      num = options.min
    } else if (options.max !== null && num > options.max) {
      num = options.max
      // } else if (num && options.marks.length > 0) {
      //   const closest = options.marks.reduce((prev, curr) => {
      //     return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
      //   }, options.marks[0])
      //   num = closest
    } else if (options.step !== null && options.step !== 1) {
      num = Math.round(num / options.step) * options.step
      if (options.step % 1 !== 0) {
        num = Number(num.toFixed(2))
      }
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
      autocomplete={props.autocomplete || 'off'}
      isCurrencyInput
      onChange={(value) => {
        props.onChange({ num: getValue(value), value })
      }}
      onBlur={(value) => {
        props.onChange({
          num: getValue(value, {
            min: props.min || null,
            max: props.max || null,
            marks: props.marks || [],
            step: props.step || 1,
          }),
          value,
        })
      }}
      parseValue={parseAmount}
      value={value === null || isNaN(value) || value === undefined ? undefined : `${value}`}
    />
  )
}

CurrencyInput.defaultProps = {
  max: 1000000,
  min: 0,
  step: 1,
}
