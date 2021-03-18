import React, { useState } from 'react'
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
  label?: LabelProps
  maxLength?: number
  minLength?: number
  name?: string
  onBlur?: (v: string) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  onlyOnBlur?: boolean
  placeholder?: string
  prefix?: string
  proccessValue?: (v: string | null) => string
  readOnly?: boolean
  ref?: any
  style?: Partial<AppTheme['textInput']>
  value: string | null
}

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.readOnly === nextProps.readOnly
  )
}

export const TextInput = React.memo((props: Props) => {
  const inputRef = React.createRef<HTMLInputElement>()

  const { inputType, value, placeholder } = props

  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'textInput')(props.style)

  const language = useLanguage()
  const translate = useTranslate(language)

  const [internalValue, setInternalValue] = useState(value)

  const [onChange] = useDebouncedCallback((text: string) => {
    if (props.onChange) {
      props.onChange(text)
    }
  }, 300)

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  React.useEffect(
    () => () => {
      if (internalValue !== value && props.onChange) {
        props.onChange(internalValue)
      }
    },
    [internalValue],
  )

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
          data-test-id={props.dataTestId}
          className="frr-number-input"
          ref={inputRef}
          name={props.name}
          maxLength={props.maxLength}
          minLength={props.minLength}
          {...getCSSStyle({
            input: true,
            disabledInput: props.disabled,
            readOnlyInput: props.readOnly,
            errorInput: props.error,
          })}
          disabled={props.readOnly || props.disabled}
          onChange={(e: any) => {
            setInternalValue(e.target.value)
            if (!props.onlyOnBlur) {
              // @ts-ignore
              onChange(e.target.value)
            }
          }}
          onBlur={() => {
            const v = (internalValue || '').trim()
            // if (v !== internalValue) {
            setInternalValue(v)
            if (props.onChange) {
              props.onChange(v)
            }

            // }
            if (props.onBlur) {
              props.onBlur(v)
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
}, areEqual)
