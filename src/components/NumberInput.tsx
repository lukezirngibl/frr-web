import React, { Component } from 'react'
import { Input as SematicInput, StrictInputProps } from 'semantic-ui-react'
import { TranslationGeneric } from '../util'
import { Label } from './Label'

export type Props<TM> = {
  onChange: (value: number) => void
  value: number
  step?: number
  label?: keyof TM
  max?: number
  min?: number
  required?: boolean
  readOnly?: boolean
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>

export const NumberInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { onChange, label, readOnly, ...otherProps } = props
  return (
    <>
      {label && <Label label={label} />}
      <SematicInput
        {...otherProps}
        disabled={readOnly}
        onChange={(e, { value }) => {
          onChange(Number(value))
        }}
        type="number"
      />
    </>
  )
}
