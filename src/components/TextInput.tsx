import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebouncedCallback } from 'use-debounce'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import { Div } from '../html'

const Input = createStyled('input')
const Prefix = createStyled('p')

export type Props = {
  autocomplete?: string
  children?: React.ReactNode
  dataTestId?: string
  debounce?: number
  disabled?: boolean
  error?: boolean
  forceRefreshValue?: number
  formatValue?: (value: string | null) => string // This function is applied initially or once the user loses focus but not during typing
  hasFocus?: boolean
  inputRef?: React.MutableRefObject<HTMLElement>
  inputType?: string
  isAutoFocused?: boolean
  isCurrencyInput?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  maxLength?: number
  minLength?: number
  name?: string
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
  onlyOnBlur?: boolean
  parseValue?: (value: string | null) => string
  placeholder?: string
  postfix?: string
  prefix?: string
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

  const formatValue = props.formatValue || ((v: string) => v)

  useEffect(() => {
    setInternalValue(formatValue(props.value))
  }, [props.value])

  // Focus field (e.g. on error)
  useEffect(() => {
    let timerId: any = null
    if ((props.hasFocus || props.isAutoFocused) && inputRef.current) {
      // Timeout is required to keep scrollIntoView smooth
      timerId = setTimeout(() => inputRef.current.focus(), 500)
    }
    return () => clearTimeout(timerId)
  }, [props.hasFocus, props.isAutoFocused, inputRef.current])

  const value = internalValue || ''
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

  useEffect(() => {
    if (props.forceRefreshValue > 0) {
      console.log('forceRefreshValue', props.forceRefreshValue)
      console.log('value', props.value)
      console.log('internalValue', internalValue)
      setInternalValue(formatValue(props.value))
    }
  }, [props.forceRefreshValue])

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <Div
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
        <Div
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
          dataTestId={props.dataTestId}
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
            setInternalValue(formatValue(newValue))
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
        <div>{`${props.forceRefreshValue}`}</div>
        {props.postfix && <Prefix {...getCSSStyle('postfix')}>{translate(props.postfix)}</Prefix>}
        {props.children}
      </Div>
    </>
  )
}
