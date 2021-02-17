import React, { useState } from 'react'
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

export type Props = {
  onChange: (value: string) => void
  value: string | null
  placeholder?: string
  style?: Partial<AppTheme['textInput']>
  inputType?: string
  label?: LabelProps
  proccessValue?: (v: string | null) => string
  readOnly?: boolean
  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean
  maxLength?: number
  prefix?: string
  error?: boolean
  onlyOnBlur?: boolean
  dataTestId?: string
}

export const TextInput = (props: Props) => {
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
      {props.label && <Label {...props.label} />}
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
          data-test-id={props.dataTestId}
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
            if (!props.onlyOnBlur) {
              onChange(e.target.value)
            }
          }}
          onBlur={() => {
            const v = (internalValue || '').trim()
            // if (v !== internalValue) {
            setInternalValue(v)
            props.onChange(v)
            // }
            if (props.onBlur) {
              props.onBlur()
            }
          }}
          placeholder={placeholder ? translate(placeholder) : undefined}
          value={
            (props.proccessValue
              ? props.proccessValue(internalValue)
              : internalValue) || ''
          }
          type={inputType}
          onFocus={props.onFocus}
        ></Input>
      </InputWrapper>
    </>
  )
}
