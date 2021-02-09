import React, { useState } from 'react'
import { TranslationGeneric } from '../util'
import { useDebouncedCallback } from 'use-debounce'
import { TextInput, Props as TextInputProps } from './TextInput'
import { LabelProps, Label } from './Label'

export type Props<TM> = {
  label?: LabelProps<TM>
  onChange: (n: number) => void
  value: number
  debouncedDelay?: number
} & Omit<TextInputProps<TM>, 'onChange' | 'value'>

const getValue = (v: string) => (isNaN(Number(v)) ? 0 : Number(v))

export const TextNumberInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { value } = props

  const [internalValue, setInternalValue] = useState(`${value}`)

  const [onChange] = useDebouncedCallback((text: string) => {
    props.onChange(getValue(text))
    setInternalValue(`${getValue(text)}`)
  }, props.debouncedDelay || 300)

  React.useEffect(() => {
    setInternalValue(`${value}`)
  }, [value])

  React.useEffect(
    () => () => {
      if (internalValue !== `${value}`) {
        props.onChange(getValue(internalValue))
      }
    },
    [],
  )

  return (
    <TextInput
      {...props}
      onChange={v => {
        setInternalValue(v)
        onChange(v)
      }}
      value={internalValue}
    />
  )
}
