import React from 'react'
import styled from 'styled-components'
import { Label, LabelProps } from './Label'
import { getThemeContext, AppTheme } from '../theme/theme'
import { useGetStyle } from '../theme/util'

const InputWrapper = styled.div``

const Input = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
`

export type TextAreaProps = {
  onChange: (value: string) => void
  value: string
  error: boolean
  style?: Partial<AppTheme['textArea']>
  disabled?: boolean
  readOnly?: boolean
  label?: LabelProps
  dataTestId?: string
}

export const TextArea = (props: TextAreaProps) => {
  const { disabled } = props

  const theme = React.useContext(getThemeContext())
  const getTextAreaStyle = useGetStyle(theme, 'textArea')(props.style)

  const getInputStyle = useGetStyle(theme, 'textInput')({})

  return (
    <>
      {props.label && <Label {...props.label} />}
      <InputWrapper
        style={{
          ...getInputStyle('wrapper'),
          ...getTextAreaStyle('wrapper'),
          ...(props.disabled ? getInputStyle('disabledWrapper') : {}),
          ...(props.readOnly ? getInputStyle('readOnlyWrapper') : {}),
        }}
      >
        <Input
          data-test-id={props.dataTestId}
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
