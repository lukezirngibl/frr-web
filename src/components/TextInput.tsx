import React, { useState } from 'react'
import { TranslationGeneric } from '../util'
import { useDebouncedCallback } from 'use-debounce'
import styled from 'styled-components'
import { Label, LabelProps } from './Label'
import { getTranslation, getLanguageContext } from '../theme/language'
import { createGetStyle } from '../theme/util'
import { AppTheme, getThemeContext } from '../theme/theme'

const InputWrapper = styled.div``

const Input = styled.input`
  width: 100%;
`

const Hook = styled.div``

const Prefix = styled.p``

export type Props<TM> = {
  onChange: (value: string) => void
  value: string | null
  required?: boolean
  placeholder?: keyof TM
  style?: Partial<AppTheme['textInput']>
  inputType?: string
  label?: LabelProps<TM>
  proccessValue?: (v: string | null) => string
  readOnly?: boolean
  disabled?: boolean
  maxLength?: number
  prefix?: string
  error?: boolean
}

export const TextInput = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const inputRef = React.createRef<HTMLInputElement>()

  const { inputType, value, placeholder } = props

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
      {props.label && <Label<TM> {...props.label} />}
      <InputWrapper
        style={{
          ...getStyle('wrapper'),
          ...(props.disabled ? getStyle('disabledWrapper') : {}),
          ...(props.readOnly ? getStyle('readOnlyWrapper') : {}),
          ...(props.error ? getStyle('errorWrapper') : {}),
        }}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
      >
        <Hook
          style={{
            ...getStyle('hook'),
            ...(props.readOnly ? getStyle('readOnlyHook') : {}),
            ...(props.error ? getStyle('errorHook') : {}),
          }}
        />
        {props.prefix && (
          <Prefix style={getStyle('prefix')}>{props.prefix}</Prefix>
        )}
        <Input
          className="frr-number-input"
          ref={inputRef}
          maxLength={props.maxLength}
          style={{
            ...getStyle('input'),
            ...(props.disabled ? getStyle('disabledInput') : {}),
            ...(props.readOnly ? getStyle('readOnlyInput') : {}),
            ...(props.error ? getStyle('errorInput') : {}),
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
          value={
            (props.proccessValue
              ? props.proccessValue(internalValue)
              : internalValue) || ''
          }
          type={inputType}
        ></Input>
      </InputWrapper>
    </>
  )
}
