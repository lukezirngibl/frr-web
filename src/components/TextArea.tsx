import React from 'react'
import styled from 'styled-components'
import { TranslationGeneric } from '../util'
import { Label, LabelProps } from './Label'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'

const InputWrapper = styled.div``

const Input = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
  opacity: ${props => (props.disabled ? 0.45 : 1)};
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
  const getStyle = createGetStyle(theme, 'textArea')(props.style)

  return (
    <>
      {props.label && <Label<TM> {...props.label} />}
      <InputWrapper style={getStyle('wrapper')}>
        <Input
          style={{
            ...getStyle('input'),
            ...(props.readOnly || props.disabled ? getStyle('disabled') : {}),
          }}
          onChange={e => props.onChange(e.target.value as string)}
          className="frr-textarea"
          disabled={disabled}
        />
      </InputWrapper>
    </>
  )
}
