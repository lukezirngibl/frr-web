import React from 'react'

import styled from 'styled-components'
import { TranslationGeneric } from '../../util'
import { Label } from './Label'

const TextAreaElement = styled.textarea<{ disabled?: boolean }>`
  height: 64px !important;
  width: 100%;
  opacity: ${props => (props.disabled ? 0.45 : 1)};
`

export type TextAreaProps<TM> = {
  onChange: (value: string) => void
  value: string
  error: boolean
  disabled?: boolean
  label?: keyof TM
}

export const TextArea = <TM extends TranslationGeneric>(
  props: TextAreaProps<TM>,
) => {
  const { onChange, disabled, label, ...otherProps } = props
  return (
    <div className={`ui form`} style={{ width: '100%' }}>
      {label && <Label<TM> label={label} />}
      <TextAreaElement
        {...otherProps}
        onChange={() => {}}
        className="input"
        disabled={disabled}
      />
    </div>
  )
}
