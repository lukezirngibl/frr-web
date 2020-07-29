import React from 'react'
import styled from 'styled-components'
import ReactCodeInput, { ReactCodeInputProps } from 'react-code-input'

const CodeInputWrapper = styled.div<{ activeBorderColor: string }>`
  input {
    box-shadow: none !important;
    font-family: monospace !important;
    caret-color: transparent !important;
    font-size: 16px !important;
    font-size: 24px !important;
    text-align: center !important;
    padding-left: 0 !important;

    &:hover {
      cursor: pointer !important;
      border-color: ${props => props.activeBorderColor} !important;
      opacity: 0.8 !important;
    }

    &:focus {
      outline: 0;
      background: transparent !important;
      border-color: ${props => props.activeBorderColor} !important;
    }
  }
`

export type Props = {
  value: string
  setValue: (v: string) => void
  activeBorderColor: string
  codeInputProps?: Partial<ReactCodeInputProps>
}

export const CodeInput = (props: Props) => {
  return (
    <CodeInputWrapper activeBorderColor={props.activeBorderColor}>
      <ReactCodeInput
        inputMode="numeric"
        name="code"
        type="number"
        fields={7}
        value={props.value}
        onChange={props.setValue}
        {...props.codeInputProps}
      />
    </CodeInputWrapper>
  )
}
