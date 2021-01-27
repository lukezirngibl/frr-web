import React from 'react'
import { TranslationGeneric } from '../util'
import { Label, LabelProps } from './Label'
import { TextInput, Props as TextInputProps } from './TextInput'

export type Props<TM> = {
  onChange: (value: number) => void
  value: number
  step?: number
  label?: LabelProps<TM>
  max?: number
  min?: number
} & Omit<TextInputProps<TM>, 'onChange' | 'label' | 'value'>

export const NumberInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { onChange, ...otherProps } = props
  return (
    <>
      {props.label && <Label {...props.label} />}
      <TextInput
        {...otherProps}
        value={`${props.value}`}
        onChange={v => {
          onChange(Number(v))
        }}
        inputType="number"
      />
    </>
  )
}
