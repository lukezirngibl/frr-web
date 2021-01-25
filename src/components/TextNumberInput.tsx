import React, { useState } from 'react'
import { TranslationGeneric } from '../util'
import { useDebouncedCallback } from 'use-debounce'
import { TextInput } from './TextInput'

export type Props<TM> = {
  onChange: (n: number) => void
  value: number
  required?: boolean
  debouncedDelay?: number
  label?: keyof TM
  readOnly?: boolean
  disabled?: boolean
}

const getValue = (v: string) => (isNaN(Number(v)) ? 0 : Number(v))

export const TextNumberInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { label, value } = props

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
      label={props.label}
      disabled={props.readOnly || props.disabled}
      onChange={v => {
        setInternalValue(v)
        onChange(v)
      }}
      value={internalValue}
    />
  )
}
