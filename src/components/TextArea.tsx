import React from 'react'
import styled from 'styled-components'
import { TranslationGeneric } from '../util'
import { Label, LabelProps } from './Label'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'

const InputWrapper = styled.div``

const Input = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
`

export type TextAreaProps<TM> = {
  onChange: (value: string) => void
  value: string
  error: boolean
  style?: Partial<AppTheme['textArea']>
  disabled?: boolean
  readOnly?: boolean
  label?: LabelProps<TM>
}

export const TextArea = <TM extends TranslationGeneric>(
  props: TextAreaProps<TM>,
) => {
  const { disabled } = props

  const theme = React.useContext(getThemeContext())
  const getTextAreaStyle = createGetStyle(theme, 'textArea')(props.style)

  const getInputStyle = createGetStyle(theme, 'textInput')({})

  return (
    <>
      {props.label && <Label<TM> {...props.label} />}
      <InputWrapper
        style={{
          ...getInputStyle('wrapper'),
          ...getTextAreaStyle('wrapper'),
          ...(props.disabled ? getInputStyle('disabledWrapper') : {}),
          ...(props.readOnly ? getInputStyle('readOnlyWrapper') : {}),
        }}
      >
        <Input
          style={{
            ...getInputStyle('input'),
            ...getTextAreaStyle('input'),
            ...(props.disabled ? getInputStyle('disabledInput') : {}),
            ...(props.readOnly ? getInputStyle('readOnlyInput') : {}),
          }}
          onChange={e => props.onChange(e.target.value as string)}
          className="frr-textarea"
          disabled={disabled || props.readOnly}
          value={props.value}
        />
      </InputWrapper>
    </>
  )
}
