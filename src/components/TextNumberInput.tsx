import React, { useState } from 'react'
import { TextInput, Props as TextInputProps } from './TextInput'
import { LabelProps } from './Label'

export type Props = {
  label?: LabelProps
  onChange: (n: number) => void
  value: number | null | undefined
  max?: number
  min?: number
} & Omit<TextInputProps, 'onChange' | 'value'>

const getValue = (v: string): number | undefined | null => (isNaN(Number(v)) ? undefined : Number(v))

export const TextNumberInput = (props: Props) => {
  const { value } = props

  return (
    <TextInput
      {...props}
      onChange={(v) => {
        props.onChange(getValue(v))
      }}
      inputType="number"
      value={isNaN(`${value}` as any) ? undefined : `${value}`}
    />
  )
}
