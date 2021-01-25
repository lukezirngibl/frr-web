import React, { useState } from 'react'
import { TranslationGeneric } from '../util'
import { useDebouncedCallback } from 'use-debounce'
import styled from 'styled-components'
import { Label } from './Label'
import { getTranslation, getLanguageContext } from '../theme/language'
import { createGetStyle } from '../theme/util'
import { AppTheme, getThemeContext } from '../theme/theme'

const InputWrapper = styled.div``

const Input = styled.input``

export type Props<TM> = {
  onChange: (value: string) => void
  value: string | null
  required?: boolean
  placeholder?: keyof TM
  style?: Partial<AppTheme['textInput']>
  inputType?: string
  label?: keyof TM
  readOnly?: boolean
  disabled?: boolean
}

export const TextInput = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const { inputType, label, value, placeholder, ...otherProps } = props

  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'textInput')(props.style)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const [internalValue, setInternalValue] = useState(value)

  const [onChange] = useDebouncedCallback((text: string) => {
    props.onChange(text)
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
      <InputWrapper style={getStyle('wrapper')}>
        <Input
          className="frr-number-input"
          style={{
            ...getStyle('input'),
            ...(props.readOnly || props.disabled ? getStyle('disabled') : {}),
          }}
          disabled={props.readOnly || props.disabled}
          onChange={e => {
            setInternalValue(e.target.value)
            onChange(e.target.value)
          }}
          onBlur={() => {
            const v = internalValue.trim()
            if (v !== internalValue) {
              setInternalValue(v)
              props.onChange(v)
            }
          }}
          placeholder={placeholder ? translate(placeholder) : undefined}
          value={internalValue}
          type={inputType}
        ></Input>
      </InputWrapper>
    </>
  )
}
