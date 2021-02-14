import React from 'react'
import { Label, LabelProps } from './Label'
import { TextInput, Props as TextInputProps } from './TextInput'

export type Props = {
  onChange: (value: number) => void
  value: number
  step?: number
  label?: LabelProps
  max?: number
  min?: number
} & Omit<TextInputProps, 'onChange' | 'label' | 'value'>

export const NumberInput = (props: Props) => {
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
