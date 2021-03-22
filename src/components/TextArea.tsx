import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Label, LabelProps } from './Label'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'

const InputWrapper = styled.div``

const Input = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
`

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
}

export const TextArea = (props: TextAreaProps) => {
  const inputRef = useRef(null)

  const theme = useAppTheme()
  const getTextAreaStyle = useInlineStyle(theme, 'textArea')(props.style)
  const getInputStyle = useInlineStyle(theme, 'textInput')({})

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
        {...{
          ...getInputStyle('wrapper'),
          ...getTextAreaStyle('wrapper'),
          ...(props.disabled ? getInputStyle('disabledWrapper') : {}),
          ...(props.readOnly ? getInputStyle('readOnlyWrapper') : {}),
        }}
      >
        <Input
          {...{
            ...getInputStyle('input'),
            ...getTextAreaStyle('input'),
            ...(props.disabled ? getInputStyle('disabledInput') : {}),
            ...(props.readOnly ? getInputStyle('readOnlyInput') : {}),
          }}
          className="frr-textarea"
          data-test-id={props.dataTestId}
          disabled={props.disabled || props.readOnly}
          onBlur={() => {
            const v = (props.value || '').trim()
            props.onBlur?.(v)
          }}
          onChange={(e: any) => {
            props.onChange?.(e.target.value)
          }}
          onFocus={props.onFocus}
          ref={inputRef}
          value={props.value}
        />
      </InputWrapper>
    </>
  )
}
