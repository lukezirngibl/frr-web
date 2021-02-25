import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import styled from 'styled-components'
import { Label, LabelProps } from './Label'
import { getTranslation, getLanguageContext } from '../theme/language'
import { createGetStyle, style } from '../theme/util'
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
  minLength?: number
  prefix?: string
  error?: boolean
  onlyOnBlur?: boolean
  dataTestId?: string
}

export const TextInput = (props: Props) => {
  const inputRef = React.createRef<HTMLInputElement>()

  const { inputType, value, placeholder } = props

  const theme = React.useContext(getThemeContext())
  const S = style(theme, 'textInput')(props.style)

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
        {...S([
          'wrapper',
          ...((props.disabled ? ['disabledWrapper'] : []) as any),
          ...((props.readOnly ? ['readOnlyWrapper'] : []) as any),
          ...((props.error ? ['errorWrapper'] : []) as any),
        ])}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
      >
        <Hook
          {...S([
            'hook',
            ...((props.readOnly ? ['readOnlyHook'] : []) as any),
            ...((props.error ? ['errorHook'] : []) as any),
          ])}
        />
        {props.prefix && <Prefix {...S('prefix')}>{props.prefix}</Prefix>}
        <Input
          data-test-id={props.dataTestId}
          className="frr-number-input"
          ref={inputRef}
          maxLength={props.maxLength}
          minLength={props.minLength}
          {...S([
            'input',
            ...((props.disabled ? ['disabledInput'] : []) as any),
            ...((props.readOnly ? ['readOnlyInput'] : []) as any),
            ...((props.error ? ['errorInput'] : []) as any),
          ])}
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
