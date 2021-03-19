import React, { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { Label, LabelProps } from './Label'
import { useLanguage, useTranslate } from '../theme/language'

const InputWrapper = createStyled('div')
const Input = createStyled('input')
const Hook = createStyled('div')
const Prefix = createStyled('p')

export type Props = {
  dataTestId?: string
  disabled?: boolean
  error?: boolean
  inputType?: string
  hasFocus?: boolean
  label?: LabelProps
  maxLength?: number
  minLength?: number
  name?: string
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  onlyOnBlur?: boolean
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

  const language = useLanguage()
  const translate = useTranslate(language)

  const [internalValue, setInternalValue] = useState(props.value)

  // const [onChange] = useDebouncedCallback((text: string) => {
  //   if (props.onChange) {
  //     props.onChange(text)
  //   }
  // }, 300)

  // useEffect(() => {
  //   setInternalValue(value)
  // }, [value])

  // useEffect(
  //   () => () => {
  //     console.log('TRIGGER ONCHNAGE')
  //     if (internalValue !== value && props.onChange) {
  //       props.onChange(internalValue)
  //     }
  //   },
  //   [internalValue],
  // )

  // Focus field (e.g. on error)
  useEffect(() => {
    if (props.hasFocus && inputRef.current) {
      inputRef.current.focus()
    }
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
          onChange={(e: any) => {
            setInternalValue(e.target.value)
            props.onChange?.(e.target.value)
            // if (!props.onlyOnBlur) {
            //   // @ts-ignore
            //   props.onChange?.(e.target.value)
            // }
          }}
          onBlur={() => {
            const v = (internalValue || '').trim()
            setInternalValue(v)
            props.onBlur?.(v)
          }}
          onFocus={props.onFocus}
          placeholder={placeholder}
          type={props.inputType}
          value={value}
        ></Input>
      </InputWrapper>
    </>
  )
}
