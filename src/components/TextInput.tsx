import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

const InputWrapper = createStyled('div')
const Input = createStyled('input')
const Hook = createStyled('div')
const Prefix = createStyled('p')

export type Props = {
  dataTestId?: string
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
  onFocus?: () => void
  onlyOnBlur?: boolean
  parseValue?: (value: string | null) => string
  placeholder?: string
  prefix?: string
  proccessValue?: (value: string | null) => string
  readOnly?: boolean
  style?: Partial<AppTheme['textInput']>
  value: string | null
}

export const TextInput = (props: Props) => {
  const inputRef = useRef(null)

  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'textInput')(props.style)

  const { t: translate } = useTranslation(props.localeNamespace)

  const [isFocus, setIsFocus] = useState(false)
  const [internalValue, setInternalValue] = useState(props.value)
  useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  // Focus field (e.g. on error)
  useEffect(() => {
    let timerId: number = null
    if (props.hasFocus && inputRef.current) {
      // Timeout is required to keep scrollIntoView smooth
      timerId = setTimeout(() => inputRef.current.focus(), 500)
    }
    return () => clearTimeout(timerId)
  }, [props.hasFocus])

  const value =
    (props.proccessValue
      ? props.proccessValue(internalValue)
      : internalValue) || ''
  const placeholder = props.placeholder
    ? translate(props.placeholder)
    : undefined

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
        {props.prefix && (
          <Prefix {...getCSSStyle('prefix')}>{props.prefix}</Prefix>
        )}
        <Input
          {...getCSSStyle({
            input: true,
            disabledInput: props.disabled,
            readOnlyInput: props.readOnly,
            errorInput: props.error,
          })}
          className="frr-text-input"
          data-test-id={props.dataTestId}
          disabled={props.readOnly || props.disabled}
          maxLength={props.maxLength}
          minLength={props.minLength}
          name={props.name}
          ref={inputRef}
          onChange={(event: any) => {
            const newValue = event.target.value

            setInternalValue(newValue)
            props.onChange?.(newValue)
            if (!isFocus) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur?.(newValue)
            }
            // if (!props.onlyOnBlur) {
            //   // @ts-ignore
            //   props.onChange?.(e.target.value)
            // }
          }}
          onBlur={() => {
            let newValue = (internalValue || '').trim()
            newValue = props.parseValue?.(newValue) || newValue

            setInternalValue(newValue)
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
      </InputWrapper>
    </>
  )
}
