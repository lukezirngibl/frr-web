import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebouncedCallback } from 'use-debounce'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

const InputWrapper = createStyled('div')
const Input = createStyled('input')
const Hook = createStyled('div')
const Prefix = createStyled('p')

export type Props = {
  autocomplete?: string
  children?: React.ReactNode
  dataTestId?: string
  debounce?: number
  disabled?: boolean
  error?: boolean
  hasFocus?: boolean
  inputType?: string
  inputRef?: React.MutableRefObject<HTMLElement>
  isCurrencyInput?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  maxLength?: number
  minLength?: number
  name?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  onlyOnBlur?: boolean
  parseValue?: (value: string | null) => string
  placeholder?: string
  postfix?: string
  prefix?: string
  proccessValue?: (value: string | null) => string
  readOnly?: boolean
  style?: Partial<ComponentTheme['textInput']>
  value: string | null
}

export const TextInput = (props: Props) => {
  const inputRef = useRef(null)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'textInput')(props.style)

  const { t: translate } = useTranslation(props.localeNamespace)

  const [isFocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(props.value)

  useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  // Focus field (e.g. on error)
  useEffect(() => {
    let timerId: any = null
    if (props.hasFocus && inputRef.current) {
      // Timeout is required to keep scrollIntoView smooth
      timerId = setTimeout(() => inputRef.current.focus(), 500)
    }
    return () => clearTimeout(timerId)
  }, [props.hasFocus])

  const value = (props.proccessValue ? props.proccessValue(internalValue) : internalValue) || ''
  const placeholder = props.placeholder ? translate(props.placeholder) : undefined

  const debounceOnChange = useDebouncedCallback((v: string) => {
    props?.onChange(v)
  }, props.debounce || 0)

  const onChange = (v: string) => {
    if (props.debounce === undefined) {
      props?.onChange(v)
    } else {
      debounceOnChange(v)
    }
  }

  useEffect(() => {
    if (props.inputRef) {
      props.inputRef.current = inputRef.current
    }
  }, [inputRef.current])

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <InputWrapper
        {...getCSSStyle({
          wrapper: true,
          wrapperCurrency: props.isCurrencyInput,
          wrapperFocus: isFocused,
          disabledWrapper: props.disabled,
          readOnlyWrapper: props.readOnly,
          errorWrapper: props.error,
        })}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
        onKeyDown={props.onKeyDown}
      >
        <Hook
          {...getCSSStyle({
            hook: true,
            readOnlyHook: props.readOnly,
            errorHook: props.error,
          })}
        />
        {props.prefix && <Prefix {...getCSSStyle('prefix')}>{props.prefix}</Prefix>}
        <Input
          {...getCSSStyle({
            input: true,
            inputPlaceholder: value === '',
            disabledInput: props.disabled,
            readOnlyInput: props.readOnly,
            errorInput: props.error,
          })}
          autoComplete={props.autocomplete}
          className="frr-text-input"
          data-test-id={props.dataTestId}
          disabled={props.readOnly || props.disabled}
          maxLength={props.maxLength}
          minLength={props.minLength}
          name={props.name}
          ref={inputRef}
          onChange={(event: any) => {
            const newValue = event.target.value as string

            setInternalValue(newValue)
            onChange?.(newValue)

            if (!isFocused) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur?.(newValue)
            }
          }}
          onBlur={() => {
            let newValue = (internalValue || '').trim()
            newValue = props.parseValue?.(newValue) || newValue
            setInternalValue(newValue)
            onChange?.(newValue)
            setIsFocused(false)

            props.onBlur?.(newValue)
          }}
          onFocus={() => {
            setIsFocused(true)
            props.onFocus?.()
          }}
          placeholder={placeholder}
          type={props.inputType}
          value={value}
        ></Input>
        {props.postfix && <Prefix {...getCSSStyle('postfix')}>{translate(props.postfix)}</Prefix>}
        {props.children}
      </InputWrapper>
    </>
  )
}
