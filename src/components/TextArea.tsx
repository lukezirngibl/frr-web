import React, { useEffect, useRef, useState } from 'react'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { Label, LabelProps } from './Label'

const InputWrapper = createStyled('div')

const Input = createStyled('textarea')

export type TextAreaProps = {
  dataTestId?: string
  disabled?: boolean
  error: boolean
  hasFocus?: boolean
  label?: LabelProps
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  readOnly?: boolean
  style?: Partial<ComponentTheme['textArea']>
  value: string
  htmlRows?: number
}

export const TextArea = (props: TextAreaProps) => {
  const inputRef = useRef(null)

  const theme = useComponentTheme()
  const getTextAreaStyle = useCSSStyles(theme, 'textArea')(props.style)
  const getInputStyle = useInlineStyle(theme, 'textInput')({})

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

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <InputWrapper
        {...getTextAreaStyle(
          'wrapper',
          getInputStyle({
            disabledWrapper: props.disabled,
            readOnlyWrapper: props.readOnly,
          }).style,
        )}
      >
        <Input
          {...getTextAreaStyle(
            'input',
            getInputStyle({
              disabledInput: props.disabled,
              readOnlyInput: props.readOnly,
            }).style,
          )}
          rows={props.htmlRows || 10}
          className="frr-textarea"
          data-test-id={props.dataTestId}
          disabled={props.disabled || props.readOnly}
          onBlur={() => {
            let newValue = (internalValue || '').trim()

            setInternalValue(newValue)
            setIsFocused(false)
            props.onBlur?.(newValue)
          }}
          onChange={(event: any) => {
            const newValue = event.target.value

            setInternalValue(newValue)
            props.onChange?.(newValue)

            if (!isFocused) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur?.(newValue)
            }
          }}
          onFocus={() => {
            setIsFocused(true)
            props.onFocus?.()
          }}
          ref={inputRef}
          value={internalValue}
        />
      </InputWrapper>
    </>
  )
}
