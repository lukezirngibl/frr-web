import React, { useState } from 'react'
import { Input as SematicInput, StrictInputProps } from 'semantic-ui-react'
import { TranslationGeneric } from '../util'
import { useDebouncedCallback } from 'use-debounce'

import { Label } from './Label'
import { getTranslation, getLanguageContext } from '../theme/language'
import { Theme } from '../theme/theme'

export type Props<TM> = {
  onChange: (value: string) => void
  value: string | null
  required?: boolean
  placeholder?: keyof TM
  inputType?: string
  label?: keyof TM
} & Omit<StrictInputProps, 'onChange' | 'type' | 'value' | 'label'>

export const TextInput = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const { inputType, label, value, placeholder, ...otherProps } = props

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const [internalValue, setInternalValue] = useState(value)

  const [onChange] = useDebouncedCallback((text: string) => {
    const v = text.trim()
    props.onChange(v)
    setInternalValue(v)
  }, 300)

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  React.useEffect(
    () => () => {
      if (internalValue !== value) {
        props.onChange(internalValue)
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
        placeholder={placeholder ? translate(placeholder) : undefined}
        value={internalValue}
        type={inputType}
      />
    </>
  )
}
