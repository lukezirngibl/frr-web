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

  const [internalValue, setInternalValue] = useState(props.value)

  // Focus field (e.g. on error)
  useEffect(() => {
    if (props.hasFocus && inputRef.current) {
      inputRef.current.focus()
    }
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
          data-test-id={props.dataTestId}
          onChange={(e: any) => {
            setInternalValue(e.target.value)
            props.onChange?.(e.target.value)
          }}
          onBlur={() => {
            const v = (internalValue || '').trim()
            setInternalValue(v)
            props.onBlur?.(v)
          }}
          onFocus={props.onFocus}
          className="frr-textarea"
          ref={inputRef}
          disabled={props.disabled || props.readOnly}
          value={props.value}
        />
      </InputWrapper>
    </>
  )
}
