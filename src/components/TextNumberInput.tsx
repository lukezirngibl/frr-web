import React, { useState } from 'react'
import { TranslationGeneric } from '../util'
import { TextInput, Props as TextInputProps } from './TextInput'
import { LabelProps } from './Label'

export type Props<TM> = {
  label?: LabelProps<TM>
  onChange: (n: number) => void
  value: number | null | undefined
  debouncedDelay?: number
  max?: number
  min?: number
} & Omit<TextInputProps<TM>, 'onChange' | 'value'>

const getValue = (v: string): number | undefined | null =>
  isNaN(Number(v)) ? undefined : Number(v)

export const TextNumberInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { value } = props

  return (
    <TextInput
      {...props}
      onChange={v => {
        props.onChange(getValue(v))
      }}
      value={isNaN(`${value}` as any) ? undefined : `${value}`}
    />
  )
}
