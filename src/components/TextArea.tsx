import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
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
  style?: Partial<AppTheme['textArea']>
  value: string
  htmlRows?: number
}

export const TextArea = (props: TextAreaProps) => {
  const inputRef = useRef(null)

  const theme = useAppTheme()
  const getTextAreaStyle = useCSSStyles(theme, 'textArea')(props.style)
  const getInputStyle = useInlineStyle(theme, 'textInput')({})

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

  return (
    <>
      {props.label && <Label {...props.label} />}
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
            setIsFocus(false)
            props.onBlur?.(newValue)
          }}
          onChange={(event: any) => {
            const newValue = event.target.value

            setInternalValue(newValue)
            props.onChange?.(newValue)

            if (!isFocus) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur?.(newValue)
            }
          }}
          onFocus={() => {
            setIsFocus(true)
            props.onFocus?.()
          }}
          ref={inputRef}
          value={internalValue}
        />
      </InputWrapper>
    </>
  )
}
