import React from 'react'
import { LocaleNamespace } from '../translation'
import { LabelProps } from './Label'
import { Props as TextInputProps, TextInput } from './TextInput'

export type Props = {
  onChange: (value: number) => void
  value: number
  step?: number
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  unit?: string
  max?: number
  min?: number
} & Omit<TextInputProps, 'onChange' | 'label' | 'value'>

export const NumberInput = (props: Props) => {
  const { onChange, value, unit, ...otherProps } = props
  return (
    <TextInput
      {...otherProps}
      value={`${value}`}
      onChange={(v) => {
        onChange(Number(v))
      }}
      onBlur={(v) => {
        onChange(Number(v))
      }}
      inputType="number"
      postfix={unit}
    />
  )
}
