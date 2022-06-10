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
  dataTestId?: string
  debounce?: number
  disabled?: boolean
  error?: boolean
  hasFocus?: boolean
  inputType?: string
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  maxLength?: number
  minLength?: number
  name?: string
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  onKeyUp?: (value: string) => void
  onFocus?: () => void
  onlyOnBlur?: boolean
  parseValue?: (value: string | null) => string
  placeholder?: string
  prefix?: string
  postfix?: string
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

  const [isFocus, setIsFocus] = useState(false)
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

  return (
    <>
      {props.label && <Label {...props.label} />}
      <InputWrapper
        {...getCSSStyle({
          wrapper: true,
          disabledWrapper: props.disabled,
          readOnlyWrapper: props.readOnly,
          errorWrapper: props.error,
        })}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
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

            if (!isFocus) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur?.(newValue)
            }
          }}
          onKeyUp={(event: any) => {
            const newValue = event.target.value as string
            props.onKeyUp?.(newValue)
          }}
          onBlur={() => {
            let newValue = (internalValue || '').trim()
            newValue = props.parseValue?.(newValue) || newValue
            setInternalValue(newValue)
            onChange?.(newValue)
            setIsFocus(false)

            props.onBlur?.(newValue)
          }}
          onFocus={() => {
            setIsFocus(true)
            props.onFocus?.()
          }}
          placeholder={placeholder}
          type={props.inputType}
          value={value}
        ></Input>
        {props.postfix && <Prefix {...getCSSStyle('postfix')}>{translate(props.postfix)}</Prefix>}
      </InputWrapper>
    </>
  )
}
