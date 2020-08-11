import React, { useState } from 'react'
import { Input as SematicInput, StrictInputProps } from 'semantic-ui-react'
import { TranslationGeneric } from '../../util'
import { useDebouncedCallback } from 'use-debounce'

import { Label } from './Label'

export type Props<TM> = {
  onChange: (n: number) => void
  value: number
  required?: boolean
  inputType?: string
  debouncedDelay?: number
  label?: keyof TM
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>

const getValue = (v: string) => (isNaN(Number(v)) ? 0 : Number(v))

export const TextNumberInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { inputType, label, value, ...otherProps } = props

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
    <>
      {label && <Label<TM> label={label} />}
      <SematicInput
        {...otherProps}
        onChange={(e, { value }) => {
          setInternalValue(value)
          onChange(value)
        }}
        value={internalValue}
        type={inputType}
      />
    </>
  )
}
